import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ShowOrder from "../components/ShowOrder";
import AssignedWorker from "../components/AssignedWorker";

export default function TrackOrder({ cookies }) {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [showOrder, setShowOrder] = useState([]);
  const [worker, setWorker] = useState([]);
  console.log("order-id",order_id);
  useEffect(() => {
    const fun = async () => {
      const { token } = cookies;
      const response = await fetch(
        `http://localhost:3001/api/customer/track-order
                `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token,order_id:order_id }),
        }
      );
      const data = await response.json();
      if (data.type === "error"){
        navigate("/customer/show-placed-orders");
        throw data.message;
      }
      console.log(data);
      setShowOrder(data.order);
      setWorker(data.worker);
    };
    fun();
  }, []);

  if (null === showOrder) {
    return <Spinner />;
  }
  return (
    <>
      {showOrder.map((order,index) => {
        return (
          <div key={index}>
            <ShowOrder order={order}/>
            {order.status !== "pending" &&
            <AssignedWorker worker={worker}/>
            }
          </div>
        );
      })}
    </>
  );
}
