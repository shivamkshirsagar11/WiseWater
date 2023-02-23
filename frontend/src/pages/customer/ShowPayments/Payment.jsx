import React from 'react'
import PaymentViewModel from './PaymentViewModel';
import { useState } from 'react';

function Payment({ payment }) {
    const [orderViewModelState, setOrderViewModelState] = useState(false);

    return (

        <div className="container">

            <PaymentViewModel
                show={orderViewModelState}
                onHide={() => setOrderViewModelState(false)}
                data={payment}
            />
            <button onClick={() => setOrderViewModelState(true)}>show order details</button>
        </div>
    )
}

export default Payment