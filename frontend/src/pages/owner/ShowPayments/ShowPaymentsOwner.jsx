import React, { useContext, useEffect, useState } from 'react'
import { authenticateUser } from '../../../actions/shared/authenticateUser';
import MultiToast from '../../../actions/shared/MultiToast';
import Spinner from '../../Spinner.jsx';
import { getPaymentDetails } from '../../../actions/owner/getPaymentDetails';
import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/Layout/Layout';
import { CookiesContext } from '../../../context/CookiesProvider';
import Payment from './Payment';

function ShowPaymentsOwner() {

    const { cookies } = useContext(CookiesContext);
    const [loading, setLoading] = useState(false);
    const [paymentList, setPaymentList] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const { token } = cookies;
        const authenticate = async () => {
            setLoading(true);
            const rsp = authenticateUser('owner', token);
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
            <div style={{"background-image":"linear-gradient(#b993d6, #8ca6db)"}}>
        <Layout userType={'owner'}>
                {
                paymentList.length != 0 ?
                    paymentList.map((payment, index) => {
                        console.log(payment.customer_data.firstname)
                        return (
                            <div key={index}>
                                <h3>customer name :- {payment.customer_data.firstname} {payment.customer_data.lastname}</h3>
                                <Payment payment={payment} />
                            </div>
                        )
                    })
                    :
                    <h4 className="container display-6" style={{"color":"brown"}}>No Details</h4>
                }
        </Layout>
            </div>
    )
}

export default ShowPaymentsOwner