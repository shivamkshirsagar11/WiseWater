import React from 'react'

export default function SubscriptionDetails({plan}) {
  return (
    <ul>
        <li>
            start date: {plan.start_date}
        </li>
        <li>
            water Type: {plan.water_type}
        </li>
        <li>
            remaining days: {plan.remaining_days}
        </li>
        <li>
            plan activation status: {plan.status}
        </li>
        {
          plan.status !== "pending" &&
           <li>
            worker id : {plan.worker_id}
          </li>
        }
    </ul>
  )
}
