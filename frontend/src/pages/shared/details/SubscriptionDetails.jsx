import React from "react";
import AddressDetails from "./AddressDetails";
export default function SubscriptionDetails({ plan, customer, userType }) {
  console.log(customer)
  return (
    <ul>
      <li>start date: {plan.start_date}</li>
      <li>water Type: {plan.water_type}</li>
      <li>remaining days: {plan.remaining_days}</li>
      <li>plan activation status: {plan.status}</li>
      {plan.status !== "pending" && <li>worker id : {plan.worker_id}</li>}
      {
        userType === "owner" &&
        <>
        <li>
          user name: {customer.firstname} {" "} {customer.lastname}
        </li>
        <li>
          user contact: {customer.contact}
        </li>
        </>
      }
      {userType === "owner" && 
      <AddressDetails address={customer.address}/>
      }
    </ul>
  );
}
