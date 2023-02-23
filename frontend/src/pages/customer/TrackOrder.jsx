import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../Spinner.jsx';
import ShowOrder from "../shared/order/Order.jsx";
import { giveDetailsToTrackOrder } from "../../actions/customer/giveDetailsToTrackOrder.js";
import MultiToast from "../../actions/shared/MultiToast.js";
import { CookiesContext } from "../../context/CookiesProvider.js";

export default function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { cookies } = useContext(CookiesContext);

  const [order, setOrder] = useState({});
  const [worker, setWorker] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("order-id", orderId);
  useEffect(() => {

    const fetchData = async () => {
      const { token } = cookies;
      setLoading(true);
      const response = await giveDetailsToTrackOrder(token, orderId);
      console.log(response);
      if ('error' === response.type) {
        MultiToast(response.error, true);
        navigate('/login');
      }
      setOrder(response.order);
      setWorker(response.worker);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (true === loading) {
    return <Spinner />;
  }
  return (
    <>
      <div >
        <ShowOrder order={order} />
        {order.status !== "pending" &&
          <div>
            <p>Worker name: {worker.firstname} {worker.lastname}</p>
            <p>Worker Contact: {worker.contact}</p>
            <p>Worker Email: {worker.email}</p>
          </div>
        }
      </div>
    </>
  );
}
