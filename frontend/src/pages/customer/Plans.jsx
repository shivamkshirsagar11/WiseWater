import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { CookiesContext } from '../../context/CookiesProvider.js';
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate } from "react-router-dom";
import { getAllSubscription } from "../../actions/shared/subscription";
import SubscriptionDetails from "../shared/details/SubscriptionDetails";
export default function Plans() {
  const [spinner, setSpinner] = useState(true);
  const [customerPlans, setCustomerPlans] = useState(true);
  const { cookies } = useContext(CookiesContext);
  const navigate = useNavigate();

  useEffect(() => {
    const { token } = cookies;

    const fetchData = async () => {
        setSpinner(true);
        const response = await getAllSubscription("customer", "get-all-plans", token);
        if ('error' === response.type) {
            MultiToast(response.error, true);
            navigate('/login');
        }
        setCustomerPlans(response.plans);
        setSpinner(false);
        console.log(response.plans)
    }
    fetchData();
}, [cookies]);
  return <>
  {
    spinner
    &&
    <Spinner/>
  }
  {
  !spinner 
  && 
 customerPlans.length > 0
 ?
 customerPlans.map((plans, index) =>{
  return (
  <div key={index}>
    <p>Plan {index}</p>
 <SubscriptionDetails plan={plans}/>
  </div>
  )
 })
 :
 <p>NO subscribed plans</p>
    }
  </>;
}
