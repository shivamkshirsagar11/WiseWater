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
            <button class="btn btn-info" style={{fontSize:"1.2em",fontWeight:"700",color:"darkblue"}}onClick={() => setOrderViewModelState(true)}>Show Order Details</button>
        </div>
    )
}

export default Payment