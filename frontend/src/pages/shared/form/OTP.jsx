import React, { useState, useEffect } from "react";
import { sendOtp, verifyOtp } from "../../../actions/Verification/OTPprocess";
import MultiToast from "../../../actions/shared/MultiToast";
import { useNavigate } from 'react-router-dom';

function OTP({ userData, userType, setCookies, register, requiredCookie, navigateString, toastMsg }) {
  const [otp, setOtp] = useState("");
  let contact;
if(requiredCookie == 1 || requiredCookie == 0) contact = userData.contact;
else{
  const { userData: ownerData, companyData } = userData;
  console.log(ownerData)
  contact = ownerData.contact
}
console.log(contact);
 const navigate = useNavigate();
  useEffect(() => {
    const initiateOtp = async () => {
      const response = await sendOtp(contact);
      console.log(response);
    };
    initiateOtp();
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    const response = await verifyOtp(contact, otp);
    console.log(response);
    if (response.status == "approved") {
      MultiToast("OTP Verified", false);
      let response;
      if(requiredCookie == 1) response = await register(userType, userData, false);
      else if(requiredCookie == 0) response = await register(userData, false);
      else if(requiredCookie == 2) response = await register(userType, userData, false);
      console.log(response);
      if ("error" === response.type) {
        MultiToast(response.error, true);
      } else {
        if(requiredCookie) setCookies("token", response.token);
        MultiToast(toastMsg, false);
        navigate(navigateString);
      }
    } else MultiToast("Incorrect OTP", true);
  };

  return (
    <div>
      <h1>Enter OTP</h1>
      <br />
      <input type="text" name="otp" onChange={handleInput} value={otp} />
      <br />
      <button onClick={handleSubmit}>Verify</button>
    </div>
  );
}

export default OTP;
