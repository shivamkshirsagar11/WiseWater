import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import ShowCustomerDetails from '../../components/ShowCustomerDetails';

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
                <ShowCustomerDetails userData={userData}/>
            </div>
            <button onClick={redirectHandler} value="/show-companies">Show companies</button>
            <button onClick={redirectHandler} value="/customer/show-placed-orders">My orders</button>
            <button onClick={handleLogout}>logout</button>
        </>
    );
}
