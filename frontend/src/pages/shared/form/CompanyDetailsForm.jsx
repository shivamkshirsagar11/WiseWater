import React from 'react';
import AddressDetailsForm from './AddressDetailsForm.jsx';

function CompanyDetailsForm({ companyData, setCompanyData }) {
    const { name, email, contact, serviceTime, waterPrice } = companyData;

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setCompanyData(prevState => ({ ...prevState, [name]: value }));
    }

    const setWaterPrice = (event) => {
        const { name, value } = event.target;
        setCompanyData(prevState => {
            prevState.waterPrice = { ...prevState.waterPrice, [name]: value };
            return ({ ...prevState });
        })
    }

    const setAddress = (address) => {
        setCompanyData(prevState => ({ ...prevState, address: { ...address } }));
    }

    return (
        <div>

            company name : <input type="name" name="name" onChange={handleInputData} value={name} />
            company email : <input type="email" name="email" onChange={handleInputData} value={email} />
            company contact : <input type="text" name="contact" onChange={handleInputData} value={contact} />
            company service time : <input type="text" name="serviceTime" onChange={handleInputData} value={serviceTime} />
            <h3>Water Prices</h3>
            Cold water : <input type="text" name="coldWater" onChange={setWaterPrice} value={waterPrice.coldWater} />
            Normal water : <input type="text" name="normalWater" onChange={setWaterPrice} value={waterPrice.normalWater} />
            Hot Water : <input type="text" name="hotWater" onChange={setWaterPrice} value={waterPrice.hotWater} />
            <AddressDetailsForm address={companyData.address} setAddress={setAddress} />
        </div>
    )
}

export default CompanyDetailsForm