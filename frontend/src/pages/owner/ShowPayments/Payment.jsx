import React from 'react'
import PaymentViewModel from './PaymentViewModel';
import { useState } from 'react';

function Payment({ payment }) {
    const [paymentViewModelState, setPaymentViewModelState] = useState(false);

    return (

        <div className="container">

            <PaymentViewModel
                show={paymentViewModelState}
                onHide={() => setPaymentViewModelState(false)}
                data={payment}
            />
            <button onClick={() => setPaymentViewModelState(true)}>show order details</button>
        </div>
    )
}

export default Payment