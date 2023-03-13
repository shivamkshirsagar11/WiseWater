import React, { useState, useContext, useEffect } from "react";
import { CookiesContext } from "../../context/CookiesProvider";
import { addSubscription } from "../../actions/customer/addSubscription";
import MultiToast from "../../actions/shared/MultiToast";
import { useNavigate, useParams } from "react-router-dom";
import { getAllSubscription } from "../../actions/shared/subscription";
import "./subscription.css"
import { DateTime } from "luxon";

export default function SubscriptionForm() {
  const { cookies } = useContext(CookiesContext);
  const { token } = cookies;
  const [notFound, setNotFound] = useState(true)
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
    if (name == "start_date"){
      let curr_date = DateTime.local();
      var p = value.split('-');
      var sd = DateTime.fromFormat(`${p[1]}-${p[2]}-${p[0]}`, 'MM-dd-yyyy');
      if (sd >= curr_date){
        setSubObj(prevState => ({ ...prevState, [name]: value }));
      }
      else{
        setSubObj(prevState => ({ ...prevState, [name]: '' }));
      }
    }
    else setSubObj(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    (async () => {
      const response = await getAllSubscription('customer', 'get-all-plans', token);
      if (response.found) {
        MultiToast('you already have subscription', false);
        navigate('/customer/profile');
      }
      else{
        setNotFound(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
    <>
    {
      !notFound && <form className="subsc" onSubmit={handleSubmit}>
      <label>  Start Date:{" "} </label>
      <input
        type="date"
        name="start_date"
        value={subObj.start_date}
        onChange={handleChange}/>
      <label>How Many Days:{" "}</label>
      <input className="subsc" 
        type="number"
        name="remaining_days"
        max={30}
        min={7}
        value={subObj.remaining_days}
        onChange={handleChange}
      />
      <label>Quantity:{" "}</label>
      <input className="subsc" 
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
        <option value="">Water Type</option>
        <option value="hotWater">Hot Water</option>
        <option value="coldWater">Cold Water</option>
        <option value="normalWater">Normal Water</option>
      </select>
      <label>Company_Name :</label> <input  className="subsc" type="text" name="companyname" value={company_name} readOnly={true} />
      <button type="submit">Subscribe</button>
    </form>
    }
    </>
  );
}
