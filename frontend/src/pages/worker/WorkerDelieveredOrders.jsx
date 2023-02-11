import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner.jsx';
import ShowOrder from "../shared/order/Order.jsx";
import { giveWorkerDelieveredOrders } from '../../actions/worker/giveWorkerDelieveredOrders.js';
import MultiToast from '../../actions/shared/MultiToast.js';

export default function ShowAssignedOrders({ cookies }) {
    const navigate = useNavigate();
    const { token } = cookies;
    const [delieveredOrders, setDelieveredOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await giveWorkerDelieveredOrders(token);
            if ('error' === response.type) {
                MultiToast(response.error, true);
                navigate('/login');
            } else {
                setDelieveredOrders(response.delieveredOrders);
            }
            setLoading(false);
        }
        fetchData();
    }, [token]);

    if (true === loading) {
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
