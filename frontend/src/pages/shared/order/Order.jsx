import React, { useState } from 'react'
import OrderViewModel from '../../../components/orderViewModel/OrderViewModel.jsx';


export default function ShowOrder({ order }) {

    const [orderViewModelState, setOrderViewModelState] = useState(false);
    return (

        <div className="container">
            <h1 style={{ color: "blue" , fontWeight: "450"}}>
                Order ID {order.orderId}
            </h1>
            <OrderViewModel
                show={orderViewModelState}
                onHide={() => setOrderViewModelState(false)}
                data={order}
            />
            <button className="btn btn-info" onClick={() => setOrderViewModelState(true)} style={{
                fontSize: "1.2em", fontWeight: "700", color: "darkblue",}}>Order Details</button>
        </div>
    )
}
