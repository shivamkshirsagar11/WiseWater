import React, { useState, useContext } from "react";
import { CookiesContext } from "../../context/CookiesProvider";
import { addSubscription } from "../../actions/customer/addSubscription";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate } from "react-router-dom";

export default function AddPlan({ hideThisPage }) {
  const { cookies } = useContext(CookiesContext);
  const { token } = cookies;
  console.log(token);
  const [subObj, setSubObj] = useState({
    quantity: 0,
    remaining_days: 0,
    start_date: "",
    water_type: "choose one"
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
      hideThisPage(true);
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
      <input type="submit" value="Save" />
    </form>
  );
}
