import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../Spinner.jsx';
import { giveWorkerDetails } from "../../actions/owner/giveWorkerDetails.js";
import { assignPlan } from "../../actions/owner/assignPlan.js";
import MultiToast from "../../actions/shared/MultiToast.js";
import Layout from "../shared/Layout/Layout.jsx";
import { CookiesContext } from "../../context/CookiesProvider.js";

export default function AssignPlan() {
  const { orderId } = useParams();
  console.log("order id: ", orderId)
  const { cookies } = useContext(CookiesContext);
  const navigate = useNavigate();
  const [showWorkers, setShowWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { token } = cookies;

      const response = await giveWorkerDetails(token);
      if (false === response.authenticated) {
        MultiToast(response.message, true);
        navigate('/');
      }
      if ('error' === response.type) {
        MultiToast(response.error, true);
      } else {
        console.log(response.workers);
        setShowWorkers(response.workers);
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assignHandler = async (e) => {
    e.preventDefault();
    console.log("worker id: ", e.target.value);
    try {
      const { token } = cookies;
      const obj = { token, worker_id: e.target.value, orderId: orderId };
      const response = await assignPlan(obj);
      if ('error' === response.type) {
        MultiToast(response.error, true);
        return;
      } else {
        navigate('/owner/customer-plans');
      }
    } catch (error) {
      MultiToast(error, true);
    }
  };
  return (
    <Layout userType={'owner'}>
      {loading ? <Spinner /> :
        <>
          {
            showWorkers.map((worker, index) => {
              return (
                <div key={index}>
                  <h3>{worker.firstname}</h3>
                  <button className='btn btn-info'onClick={assignHandler} value={worker._id}>
                    assign order
                  </button>
                </div>
              );
            })
          }
        </>
      }
    </Layout>
  );
}
