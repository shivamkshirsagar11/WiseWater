import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner.jsx';
import ShowOrder from "../shared/order/Order.jsx";
import { giveAssignedOrders } from '../../actions/owner/giveAssignedOrders.js';
import MultiToast from '../../actions/shared/MultiToast.js';
import Layout from '../shared/Layout/Layout.jsx';
import { CookiesContext } from '../../context/CookiesProvider.js';
import { useContext } from 'react';

export default function ShowAssignedOrders() {

    const { cookies } = useContext(CookiesContext);
    const navigate = useNavigate();
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const { token } = cookies;

        const fetchData = async () => {
            setLoading(true);
            const response = await giveAssignedOrders(token);
            if (false === response.authenticated) {
                MultiToast(response.message, true);
                navigate('/');
            }
            if ('error' === response.type) {
                MultiToast(response.error, true)
            }
            setAssignedOrders(response.assignedOrders);
            console.log(response)
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies]);


    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
    }
    return (
        <div style={{ "background-image": "linear-gradient(#b993d6, #8ca6db)" }}>
            <Layout userType={'owner'}>
                <div>
                    {0 === assignedOrders.length && <div style={styles}>
                        <h1 style={{ color: "#b33800", fontWeight: "500", fontSize: "4rem", textAlign: "center" }}>No Orders are Assigned</h1>
                    </div>}
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
        </div>
    )
}
