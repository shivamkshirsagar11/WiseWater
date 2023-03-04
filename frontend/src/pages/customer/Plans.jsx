import React, { useState, useEffect, useContext } from "react";
import Spinner from "../Spinner";
import { CookiesContext } from "../../context/CookiesProvider.js";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate } from "react-router-dom";
import { getAllSubscription } from "../../actions/shared/subscription";
import SubscriptionDetails from "../shared/details/SubscriptionDetails";
import PlanViewModel from "../../components/planViewModel/PlanViewModel"
import AddPlan from "./AddPlan";
import Layout from "../shared/Layout/Layout.jsx";

export default function Plans() {
  const [spinner, setSpinner] = useState(true);
  const [hidePage, setHidePage] = useState(true);
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
      if ("error" === response.type) {
        MultiToast(response.error, true);
        navigate("/login");
      }
      setCustomerPlans(response.plans);
      setSpinner(false);
      console.log(response.plans);
    };
    fetchData();
  }, [cookies, hidePage]);
  const showAddPage = (e)=>{
    setHidePage(false)
  }
  return (
    <>
     <Layout userType={'customer'}style={{backgroundColor:"#670e00"}}
             >
      {spinner && <Spinner />}
      {!spinner && hidePage && customerPlans.length == 0 &&<button onClick={showAddPage}>Add +</button>}
      {!spinner && hidePage && customerPlans.length > 0 ? (
        customerPlans.map((plans, index) => {
          return (
            <div key={index}>
              <p>Daily Delievery Plan</p>
              <PlanViewModel
                show={planViewModelState}
                onHide={() => setPlanViewModelState(false)}
                data={{plan:plans, userType:"customer"}}
            />
                        <button className="btn btn-warning" onClick={() => setPlanViewModelState(true)}>Plan details</button>
            </div>
          );
        })
      ) : (
        hidePage && <p>NO subscribed plans</p>
      )}
      {
        !spinner && !hidePage && <AddPlan hideThisPage={setHidePage}/>
      }
      </Layout>
    </>
  );
}
