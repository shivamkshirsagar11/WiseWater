import React from 'react'
import CompanyDetails from './CompanyDetails';
import { useNavigate } from 'react-router-dom';


function CompanyList({ userType, companyList }) {
    const navigate = useNavigate();

    const redirectHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
    };
    return (
        <div>
            {
                companyList.length !== 0 &&
                companyList.map((company, index) => {
                    // change is reuqired from UI
                    return <CompanyDetails redirectHandler={redirectHandler} userType={userType} company={company} index={index} />
                })
            }
        </div>
    )
}

export default CompanyList