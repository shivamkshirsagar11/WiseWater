import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner.jsx";
import ShowOrder from "../shared/order/Order.jsx";
import { giveWorkerAssignedOrders } from "../../actions/worker/giveWorkerAssignedOrders.js";
import { deliverOrder } from "../../actions/worker/deliverOrder.js";
import MultiToast from "../../actions/shared/MultiToast.js";
import Layout from "../shared/Layout/Layout.jsx";
import { CookiesContext } from "../../context/CookiesProvider.js";

export default function WorkerAssignedOrders() {
  const navigate = useNavigate();

  const { cookies } = useContext(CookiesContext);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});
  const { token } = cookies;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await giveWorkerAssignedOrders(token);
      setLoading(false);
      if (false === response.authenticated) {
        MultiToast(response.message, true);
        navigate('/');
      }
      if ("error" === response.type) {
        MultiToast(response.error, true);
      } else {
        setAssignedOrders(response.assignedOrders);
        setLocation(response.location);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  console.log(location);
  const handleDelieverOrder = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setLoading(true);
    const response = await deliverOrder(token, e.target.value);
    if ("error" === response.type) {
      MultiToast(response.error, true);
    } else {
      const response = await giveWorkerAssignedOrders(token);
      setAssignedOrders(response.assignedOrders);
    }
    setLoading(false);
  };
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
} 

  return (
    <div >
      {loading && <Spinner />}
      <Layout userType={"worker"}>
        {!loading && 0 === assignedOrders.length && (
          <div style={styles}>
                    <h1 style={{ color: "#b33800", fontWeight: "500", fontSize: "4rem", textAlign: "center" }}>No Order Are Assigned</h1></div>
        )}
        {!loading && assignedOrders.map((assignedOrder, index) => {
          delete assignedOrder.status;
          return (
            <div key={index}>
              <ShowOrder order={assignedOrder} />
              <div style={{paddingLeft:"12px",paddingTop:"11px"}}>
              <button style={{ fontSize: "1.2em", fontWeight: "700"}}
                className="btn btn-danger"
                onClick={handleDelieverOrder}
                value={`${assignedOrder.orderId}`}
              >
                Order Delivered
              </button>
              </div>
              {/* <button value={`${assignedOrder._id}`} onClick={handleAssignedOrderQuery}>Order Query</button> */}
            </div>
          );
        })}
      </Layout>
    </div>
  );
}
