import React, { useState, useEffect } from "react";
import { sendOtp, verifyOtp } from "../../../actions/Verification/OTPprocess.js";
import MultiToast from "../../../actions/shared/MultiToast.js";
import { useNavigate } from 'react-router-dom';

function OTP({ userData, userType, setCookies, register, requiredCookie, navigateString, toastMsg }) {
  const [otp, setOtp] = useState("");
  let contact;
  if (requiredCookie === 1 || requiredCookie === 0) contact = userData.contact;
  else {
    const { userData: ownerData } = userData;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await verifyOtp(contact, otp);
    console.log(response);
    if (response.status === "approved") {
      MultiToast("OTP Verified", false);
      let response;
      if (requiredCookie === 1) response = await register(userType, userData, false);
      else if (requiredCookie === 0) response = await register(userData, false);
      else if (requiredCookie === 2) response = await register(userType, userData, false);
      console.log(response);
      if ("error" === response.type) {
        MultiToast(response.error, true);
      } else {
        if (requiredCookie) setCookies("token", response.token);
        MultiToast(toastMsg, false);
        navigate(navigateString);
      }
    } else MultiToast("Incorrect OTP", true);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-5">Verify Your Account</h1>
          <form>
            <div className="form-group">
              <label for="verification-code">Enter OTP:</label>
              <br></br>
              <input style={{ lineHeight: "1.5" }} type="text" name="otp" value={otp} onChange={handleInput} className="form-control" id="verification-code" placeholder="XXXXXX" />
            </div>
            <br></br>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit} style={{
                backgroundColor: "#0077be", color: 'white',
              }}>Verify</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default OTP;