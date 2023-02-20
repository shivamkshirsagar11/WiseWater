import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner.jsx';
import ShowOrder from "../shared/order/Order.jsx";
import { giveAssignedOrders } from '../../actions/owner/giveAssignedOrders.js';
import MultiToast from '../../actions/shared/MultiToast.js';
import Layout from '../shared/Layout/Layout.jsx';

export default function ShowAssignedOrders({ cookies }) {

    const navigate = useNavigate();
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const { token } = cookies;

        const fetchData = async () => {
            setLoading(true);
            const response = await giveAssignedOrders(token);
            if ('error' === response.type) {
                MultiToast(response.error, true)
                navigate('/login');
            }
            setAssignedOrders(response.assignedOrders);
            setLoading(false);
        };
        fetchData();

    }, [cookies]);

    if (true === loading) {
        return <Spinner />;
    }

    return (
        <Layout userType={'owner'}>
            <div>
                {0 === assignedOrders.length && <p>no order are assigned</p>}
                {
                    assignedOrders.map((assignedOrder, index) => {
                        console.log(assignedOrder)
                        delete assignedOrder.status
                        return (
                            <div key={index}>
                                <ShowOrder order={assignedOrder} />
                            </div>
                        )
                    })
                }
            </div>
        </Layout>
    )
}
