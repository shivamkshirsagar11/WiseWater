import React,{useContext} from 'react'
import PaymentViewModel from './PaymentViewModel';
import { useState } from 'react';
import { CookiesContext } from '../../../context/CookiesProvider';

function Payment({ payment }) {
    const { cookies } = useContext(CookiesContext);
    const { token } = cookies;
    const [paymentViewModelState, setPaymentViewModelState] = useState(false);
    async function sendRecipt(){
        const response = await fetch(`/api/owner/send-recipt`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        console.log(data);
    }
    return (

        <div className="container">

            <PaymentViewModel
                show={paymentViewModelState}
                onHide={() => setPaymentViewModelState(false)}
                data={payment}
            />
            <button onClick={() => setPaymentViewModelState(true)}>show order details</button>
            <button onClick={sendRecipt}>Send recipt</button>
        </div>
    )
}

export default Payment