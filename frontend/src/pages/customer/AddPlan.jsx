import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CookiesContext } from "../../context/CookiesProvider";
import { addSubscription } from "../../actions/customer/addSubscription";
import MultiToast from "../../actions/shared/MultiToast";

export default function AddPlan({ hideThisPage }) {

  const navigate = useNavigate();
  const { cookies } = useContext(CookiesContext);
  const { token } = cookies;
  console.log(token);
  const [showButton, setShowButton] = useState(true)
  useEffect(()=>{
    setTimeout(hideThisPage(false),5000);
  }, [showButton])
  const [subObj, setSubObj] = useState({
    quantity: 0,
    remaining_days: 0,
    start_date: "",
    water_type: "choose one"
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setSubObj(prevState => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async () => {
    const res = await addSubscription(token, subObj);
    console.log(res);
    if (res.type === "error") {
      MultiToast(res.error, true);
    } else {
      setShowButton(false)
      MultiToast("Your Plan will start soon", false);
    }
  };
  return (
    <form>
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
      {showButton && <button onClick={handleSubmit}>Submit</button>}
    </form>
  );
}
