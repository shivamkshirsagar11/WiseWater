import React from "react";
import AddressDetails from "./AddressDetails";
export default function SubscriptionDetails({ plan, customer, userType, worker }) {
  return (
    <ul>
      <li>Start Date: {plan.start_date}</li>
      <li>Water Type: {plan.water_type}</li>
      <li>Remaining Days: {plan.remaining_days}</li>
      <li>Next Delivery: {plan.next_date}</li>
      <li>Plan Activation Status: {plan.status}</li>
      <hr/>
      {
        (userType === "owner" || userType === "worker") &&
        <>
        <h3>Customer Details</h3>
        <li>
          user name: {customer.firstname} {" "} {customer.lastname}
        </li>
        <li>
          user contact: {customer.contact}
        </li>
        </>
      }
      {(userType === "owner" || userType === "worker") && <>
      <AddressDetails address={customer.address}/>
      <hr/>
      </>
      }
      {
        worker !== null && userType === "owner" &&
        <>
        <h3>
          Worker Details
        </h3>
        <li>
          worker name: {worker.firstname} {" "} {worker.lastname}
        </li>
        <li>
          worker contact: {worker.contact}
        </li>
        <hr/>
        </>
      }
    </ul>
  );
}
