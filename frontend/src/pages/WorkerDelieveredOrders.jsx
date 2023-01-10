import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ShowOrder from "../components/ShowOrder";
import { toast } from 'react-toastify';

export default function ShowAssignedOrders({ cookies }) {
    const navigate = useNavigate();
    const { token } = cookies;
    const [delieveredOrders, setDelieveredOrders] = useState(null);
    useEffect(() => {
        const fun = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/worker/show-delievered-orders', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                const data = await response.json();
                console.log(data)
                if (data.type === 'error') throw new Error(data.message);
                setDelieveredOrders(data.orders);
            } catch (error) {
                toast.error(error)
            }
        }
        fun();
    }, []);

    if (null === delieveredOrders) {
        return <Spinner />;
    }

    return (
        <div>
            {0 === delieveredOrders.length && <p>no order are assigned</p>}
            {
                delieveredOrders.map((assignedOrder, index) => {
                    delete assignedOrder.status;
                    return (
                        <div key={index}>
                            <h2>order number {index}</h2>
                            <ShowOrder order={assignedOrder} />
                        </div>
                    )
                })
            }
        </div>
    )
}
