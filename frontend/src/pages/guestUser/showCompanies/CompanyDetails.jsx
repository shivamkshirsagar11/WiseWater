import React from 'react';
import CompanyViewModel from "../../../components/companyViewModel/CompanyViewModel.jsx";
import { useState } from 'react';

function CompanyDetails({ redirectHandler, userType, company, index }) {

    const [companyViewModelState, setCompanyViewModelState] = useState(false);
    return (
        <div key={index} className="container">
            <h5 style={{ color: "blue" }}>
                {company.name}
            </h5>
            <CompanyViewModel
                show={companyViewModelState}
                onHide={() => setCompanyViewModelState(false)}
                data={company}
            />
            <button onClick={() => setCompanyViewModelState(true)}>show company details</button>
            {"guest" === userType && (
                <button
                    value={`/worker/application/${company.name}`}
                    onClick={redirectHandler}
                    className="btn btn-warning"
                >
                    apply
                </button>
            )}
            {"customer" === userType && (
                <button
                    value={`/customer/placeorder/${company.name}`}
                    onClick={redirectHandler}
                    className="btn btn-warning"
                >
                    place order
                </button>
            )}
        </div>
    );
}

export default CompanyDetails