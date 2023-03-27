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
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { token } = cookies;

      const response = await giveWorkerDetails(token);
      setLoading(false);
      if (false === response.authenticated) {
        MultiToast(response.message, true);
        navigate('/');
      }
      if ('error' === response.type) {
        alert(response.error);
      } else {
        console.log(response.workers);
        setShowWorkers(response.workers);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      MultiToast(error, true);
    }
  };
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  }
  return (
    <Layout userType={'owner'}>
      {loading ? <Spinner /> :
        <>
        {showWorkers.length === 0 && <div style={styles}>
                    <h1 style={{ color: "#b33800", fontWeight: "500", fontSize: "4rem", textAlign: "center" }}>Currently , No Worker Available</h1>
                    </div>}
          {showWorkers.map((worker, index) => {
            return (
              <div key={index}>
                <div className="mt-3 ml-3">
                  <label>{worker.firstname} &nbsp; </label>
                  <button className="btn btn-success mt-2 ml-3 " onClick={assignHandler} value={worker._id}>
                    Assign Order
                  </button>
                </div>
              </div>
            );
          })}
        </>}
    </Layout >
  );
}
