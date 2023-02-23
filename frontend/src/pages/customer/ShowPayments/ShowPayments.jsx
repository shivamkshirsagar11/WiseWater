import React, { useContext, useEffect, useState } from 'react'
import { authenticateUser } from '../../../actions/shared/authenticateUser';
import MultiToast from '../../../actions/shared/MultiToast';
import Spinner from '../../Spinner.jsx';
import { getPaymentDetails } from '../../../actions/customer/getPaymentDetails';
import { useNavigate } from 'react-router-dom';
import { CookiesContext } from '../../../context/CookiesProvider';
import Layout from '../../shared/Layout/Layout.jsx';
import Payment from './Payment';

function ShowPayments() {

    const { cookies } = useContext(CookiesContext);
    const [loading, setLoading] = useState(false);
    const [paymentList, setPaymentList] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const { token } = cookies;
        const authenticate = async () => {
            setLoading(true);
            const rsp = authenticateUser('customer', token);
            if ('error' === rsp.type) {
                setLoading(false);
                alert('you are not authenticated' + rsp.error);
                navigate('/login');
            }
            const response = await getPaymentDetails(token);
            setLoading(false);
            if ('error' === response.type) {
                MultiToast(response.error, true);
                navigate('/login');
            } else {
                setPaymentList(response.paymentList);
                console.log(response.paymentList);
            }
        }
        authenticate();
    }, [cookies]);

    if (true === loading) {
        return <Spinner />
    }

    return (
        <Layout userType='customer'>
            {
                paymentList.map((payment, index) => (
                    <div key={index}>
                        <h3>company name :- {payment.company_name}</h3>
                        <Payment payment={payment} />
                    </div>
                ))
            }
        </Layout>
    )
}

export default ShowPayments