import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authenticateUser } from '../../actions/shared/authenticateUser.js';
import { placeOrder } from '../../actions/customer/placeOrder.js';
import AddressDetailsForm from '../shared/form/AddressDetailsForm.jsx';
import MultiToast from '../../actions/shared/MultiToast.js';
import Layout from '../shared/Layout/Layout.jsx';
import { CookiesContext } from '../../context/CookiesProvider.js';

export default function Placeorder() {
    const navigate = useNavigate();

    const { cookies } = useContext(CookiesContext);
    useEffect(() => {
        const { token } = cookies;
        const authenticate = async () => {
            const response = await authenticateUser('customer', token);
            if (false === response.authenticated) {
                navigate('/');
            }
        }
        authenticate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies]);

    const { company_name } = useParams();

    const [orderData, setOrderData] = useState({
        water_type: '', water_temperature: '', water_quantity: '', companyname: company_name
    });

    const handleInputData = (e) => {
        const { name, value } = e.target;

        // put constraints for other fields as well
        if ('water_quantity' === name) {
            const ch = (value.slice(-1));

            if (!(ch <= '9' && ch >= '0'))
                return;
        }
        setOrderData(prevState => ({ ...prevState, [name]: value }));
    }

    const [addressData, setAddressData] = useState({
        line1: '', line2: '', city: '', pincode: '', state: ''
    });

    const setInputAddress = (address) => {
        setAddressData({ ...address })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const order = { ...orderData, address: { ...addressData } };
        const { token } = cookies;
        const fetchData = async () => {
            const response = await placeOrder(token, order);
            if (false === response.authenticated) {
                MultiToast(response.message, true);
                navigate('/');
            }
            if ('error' === response.type) {
                MultiToast(response.error, true);
            } else {
                MultiToast("Order placed successfully", false);
                navigate('/show-companies');
            }
        }
        fetchData();
    }

    return (
        <Layout userType={'customer'}>

            <div>
                <form action="post">
                    <div style={{ textAlign: "center" }}>
                        <label htmlFor="water_type" className='mt-3' style={{ fontSize: "1.3em" }}>Choose a Water Type: &nbsp;</label>
                        <select name="water_type" onChange={handleInputData} value={orderData.water_type}>
                            <option value="">Water type</option>
                            <option value="hotWater">Hot Water</option>
                            <option value="coldWater">Cold Water</option>
                            <option value="normalWater">Normal Water</option>
                        </select>
                    </div>
                    <div style={{ textAlign: "center", fontSize: "1.3em" }} className='mt-3' >
                        <label> Quantity : &nbsp; </label>
                        <input type="text" name="water_quantity" value={orderData.water_quantity} onChange={handleInputData} />
                    </div>
                    <br></br>
                    {/* address */}
                    <AddressDetailsForm address={addressData} setAddress={setInputAddress} />
                    <div style={{ textAlign: "center", fontSize: "1.3em" }}>
                        <label> Company_Name : &nbsp; <input type="text" name="companyname" value={orderData.companyname} readOnly={true} /> </label>
                    </div>
                    <br></br>
                    <div style={{ textAlign: "center", color: "#0077be", }}>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div >
        </Layout >
    )
}
