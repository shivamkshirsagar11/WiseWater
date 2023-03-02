import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../Spinner.jsx';
import ShowOrder from '../shared/order/Order.jsx';
import { useNavigate } from 'react-router-dom';
import { givePlacedOrders } from '../../actions/customer/givePlacedOrders.js';
import MultiToast from '../../actions/shared/MultiToast.js';
import Layout from '../shared/Layout/Layout.jsx';
import { CookiesContext } from '../../context/CookiesProvider.js';

export default function ShowPlacedorderList() {
    const [placedOrderList, setPlacedOrderList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const { cookies } = useContext(CookiesContext);
    useEffect(() => {
        const { token } = cookies;

        const fetchData = async () => {
            setLoading(true);
            const response = await givePlacedOrders(token);
            if ('error' === response.type) {
                MultiToast(response.error, true);
                navigate('/login');
            }
            setPlacedOrderList(response.orderList);
            console.log(response.orderList)
            setLoading(false);
        }
        fetchData();
    }, [cookies]);

    if (true === loading) {
        return <Spinner />
    }
    const handleTrackOrder = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        navigate(`${e.target.value}`)
    }
    const styles={
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
         height: "70vh",
    }
    return (
        // <div style={{backgroundColor:"#64b5f6"}} >
            <Layout userType={'customer'}style={{backgroundColor:"#670e00"}}
             >
            <div >
                {0 === placedOrderList.length && 
                <div style={styles}>
                <div style={{textAlign:"center"}}>
                <h1 style={{color:"#b33800",fontWeight:"500",fontSize:"4.5rem"}}>No Orders Placed !!
                </h1>
                </div>
                </div>
                }
                
                {
                    placedOrderList.map((order, index) => {
                        return (
                            <div key={index}>
                                <ShowOrder order={order} />
                                {/* {order.status === "assigned" && <button value={`/customer/order/track/${order.orderId}`} onClick={handleTrackOrder}>Track Order</button>} */}
                            </div>
                        )
                    })
                }
            </div>
         </Layout>
        // </div>
    )
}
