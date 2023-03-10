import React, { useState, useContext } from "react";
import { CookiesContext } from "../../context/CookiesProvider";
import { addSubscription } from "../../actions/customer/addSubscription";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate, useParams } from "react-router-dom";

export default function SubscriptionForm() {
  const { cookies } = useContext(CookiesContext);
  const { token } = cookies;
  console.log(token);
  const { company_name } = useParams();
  const [subObj, setSubObj] = useState({
    quantity: 0,
    remaining_days: 0,
    start_date: "",
    water_type: "choose one",
    company_name
  });
  const navigate = useNavigate();
  const handleChange = e => {
    const { name, value } = e.target;
    setSubObj(prevState => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    
    const res = await addSubscription(token, subObj);
    if (false === res.authenticated) {
      MultiToast(res.message, true);
      navigate('/');
    }
    console.log(res);
    if (res.type === "error") {
      MultiToast(res.error, true);
    } else {
      MultiToast("Your Plan will start soon", false);
      navigate('/customer/get-subscription-details');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      Start date:{" "}
      <input
        type="date"
        name="start_date"
        value={subObj.start_date}
        onChange={handleChange}
      />
      how many days:{" "}
      <input
        type="number"
        name="remaining_days"
        max={30}
        min={7}
        value={subObj.remaining_days}
        onChange={handleChange}
      />
      Quantity:{" "}
      <input
        type="number"
        name="quantity"
        value={subObj.quantity}
        onChange={handleChange}
      />
      <select
        name="water_type"
        onChange={handleChange}
        value={subObj.water_type}
      >
        <option value="">water type</option>
        <option value="hotWater">hot water</option>
        <option value="coldWater">cold water</option>
        <option value="normalWater">normal water</option>
      </select>
      companyname : <input type="text" name="companyname" value={company_name} readOnly={true} />
      <button type="submit">subscrie</button>
    </form>
  );
}
