import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner'
import { giveUserData } from '../../actions/giveUserData';

export default function OwnerProfile({ cookies, removeCookies }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            const response = await giveUserData('owner', token);
            if ('error' === response.type) {
                alert(response.data);
                navigate('/');
            } else {
                setUserData(response.userData);
                setCompanyData(response.companyData);
            }
        }
        fetchData();
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        console.log(removeCookies)
        removeCookies('token');
        navigate('/');
    }

    if (userData === null || null === companyData) {
        return <Spinner />
    }

    const onWorkerApplication = (e) => {
        e.preventDefault();
        navigate('/owner/show-worker-applications');
    }

    const redirectHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
    }

    return (
        <>
            <div>
                <button onClick={onWorkerApplication}>show worker application</button>
            </div>
            <div>
                <p>your first name : {userData.firstname}</p>
                <p>your last name : {userData.lastname}</p>
                <p>your email address : {userData.email}</p>
                <p>your Contact number : {userData.contact}</p>
                <p>your company name : {companyData.name}</p>
                <p>your company email : {companyData.email}</p>
                <p>your company contact : {companyData.contact}</p>
                <p>your company service time : {companyData.serviceTime}</p>
                <p>your company rating : {companyData.rating}</p>
                <p>your company name : {companyData.name}</p>
                <h3>address</h3>
                <p>line1 : {companyData.address.line1}</p>
                <p>line1 : {companyData.address.line2}</p>
                <p>line1 : {companyData.address.pincode}</p>
                <p>line1 : {companyData.address.state}</p>
            </div>
            <button onClick={redirectHandler} value="/show-companies">Show companies</button>
            <button onClick={redirectHandler} value="/owner/show-pending-orders">Show pending orders</button>
            <button onClick={redirectHandler} value="/owner/show-assigned-orders">show assigned orders</button>
            <button onClick={redirectHandler} value="/owner/show-in-query-orders">Worker Order Query</button>
            <button onClick={handleLogout}>logout</button>
        </>
    );
}
