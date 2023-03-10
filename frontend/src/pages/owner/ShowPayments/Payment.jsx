import React, { useContext } from 'react'
import PaymentViewModel from './PaymentViewModel';
import { useState } from 'react';
import { CookiesContext } from '../../../context/CookiesProvider';
import { sendRecipt } from '../../../actions/owner/sendRecipt';
import MultiToast from '../../../actions/shared/MultiToast';
import { getPaymentDetails } from '../../../actions/owner/getPaymentDetails';

function Payment({ payment, setPaymentList, setLoading }) {
    const { cookies } = useContext(CookiesContext);
    console.log(payment)

    const { token } = cookies;
    const [paymentViewModelState, setPaymentViewModelState] = useState(false);

    const handleSendReciptClick = async (customer_id) => {
        console.log(customer_id);
        setLoading(true);
        const response = await sendRecipt(token, customer_id);
        setLoading(false);
        console.log(response);
        if ('error' === response.type) {
            console.log(response.error)
            MultiToast(response.error, true);
        } else {
            MultiToast(['recipt is send successfully'], false);
        }
        const paymentList_response = await getPaymentDetails(token);
        if ('error' === paymentList_response.type) {
            setLoading(false);
            MultiToast(paymentList_response.error, true);
            // navigate('/');
        } else {
            setPaymentList(paymentList_response.paymentList);
            setLoading(false);
            console.log(paymentList_response.paymentList);
        }
    }

    return (

        <div className="container">

            <PaymentViewModel
                show={paymentViewModelState}
                onHide={() => setPaymentViewModelState(false)}
                data={payment}
            />
            <button onClick={() => setPaymentViewModelState(true)}>show order details</button>
            <button onClick={() => handleSendReciptClick(payment.customer_data._id)}>Send recipt</button>
        </div>
    )
}

export default Payment