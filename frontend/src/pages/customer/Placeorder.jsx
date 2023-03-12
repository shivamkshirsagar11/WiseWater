import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authenticateUser } from '../../actions/shared/authenticateUser.js';
import { placeOrder } from '../../actions/customer/placeOrder.js';
import AddressDetailsForm from '../shared/form/AddressDetailsForm.jsx';
import MultiToast from '../../actions/shared/MultiToast.js';
import Layout from '../shared/Layout/Layout.jsx';
import { CookiesContext } from '../../context/CookiesProvider.js';
import { DataContext } from '../../context/DataProvider.js';

export default function Placeorder() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(DataContext);
    const { cookies } = useContext(CookiesContext);
    useEffect(() => {
        const { token } = cookies;
        const authenticate = async () => {
            const response = await authenticateUser('customer', token);
            if (false === response.authenticated) {
                MultiToast('you are not authenticated')
                navigate('/');
            } else {
                dispatch({ type: "setProperty", propertyName: "authenticated", payload: true });
            }
        }
        if (undefined === state.authenticated) {
            authenticate();
        } else {
            if (false === state.authenticated)
                navigate('/');
        }

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
                    <label htmlFor="water_type">Choose a water type:</label>

                    <select name="water_type" onChange={handleInputData} value={orderData.water_type}>
                        <option value="">water type</option>
                        <option value="hotWater">hot water</option>
                        <option value="coldWater">cold water</option>
                        <option value="normalWater">normal water</option>
                    </select>

                    water quantity :
                    <input type="text" name="water_quantity" value={orderData.water_quantity} onChange={handleInputData} />

                    {/* address */}
                    <AddressDetailsForm address={addressData} setAddress={setInputAddress} />

                    companyname : <input type="text" name="companyname" value={orderData.companyname} readOnly={true} />

                    <button type="submit" onClick={handleSubmit}>submit</button>
                </form>
            </div>
        </Layout>
    )
}
