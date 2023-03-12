import React, { useContext, useEffect, useState } from 'react'
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

            const response = await getPaymentDetails(token);
            if (false === response.authenticated) {
                MultiToast(response.message, true);
                navigate('/');
            }
            if ('error' === response.type) {
                MultiToast(response.error, true);
            } else {
                setPaymentList(response.paymentList);
                console.log(response.paymentList);
            }
            setLoading(false);
        }
        authenticate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies]);


    return (
        <>
            <Layout userType='customer'>

                {loading ? <Spinner /> :
                    paymentList.map((payment, index) => (
                        <div key={index}>
                            <h3>company name :- {payment.company_name}</h3>
                            <Payment payment={payment} />
                        </div>
                    ))
                }
            </Layout>
        </>
    )
}

export default ShowPayments