import React, { useEffect, useState } from 'react'
import { authenticateUser } from '../../actions/shared/authenticateUser';
import MultiToast from '../../actions/shared/MultiToast';
import Spinner from '../Spinner.jsx';
import { getPaymentDetails } from '../../actions/customer/getPaymentDetails';
import { useNavigate } from 'react-router-dom';

function ShowPayments({ cookies }) {
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
        <div>
            {
                paymentList.map((payment, index) => (
                    <div key={index}>
                        <h3>company name :- {payment.company_name}</h3>
                        <h5>company contact :- {payment.contact}</h5>
                        <ul>
                            <li>hot water cost :- {payment.payment.hotWater}</li>
                            <li>normal water cost :- {payment.payment.normalWater}</li>
                            <li>cold water cost :- {payment.payment.coldWater}</li>
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}

export default ShowPayments