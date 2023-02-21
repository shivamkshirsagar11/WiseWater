import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../Spinner.jsx';
import { giveWorkerDetails } from "../../actions/owner/giveWorkerDetails.js";
import { assignOrder } from "../../actions/owner/assignOrder.js";
import MultiToast from "../../actions/shared/MultiToast.js";
import Layout from "../shared/Layout/Layout.jsx";
import { CookiesContext } from "../../context/CookiesProvider.js";

export default function ShowWorkers() {
  const { orderId } = useParams();

  const { cookies } = useContext(CookiesContext);
  const navigate = useNavigate();
  const [showWorkers, setShowWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(orderId);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { token } = cookies;

      const response = await giveWorkerDetails(token);

      if ('error' === response.type) {
        alert(response.error);
      } else {
        console.log(response.workers);
        setShowWorkers(response.workers);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (true === loading) {
    return <Spinner />;
  }
  const assignHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    try {
      const { token } = cookies;
      const obj = { token, worker_id: e.target.value, orderId: orderId };
      const response = await assignOrder(obj);
      if ('error' === response.type) {
        MultiToast(response.error, true);
        return;
      } else {
        navigate('/owner/show-pending-orders');
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Layout userType={'owner'}>
      {showWorkers.map((worker, index) => {
        return (
          <div key={index}>
            <p>{worker.firstname}</p>
            <button onClick={assignHandler} value={worker._id}>
              assign order
            </button>
          </div>
        );
      })}
    </Layout>
  );
}
