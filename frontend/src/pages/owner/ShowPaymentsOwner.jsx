import React, { useEffect, useState } from 'react'
import { authenticateUser } from '../../actions/shared/authenticateUser';
import MultiToast from '../../actions/shared/MultiToast';
import Spinner from '../Spinner.jsx';
import { getPaymentDetails } from '../../actions/owner/getPaymentDetails';
import { useNavigate } from 'react-router-dom';
import { acceptPayment } from '../../actions/owner/acceptPayment';

function ShowPaymentsOwner({ cookies }) {
    const [loading, setLoading] = useState(false);
    const { token } = cookies;
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
            console.log(response);
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

    const handleClick = (payment_id) => {
        const { token } = cookies;
        console.log(payment_id);
        acceptPayment(token, payment_id);
    }

    if (true === loading) {
        return <Spinner />
    }

    return (
        <div>
            {
                paymentList.map((payment, index) => (
                    <div key={index}>
                        <h3>customer name :- {payment.customer_name}</h3>
                        <h5>customer contact :- {payment.customer_contact}</h5>
                        <ul>
                            <li>hot water quantity :- {payment.payment.hotWater.quantity}</li>
                            <li>hot water cost :- {payment.payment.hotWater.price * payment.payment.hotWater.quantity}</li>
                            <li>normal water quantity :- {payment.payment.normalWater.quantity}</li>
                            <li>normal water cost :- {payment.payment.normalWater.price * payment.payment.normalWater.quantity}</li>
                            <li>cold water quantity :- {payment.payment.coldWater.quantity}</li>
                            <li>cold water cost :- {payment.payment.coldWater.price * payment.payment.coldWater.quantity}</li>
                        </ul>
                        <button onClick={() => { handleClick(payment._id) }}>send payment</button>
                    </div>
                ))
            }
        </div>
    )
}

export default ShowPaymentsOwner