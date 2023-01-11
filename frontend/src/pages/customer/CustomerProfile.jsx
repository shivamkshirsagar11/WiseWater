import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

export default function CustomerProfile({ cookies, removeCookies }) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fun = async () => {
            try {
                const { token } = cookies;
                const response = await fetch(`http://localhost:3001/api/customer/profile`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token }),
                });
                const data = await response.json();
                if (data.type === 'error') throw (data.message);
                setUserData(data.user);
            } catch (error) {
                navigate('/');
            }
        }
        fun();
    }, [cookies]);

    if (userData === null) {
        return <Spinner />
    }

    const handleLogout = (e) => {
        e.preventDefault();
        removeCookies('token');
        navigate('/');
    }

    const redirectHandler = (e) => {
        e.preventDefault();
        navigate(`${e.target.value}`);
    }

    return (
        <>
            <div>
                <p>your first name : {userData.firstname}</p>
                <p>your last name : {userData.lastname}</p>
                <p>your email address : {userData.email}</p>
                <p>your Contact number : {userData.contact}</p>
                <h3>address</h3>
                <p>line1 : {userData.address.line1}</p>
                <p>line1 : {userData.address.line2}</p>
                <p>line1 : {userData.address.pincode}</p>
                <p>line1 : {userData.address.state}</p>
            </div>
            <button onClick={redirectHandler} value="/show-companies">Show companies</button>
            <button onClick={redirectHandler} value="/customer/show-placed-orders">My orders</button>
            <button onClick={handleLogout}>logout</button>
        </>
    );
}
