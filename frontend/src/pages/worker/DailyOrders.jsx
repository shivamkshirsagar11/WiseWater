import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { CookiesContext } from "../../context/CookiesProvider.js";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate } from "react-router-dom";
import { getAllSubscription } from "../../actions/shared/subscription";
import { dailyDelievery } from "../../actions/worker/dailyDelievery";
import PlanViewModel from "../../components/planViewModel/PlanViewModel"
import Layout from "../shared/Layout/Layout";

export default function DailyOrders() {
  const [spinner, setSpinner] = useState(true);
  const [customerPlans, setCustomerPlans] = useState(null);
  const [planViewModelState, setPlanViewModelState] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const { cookies } = useContext(CookiesContext);
  const navigate = useNavigate();

  const { token } = cookies;
  useEffect(() => {

    const fetchData = async () => {
      setSpinner(true);
      const response = await getAllSubscription(
        "worker",
        "daily-ord",
        token
      );
      setSpinner(false)
      console.log(response)
      if (false === response.authenticated) {
        MultiToast(response.message, true);
        navigate('/');
      }
      if ("error" === response.type) {
        MultiToast(response.error, true);
      }
      setCustomerPlans(response.daily);
      setCustomers(response.customers);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies, trigger]);

  const delieverHandler = async (e) => {
    //do something of delievered
    const id = e.target.value;
    const resp = await dailyDelievery(token, id);
    if ("error" === resp.type) {
      MultiToast(resp.error, true);
      navigate("/login");
    }
    else {
      setTrigger(true);
    }
  };
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
}
  return (
    <>
      <Layout userType={'worker'} style={{ backgroundColor: "#670e00" }}>
      {spinner && <Spinner />}
        {!spinner && customerPlans.length > 0 ? (
          customerPlans.map((plans, index) => {
            return (
              <div key={index}>
                <p>Plan {index}</p>
                <PlanViewModel
                  show={planViewModelState}
                  onHide={() => setPlanViewModelState(false)}
                  data={{ plan: plans, customer: customers[index], userType: "worker" }}
                />
                <button className="btn btn-warning" onClick={() => setPlanViewModelState(true)}>Plan details</button>
                <button
                  value={plans._id}
                  onClick={delieverHandler}
                >Delivered</button>
              </div>
            );
          })
        ) : (
          !spinner && <div style={styles}>
                            <h1 style={{ color: "#b33800", fontWeight: "500", fontSize: "4rem", textAlign: "center" }}>No Subscribed Plans</h1></div>
        )}
      </Layout>
    </>
  );
}
