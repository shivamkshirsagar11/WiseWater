import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { CookiesContext } from "../../context/CookiesProvider.js";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate } from "react-router-dom";
import { getAllSubscription } from "../../actions/shared/subscription";
import SubscriptionDetails from "../shared/details/SubscriptionDetails";
import AddPlan from "./AddPlan";

export default function Plans() {
  const [spinner, setSpinner] = useState(true);
  const [hidePage, setHidePage] = useState(true);
  const [customerPlans, setCustomerPlans] = useState(true);
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
      if ("error" === response.type) {
        MultiToast(response.error, true);
        navigate("/login");
      }
      setCustomerPlans(response.plans);
      setSpinner(false);
      console.log(response.plans);
    };
    fetchData();
  }, [cookies]);
  const showAddPage = (e)=>{
    setHidePage(false)
  }
  return (
    <>
      {spinner && <Spinner />}
      {!spinner && hidePage && <button onClick={showAddPage}>Add +</button>}
      {!spinner && hidePage && customerPlans.length > 0 ? (
        customerPlans.map((plans, index) => {
          return (
            <div key={index}>
              <p>Plan {index}</p>
              <SubscriptionDetails plan={plans} />
            </div>
          );
        })
      ) : (
        hidePage && <p>NO subscribed plans</p>
      )}
      {
        !spinner && !hidePage && <AddPlan hideThisPage={setHidePage}/>
      }
    </>
  );
}
