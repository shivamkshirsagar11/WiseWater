import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { giveUserData } from '../../actions/giveUserData';

export default function WorkerProfile({ cookies, removeCookies }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            const response = await giveUserData('worker', token);
            if ('error' === response.type) {
                alert(response.data);
                navigate('/');
            } else {
                setUserData(response.userData);
                setCompanyData(response.companyData);
            }
        }
        fetchData();
    }, [cookies]);

    if (userData === null) {
        return <Spinner />
    }

    const handleLogout = (e) => {
        e.preventDefault();
        console.log(removeCookies)
        removeCookies('token');
        navigate('/');
    }

    const redirectHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
    }

    return (
        <>
            <div>
                <p>your first name : {userData.firstname}</p>
                <p>your last name : {userData.lastname}</p>
                <p>your email address : {userData.email}</p>
                <p>your Contact number : {userData.contact}</p>
                <button onClick={handleLogout}>logout</button>
                <button onClick={redirectHandler} value="/worker/orders/assigned">show assigned orders</button>
                <button onClick={redirectHandler} value="/worker/orders/delievered">show delievered Orders</button>

            </div>

            <h1> Company Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Contact No</th>
                        <th>Service time</th>
                        <th>Rating</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{companyData.email}</td>
                        <td>{companyData.contact}</td>
                        <td>{companyData.serviceTime}</td>
                        <td>{companyData.rating}</td>
                        <td>{companyData.name}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
