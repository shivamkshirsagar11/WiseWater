import React, { useState } from "react";
import { registerUser } from "../../actions/shared/registerUser.js";
import UserDetailsForm from "../shared/form/UserDetailsForm.jsx";
import AddressDetailsForm from "../shared/form/AddressDetailsForm.jsx";
import MultiToast from "../../actions/shared/MultiToast.js";
import { useNavigate } from "react-router-dom";
// import OTP from "../shared/form/OTP.jsx";

function CustomerRegistration({ setCookies }) {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    address: { line1: "", line2: "", city: "", pincode: "", state: "" },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser("customer", userData, false);
    if ("error" === response.type) MultiToast(response.error, true);
    // else setFlag(true);
    else {
      navigate('/customer/profile')
    }
  };

  const setAddress = (address) => {
    setUserData((prevState) => ({ ...prevState, address: { ...address } }));
  };

  const customer = { ...userData, address: { ...userData.address } };
  return (
    <>
      {!flag && (
        <div className="container my-3">
          <h3 className="display-4">
            Customer Registration
          </h3>
          <form method="post">
            <UserDetailsForm userData={userData} setUserData={setUserData} />
            <AddressDetailsForm
              address={userData.address}
              setAddress={setAddress}
            />
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
      {/* {flag && <OTP userData={customer} userType="customer" register = {registerUser} setCookies={setCookies} navigateString = {"/customer/profile"} requiredCookie = {1} toastMsg = {"you are registered successfully"}/>} */}
    </>
  );
}

export default CustomerRegistration;
