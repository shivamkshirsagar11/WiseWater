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
    return (
        <Layout userType={'customer'}>
            <div>
                {0 === placedOrderList.length && <p>no orders placed</p>}
                {
                    placedOrderList.map((order, index) => {
                        return (
                            <div key={index}>
                                <h2 >order number {index}</h2>
                                <ShowOrder order={order} />
                                {order.status === "assigned" && <button value={`/customer/order/track/${order._id}`} onClick={handleTrackOrder}>Track Order</button>}
                            </div>
                        )
                    })
                }
            </div>
        </Layout>
    )
}
