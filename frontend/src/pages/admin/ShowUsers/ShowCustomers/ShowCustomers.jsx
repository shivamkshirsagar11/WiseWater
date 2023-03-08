import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../../shared/Layout/Layout'
import { CookiesContext } from '../../../../context/CookiesProvider';
import MultiToast from '../../../../actions/shared/MultiToast';
import { useNavigate } from 'react-router-dom';
import Spinner from "../../../Spinner";
import { giveAdminRelatedData } from '../../../../actions/admin/giveAdminRelatedData';
import UserDetails from '../UserDetails';

function ShowCustomers() {
    const { cookies } = useContext(CookiesContext);
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            setLoading(true);
            const response = await giveAdminRelatedData(token, 'get-customers');
            if (false === response.authenticated) {
                navigate('/adminpage');
            }
            if ('error' === response.type) {
                MultiToast(response.error, true);
            } else {
                console.log(response.customers);
                setCustomers(response.customers);
            }
            setLoading(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <Layout userType={'admin'}>
            {loading ? <Spinner/>:
            <div>
                {
                    customers.map((customer, index) => (
                        <UserDetails user={customer} key={index} userType='customer' />
                    ))
                }
            </div>
            }
        </Layout>
        </>
    )
}

export default ShowCustomers