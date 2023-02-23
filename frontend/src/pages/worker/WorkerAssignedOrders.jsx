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
      if ("error" === response.type) {
        MultiToast(response.error, true);
        navigate("/login");
      } else {
        setAssignedOrders(response.assignedOrders);
        setLocation(response.location);
      }
      setLoading(false);
    };
    fetchData();
  }, [token]);

  if (true === loading) {
    return <Spinner />;
  }
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

  return (
    <div style={{ "background-image": "linear-gradient(#b993d6, #8ca6db)" }}>
      <Layout userType={"worker"}>
        {0 === assignedOrders.length && (
          <h4 className="display-6" style={{ color: "red" }}>
            no order are assigned
          </h4>
        )}
        {assignedOrders.map((assignedOrder, index) => {
          delete assignedOrder.status;
          return (
            <div key={index}>
              <ShowOrder order={assignedOrder} />

              <button
                className="btn btn-danger"
                onClick={handleDelieverOrder}
                value={`${assignedOrder.orderId}`}
              >
                Order Delievered
              </button>
              {/* <button value={`${assignedOrder._id}`} onClick={handleAssignedOrderQuery}>Order Query</button> */}
            </div>
          );
        })}
      </Layout>
    </div>
  );
}
