import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ShowOrder from "../components/ShowOrder";
import { toast } from 'react-toastify';

export default function WorkerAssignedOrders({ cookies }) {
    const navigate = useNavigate();
    const {token} = cookies;
    const [assignedOrders, setAssignedOrders] = useState(null);
    useEffect(() => {
        const fun = async () => {
            try {
                const { token } = cookies;
                const response = await fetch('http://localhost:3001/api/worker/show-assigned-orders', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({token})
                });
                const data = await response.json();
                console.log(data)
                if (data.type === 'error') throw new Error(data.message);
                setAssignedOrders(data.assignedOrders);
            } catch (error) {
                toast.error(error)
                navigate('/login');
            }
        }
        fun();
    }, []);

    if (null === assignedOrders) {
        return <Spinner />;
    }


    const handleDelieverOrder = async (e)=>{
        e.preventDefault();
        console.log(e.target.value);
        try {
            const response = await fetch('http://localhost:3001/api/worker/order-delivered', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token,order_id:e.target.value })
            });
            const data = await response.json();
            console.log(data)
            if (data.type === 'error') throw new Error(data.message);
            setAssignedOrders(data.assignedOrders);
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div>
            {0 === assignedOrders.length && <p>no order are assigned</p>}
            {
                assignedOrders.map((assignedOrder, index) => {
                    return (
                        <div key={index}>
                            <h2>order number {index}</h2>
                            <ShowOrder order={assignedOrder} />
                            <button onClick={handleDelieverOrder} value={`${assignedOrder._id}`}>Order Delievered</button>
                            {/* <button value={`${assignedOrder._id}`} onclick={handleReAssignOrder}>Re-assign Order</button> */}
                        </div>
                    )
                })
            }
        </div>
    )
}
