import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { CookiesContext } from '../../context/CookiesProvider.js';
import MultiToast from "../../actions/shared/MultiToast";
import { Navigate } from "react-router-dom";
import { subscription } from "../../actions/shared/subscription";

export default function Plans() {
  const [spinner, setSpinner] = useState(true);
  const [customerPlans, setCustomerPlans] = useState(true);
  const { cookies } = useContext(CookiesContext);
  const navigate = Navigate();

  useEffect(() => {
    const { token } = cookies;

    const fetchData = async () => {
        setSpinner(true);
        const response = await subscription("customer", "customer/get-all-plans", token);
        if ('error' === response.type) {
            MultiToast(response.error, true);
            navigate('/login');
        }
        setCustomerPlans(response.plans)
        setSpinner(false);
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
  <div>
    this is customer subscription plans.
    </div>
    }
  </>;
}
