import React, { useState } from 'react'
import OrderViewModel from '../../../components/orderViewModel/OrderViewModel.jsx';


export default function ShowOrder({ order }) {

    const [orderViewModelState, setOrderViewModelState] = useState(false);
    console.log(order)
    return (

        <div className="container">
            <h5 style={{ color: "blue" }}>
                order ID {order.orderId}
            </h5>
            <OrderViewModel
                show={orderViewModelState}
                onHide={() => setOrderViewModelState(false)}
                data={order}
            />
            <button onClick={() => setOrderViewModelState(true)}>show order details</button>
        </div>
    )
}
