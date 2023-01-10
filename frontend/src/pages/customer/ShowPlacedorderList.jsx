import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import ShowOrder from '../../components/ShowOrder';
import { useNavigate } from 'react-router-dom';


export default function ShowPlacedorderList({ cookies }) {
    const [orderList, setOrderList] = useState(null);
    const navigate = useNavigate()
    console.log('here')
    useEffect(() => {
        const fun = async () => {
            const { token } = cookies;
            const response = await fetch(`http://localhost:3001/api/customer/show-placed-orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token }),
            });
            const data = await response.json();
            if (data.type === 'error') throw (data.message);
            console.log("Order...");
            console.log(data);
            setOrderList(data.orderList);
        }
        console.log("Order...");
        fun();
    }, []);

    if (null === orderList) {
        return <Spinner />
    }
    const handleTrackOrder = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        navigate(`${e.target.value}`)
    }
    return (
        <div>
            {0 === orderList.length && <p>no orders placed</p>}
            {
                orderList.map((order, index) => {
                    return (

                        <div key={index}>
                            <h2 >order number {index}</h2>
                            <ShowOrder order={order} />
                            <button value={`/customer/order/track/${order._id}`} onClick={handleTrackOrder}>Track Order</button>
                        </div>

                    )
                })
            }
        </div>
    )
}
