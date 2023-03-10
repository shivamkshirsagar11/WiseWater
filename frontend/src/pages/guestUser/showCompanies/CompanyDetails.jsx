import React from 'react';
import CompanyViewModel from "../../../components/companyViewModel/CompanyViewModel.jsx";
import { useState } from 'react';

function CompanyDetails({ redirectHandler, userType, company, index }) {

    const [companyViewModelState, setCompanyViewModelState] = useState(false);
    return (
        <div key={index} className="container">
            <h5 style={{ color: "#1a237e", fontSize: "1.5rem", fontWeight: "700" }}>
                {company.name}
            </h5>
            <CompanyViewModel
                show={companyViewModelState}
                onHide={() => setCompanyViewModelState(false)}
                data={company}
            />
            <button className="btn btn-warning " style={{
                fontSize: "1.2em", fontWeight: "700", color: "darkblue",
            }} data-bs-toggle="button" onClick={() => setCompanyViewModelState(true)}>Show Company Details</button>

            {"guest" === userType && (
                <button
                    value={`/worker/application/${company.name}`}
                    onClick={redirectHandler}
                    className="btn btn-warning mx-3"
                >
                    Apply
                </button>
            )}
            {"customer" === userType && (
                <button style={{
                fontSize: "1.2em", fontWeight: "700", color: "darkblue",}}
                    value={`/customer/placeorder/${company.name}`}
                    onClick={redirectHandler}
                    className="btn btn-warning mx-3"
                >
                    Place Order
                </button>
            )}
        </div>
    );
}

export default CompanyDetails