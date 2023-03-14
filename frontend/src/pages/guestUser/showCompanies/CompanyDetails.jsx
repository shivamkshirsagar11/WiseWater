import React from 'react';
import CompanyViewModel from "../../../components/companyViewModel/CompanyViewModel.jsx";
import { useState } from 'react';

function CompanyDetails({ redirectHandler, userType, company, index }) {

    const [companyViewModelState, setCompanyViewModelState] = useState(false);
    return (
        <table>
            <tr>
            <div key={index} className="container">
             <td><label style={{ color: "#1a237e", fontSize: "1.5rem", fontWeight: "700",marginLeft:"19px" }}>
                {company.name}
            </label>
            </td>
            
            <CompanyViewModel
                show={companyViewModelState}
                onHide={() => setCompanyViewModelState(false)}
                data={company}
            />
            
                
                <button className="btn btn-info ml-4 mt-1" style={{
                    fontSize: "1.2em", fontWeight: "700", color: "darkblue",
                }} data-bs-toggle="button" onClick={() => setCompanyViewModelState(true)}>Show Company Details</button>

                {"guest" === userType && (
                    <button style={{
                    fontSize: "1.2em", fontWeight: "700", color: "darkblue",}}
                        value={`/worker/application/${company.name}`}
                        onClick={redirectHandler}
                        className="btn btn-warning mx-3"
                    >
                        Apply
                    </button>
                    
                )}
                {"customer" === userType && (
                    
                    <>
                    
                    <button style={{
                    fontSize: "1.2em", fontWeight: "700", color: "darkblue",}}
                        value={`/customer/placeorder/${company.name}`}
                        onClick={redirectHandler}
                        className="btn btn-warning mx-3"
                    >
                        Place Order
                    </button>
                    
                    
                    <button style={{
                    fontSize: "1.2em", fontWeight: "700", color: "lightblue",}}
                        value={`/customer/subscription-from/${company.name}`}
                        onClick={redirectHandler}
                        className="btn btn-danger mx-3"
                    >
                        Take Subscription
                    </button>
                    
                </>
                
                )}
            </div>
            </tr>
            </table>
            
    );
}

export default CompanyDetails