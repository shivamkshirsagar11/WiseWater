import React, { useState } from 'react'
import UserViewModel from './UserViewModel';
import CompanyViewModel from '../../../components/companyViewModel/CompanyViewModel';

function UserDetails({ user, userType, companyData }) {
    const [userViewModelState, setUserViewModelState] = useState(false);
    const [companyViewModelState, setCompnayViewModelState] = useState(false);
    console.log(userType)
    return (
        <div className="container">
            <UserViewModel
                show={userViewModelState}
                onHide={() => setUserViewModelState(false)}
                user={user}
                userType={userType}
            />
            <span style={{ fontSize: "1.3em", fontWeight: "700", color: "blue" }}>{user.firstname} {user.lastname}</span>
            <button className="btn btn-info mt-3  ml-3" style={{ fontSize: "1.2em", fontWeight: "500" }} onClick={() => setUserViewModelState(true)}>Show User Details</button>
            {

                'owner' === userType &&
                <>
                    <CompanyViewModel
                        show={companyViewModelState}
                        onHide={() => setCompnayViewModelState(false)}
                        data={companyData}
                    />
                    <button className="btn btn-dark mt-3  ml-3" style={{ fontSize: "1.2em", fontWeight: "500" }} onClick={() => setCompnayViewModelState(true)}>Show Company Details</button >
                </>
            }
        </div >
    )
}

export default UserDetails