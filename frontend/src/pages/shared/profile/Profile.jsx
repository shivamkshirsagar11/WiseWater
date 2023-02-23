import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import { giveUserData } from '../../../actions/shared/profile/giveUserData.js';

import CompanyDetails from '../details/CompanyDetails.jsx';
// import CompanyDetails from ''
import AddressDetails from '../details/AddressDetails.jsx';
import UserDetails from '../details/UserDetails.jsx';
import ProfileButtons from './ProfileButtons.jsx';
import MultiToast from '../../../actions/shared/MultiToast.js';
import Layout from '../Layout/Layout';
import CompanyViewModel from '../../../components/companyViewModel/CompanyViewModel'
import { CookiesContext } from '../../../context/CookiesProvider';

export default function Profile({ userType }) {

    const { cookies, removeCookies } = useContext(CookiesContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [companyViewModelState, setCompanyViewModelState] = useState(false);
    console.log(userData)
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            const response = await giveUserData(userType, token);
            if ('error' === response.type) {
                alert(response.error);
                navigate('/');
            } else {
                setUserData(response.userData);
                if ('customer' !== userType)
                    setCompanyData(response.companyData);
            }
        }
        fetchData();
    }, [cookies]);

    const handleLogout = (e) => {
        MultiToast("Logging out...", false)
        e.preventDefault();
        console.log(removeCookies)
        removeCookies('token');
        navigate('/');
    }

    if (userData === null || ('customer' !== userType && null === companyData)) {
        return <Spinner />
    }

    const redirectHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
    }

    return (
        <div style={{"background-image":"linear-gradient(#b993d6, #8ca6db)"}}>
        <Layout userType={userType} >
            <UserDetails userData={userData} userType={userType}/>
            {
                'customer' !== userType ?
                    <>
                        <CompanyViewModel
                            show={companyViewModelState}
                            onHide={() => setCompanyViewModelState(false)}
                            data={companyData}
                        />
                        <br/>
                        <div className="d-grid gap-2 col-2 mx-auto">
                        <button className="btn btn-warning"onClick={() => setCompanyViewModelState(true)}>show company details</button> </div></> :
                    <AddressDetails address={userData.address} />
            }
            {/* <ProfileButtons userType={userType} redirectHandler={redirectHandler} /> */}
            {/* <button onClick={handleLogout}>logout</button> */}
        </Layout>
        </div>
    );
}
