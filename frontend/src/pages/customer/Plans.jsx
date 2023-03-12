import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { CookiesContext } from "../../context/CookiesProvider.js";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate } from "react-router-dom";
import { getAllSubscription } from "../../actions/shared/subscription";
import PlanViewModel from "../../components/planViewModel/PlanViewModel"
// import AddPlan from "./AddPlan";
import Layout from "../shared/Layout/Layout.jsx";

export default function Plans() {
  const [spinner, setSpinner] = useState(true);
  
  const [customerPlans, setCustomerPlans] = useState(true);
  const [planViewModelState, setPlanViewModelState] = useState(false);
  const { cookies } = useContext(CookiesContext);
  const navigate = useNavigate();

  const { token } = cookies;
  useEffect(() => {

    const fetchData = async () => {
      setSpinner(true);
      const response = await getAllSubscription(
        "customer",
        "get-all-plans",
        token
      );
      setSpinner(false);
      if (false === response.authenticated) {
        MultiToast(response.message, true);
        navigate('/');
      }
      if ("error" === response.type) {
        MultiToast(response.error, true);
      }
      console.log(response);
      setCustomerPlans(response.plans);
      console.log(response.plans);
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
      <Layout userType={'customer'} style={{ backgroundColor: "#670e00" }}>
      {spinner && <Spinner />}
        {!spinner && customerPlans.length > 0 ? (
          customerPlans.map((plans, index) => {
            return (
              <div key={index}>
                <label style={{fontSize:"1.6em",fontWeight:"500",color:"#1E88E5"}}>Daily Delivery Plan &nbsp;</label>
                <PlanViewModel
                  show={planViewModelState}
                  onHide={() => setPlanViewModelState(false)}
                  data={{ plan: plans, userType: "customer" }}
                />
                <button className="btn btn-info" style={{fontSize: "1.2em", fontWeight: "700", color: "darkblue"}} onClick={() => setPlanViewModelState(true)}>Plan Details</button>
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
