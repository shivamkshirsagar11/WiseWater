import React, { useState } from 'react'
import OrderViewModel from '../../../components/orderViewModel/OrderViewModel.jsx';


export default function ShowOrder({ order }) {

    const [orderViewModelState, setOrderViewModelState] = useState(false);
    return (
        
        <div className="container">
            
            <label style={{ color: "blue" , fontWeight: "450 ",fontSize:"1.9em",display:"contents"}}>
                Order Id {order.orderId}
            </label>
            <OrderViewModel
                show={orderViewModelState}
                onHide={() => setOrderViewModelState(false)}
                data={order}
            />
            
            
            <button className="btn btn-info mb-3 ml-4 mt-3" onClick={() => setOrderViewModelState(true)} style={{
                fontSize: "1.2em", fontWeight: "700",display:"inline", color: "darkblue",}}>Order Details</button>
        </div>
        
    )
}
