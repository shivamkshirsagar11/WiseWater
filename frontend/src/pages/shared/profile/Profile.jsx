import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import { giveUserData } from '../../../actions/shared/profile/giveUserData.js';
import Clock from 'react-digital-clock';
import AddressDetails from '../details/AddressDetails.jsx';
import UserDetails from '../details/UserDetails.jsx';
import Layout from '../Layout/Layout';
import CompanyViewModel from '../../../components/companyViewModel/CompanyViewModel'
import { CookiesContext } from '../../../context/CookiesProvider';
import MultiToast from '../../../actions/shared/MultiToast';

export default function Profile({ userType }) {

    const { cookies } = useContext(CookiesContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [companyViewModelState, setCompanyViewModelState] = useState(false);
    console.log(userData)
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            if ('admin' !== userType) {
                const response = await giveUserData(userType, token);
                if (false === response.authenticated) {
                    MultiToast(response.message, true);
                    navigate('/');
                }
                if ('error' === response.type) {
                    MultiToast(response.error, true);
                } else {
                    setUserData(response.userData);
                    if ('customer' !== userType)
                        setCompanyData(response.companyData);
                }
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies]);


    if (userData === null || ('customer' !== userType && null === companyData)) {
        return <Spinner />
    }

    const redirectHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
    }
    return (
        <div style={{backgroundColor:"blue"}}>
        <Layout userType={userType} >
            {(userData === null || ('customer' !== userType && null === companyData)) ? <Spinner /> :
                <>
                    <UserDetails userData={userData} userType={userType} />
                    {
                        'customer' !== userType ?
                            <>
                                <CompanyViewModel
                                    show={companyViewModelState}
                                    onHide={() => setCompanyViewModelState(false)}
                                    data={companyData}
                                />
                                <br />
                                <div className="d-grid gap-2 col-2 mx-auto">
                                    <button className="btn btn-warning" style={{ fontSize: "1.2em", fontWeight: "700", color: "darkblue" }} onClick={() => setCompanyViewModelState(true)}>Show Company Details</button> </div></> :
                            <><AddressDetails address={userData.address} />
                                <div style={{ backgroundColor: "#0077be", textAlign: "center", }}>
                                    <h3 style={{ color: "white", fontSize: "1.4rem", fontFamily: "cursive", fontWeight: "500", }}>
                                        Current Time: <Clock />
                                    </h3>
                                </div>
                            </>
                    }
                </>}
        </Layout>
    </div>
);
}
