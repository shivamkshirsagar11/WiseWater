import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner.jsx';
import ShowOrder from "../shared/order/Order.jsx";
import { giveWorkerDelieveredOrders } from '../../actions/worker/giveWorkerDelieveredOrders.js';
import MultiToast from '../../actions/shared/MultiToast.js';
import Layout from '../shared/Layout/Layout.jsx';
import { CookiesContext } from '../../context/CookiesProvider.js';

export default function ShowAssignedOrders() {
    const navigate = useNavigate();

    const { cookies } = useContext(CookiesContext);
    const { token } = cookies;
    const [delieveredOrders, setDelieveredOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await giveWorkerDelieveredOrders(token);
            setLoading(false);
            if (false === response.authenticated) {
                MultiToast(response.message, true);
                navigate('/');
            }
            if ('error' === response.type) {
                MultiToast(response.error, true);
            } else {
                MultiToast("Order Delievered Successfully", false)
                setDelieveredOrders(response.delieveredOrders);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);



    return (
        <Layout userType={'worker'}>
            {loading ? <Spinner /> :
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
            }
        </Layout>
    )
}
