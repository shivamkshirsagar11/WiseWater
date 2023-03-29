import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { CookiesContext } from "../../context/CookiesProvider.js";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate } from "react-router-dom";
import { getAllSubscription } from "../../actions/shared/subscription";
import Layout from "../shared/Layout/Layout";
import PlanViewModel from "../../components/planViewModel/PlanViewModel";

export default function CustomerPlans() {
  const [spinner, setSpinner] = useState(true);
  const [customerPlans, setCustomerPlans] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [planViewModelState, setPlanViewModelState] = useState(false);
  const { cookies } = useContext(CookiesContext);
  const navigate = useNavigate();

  const { token } = cookies;
  useEffect(() => {

    const fetchData = async () => {
      setSpinner(true);
      const response = await getAllSubscription(
        "owner",
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
      setCustomerPlans(response.plans);
      setCustomers(response.customers);
      console.log(response.plans);
      console.log(response.customers);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  const redirectHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    navigate(`${e.target.value}`);
  };
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
              <label style={{fontSize:"1.7em",fontWeight:"600",color:"#1976D2"}}>Plan {index}</label>
              <PlanViewModel
                show={planViewModelState}
                onHide={() => setPlanViewModelState(false)}
                data={{plan:plans, customer:customers[index], userType:"owner"}}
            />
            <button className="btn-btn-primary"
              onClick={()=>setPlanViewModelState(true)}
              className='btn btn-info'
            >Plan Details </button>
              <button className="btn-btn-primary"
              onClick={redirectHandler}
              value={`/owner/assign-plan/${plans._id}`}
              className='btn btn-success ml-3'
            >Assign</button>
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
