import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { CookiesContext } from "../../context/CookiesProvider.js";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate } from "react-router-dom";
import { getAllSubscription } from "../../actions/shared/subscription";
import PlanViewModel from "../../components/planViewModel/PlanViewModel";
import Layout from "../shared/Layout/Layout";

export default function ShowAssignedPlans() {
  const [spinner, setSpinner] = useState(true);
  const [customerPlans, setCustomerPlans] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [workers, setWorkers] = useState(null);
  const [planViewModelState, setPlanViewModelState] = useState(false);
  const { cookies } = useContext(CookiesContext);
  const navigate = useNavigate();

  const { token } = cookies;
  useEffect(() => {

    const fetchData = async () => {
      setSpinner(true);
      const response = await getAllSubscription(
        "owner",
        "get-assigned-plans",
        token
      );
      if (false === response.authenticated) {
        MultiToast(response.message, true);
        navigate('/');
      }
      if ("error" === response.type) {
        MultiToast(response.error, true);
      }
      setCustomerPlans(response.plans);
      setCustomers(response.customers);
      setWorkers(response.workers);
      setSpinner(false);
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
    <>
    <Layout userType={'owner'}style={{backgroundColor:"#670e00"}}
             >
      {spinner && <Spinner />}
      {!spinner && customerPlans.length > 0 ? (
        customerPlans.map((plans, index) => {
          return (
            <div key={index}>
              <p>Plan {index}</p>
              <PlanViewModel
                show={planViewModelState}
                onHide={() => setPlanViewModelState(false)}
                data={{plan:plans, customer:customers[index], userType:"owner", worker:workers[index]}}
            />
             <button className="btn btn-warning" onClick={() => setPlanViewModelState(true)}>Plan details</button>
            </div>
          );
        })
      ) : (
        <div style={styles}>
                            <h1 style={{ color: "#b33800", fontWeight: "500", fontSize: "4rem", textAlign: "center" }}>No Subscribed Plans</h1></div>
      
      )}
      </Layout>
    </>
  );
}
