import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { CookiesContext } from "../../context/CookiesProvider.js";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate } from "react-router-dom";
import { getAllSubscription } from "../../actions/shared/subscription";
import SubscriptionDetails from "../shared/details/SubscriptionDetails";

export default function ShowAssignedPlans() {
  const [spinner, setSpinner] = useState(true);
  const [customerPlans, setCustomerPlans] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [workers, setWorkers] = useState(null);
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
      if ("error" === response.type) {
        MultiToast(response.error, true);
        navigate("/login");
      }
      setCustomerPlans(response.plans);
      setCustomers(response.customers);
      setWorkers(response.workers);
      setSpinner(false);
    };
    fetchData();
  }, [cookies]);
  
  return (
    <>
      {spinner && <Spinner />}
      {!spinner && customerPlans.length > 0 ? (
        customerPlans.map((plans, index) => {
          return (
            <div key={index}>
              <p>Plan {index}</p>
              <SubscriptionDetails plan={plans} customer={customers[index]} userType={"owner"} worker={workers[index]}/>
            </div>
          );
        })
      ) : (
        <p>NO subscribed plans</p>
      )}
    </>
  );
}
