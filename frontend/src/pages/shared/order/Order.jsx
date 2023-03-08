import React, { useState } from 'react'
import OrderViewModel from '../../../components/orderViewModel/OrderViewModel.jsx';


export default function ShowOrder({ order }) {

    const [orderViewModelState, setOrderViewModelState] = useState(false);
    return (

        <div className="container">
            <h6 className="display-6" style={{ color: "blue" }}>
                order ID {order.orderId}
            </h6>
            <OrderViewModel
                show={orderViewModelState}
                onHide={() => setOrderViewModelState(false)}
                data={order}
            />
            <button className="btn btn-warning" onClick={() => setOrderViewModelState(true)}>order details</button>
        </div>
    )
}
