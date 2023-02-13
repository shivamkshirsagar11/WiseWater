import React from 'react';
import AddressDetails from './AddressDetails.jsx'

function CompanyDetails({ companyData }) {
    return (
        <div>
            <h2>Company Details</h2>
            <p>your company name : {companyData.name}</p>
            <p>your company email : {companyData.email}</p>
            <p>your company contact : {companyData.contact}</p>
            <p>your company service time : {companyData.serviceTime}</p>
            <p>your company rating : {companyData.rating}</p>
            <p>your company name : {companyData.name}</p>
            <h4>Water Prices</h4>
            <ul>
                <li>cold water : {companyData.waterPrice.coldWater}</li>
                <li>normal water : {companyData.waterPrice.normalWater}</li>
                <li>hot water : {companyData.waterPrice.hotWater}</li>
            </ul>
            <AddressDetails address={companyData.address} />
        </div>
    )
}

export default CompanyDetails;