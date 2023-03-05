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
            <span>{user.firstname} {user.lastname}</span>
            <button onClick={() => setUserViewModelState(true)}>show user details</button>
            {
                'owner' === userType &&
                <>
                    <CompanyViewModel
                        show={companyViewModelState}
                        onHide={() => setCompnayViewModelState(false)}
                        data={companyData}
                    />
                    <button onClick={() => setCompnayViewModelState(true)}>show company details</button>
                </>
            }
        </div>
    )
}

export default UserDetails