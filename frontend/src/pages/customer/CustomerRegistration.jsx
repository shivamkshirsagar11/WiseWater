import React, { useContext, useState } from "react";
import { registerUser } from "../../actions/shared/registerUser.js";
import UserDetailsForm from "../shared/form/UserDetailsForm.jsx";
import AddressDetailsForm from "../shared/form/AddressDetailsForm.jsx";
import MultiToast from "../../actions/shared/MultiToast.js";
import { useNavigate } from "react-router-dom";
import { CookiesContext } from "../../context/CookiesProvider.js";
import OTP from "../shared/form/OTP.jsx";

function CustomerRegistration() {
  const navigate = useNavigate();

  const { setCookies } = useContext(CookiesContext);
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
    const response = await registerUser("customer", userData, true);
    if ("error" === response.type) MultiToast(response.error, true);
    else setFlag(true);
  };

  const setAddress = (address) => {
    setUserData((prevState) => ({ ...prevState, address: { ...address } }));
  };

  const customer = { ...userData, address: { ...userData.address } };
  return (
    <>
      {!flag && (
        <div className="container my-3">
          <h3 className="display-4">Customer Registration</h3>
          <form method="post">
            <UserDetailsForm userData={userData} setUserData={setUserData} />
            <AddressDetailsForm
              address={userData.address}
              setAddress={setAddress}
            />
            <button
              type="submit"
              className="btn btn-success"
              style={{
                "background-image": "linear-gradient(#525252, #3d72b4)",
              }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      )}
<<<<<<< HEAD
      {flag && (
        <OTP
          userData={customer}
          userType="customer"
          register={registerUser}
          setCookies={setCookies}
          navigateString={"/customer/profile"}
          requiredCookie={1}
          toastMsg={"you are registered successfully"}
        />
      )}
=======
      {flag && <OTP userData={customer} userType="customer" register={registerUser} setCookies={setCookies} navigateString={"/customer/profile"} requiredCookie={1} toastMsg={"you are registered successfully"} />}
>>>>>>> 9e042aa5c04475af0a7fc08bdf0b647e4fffefc1
    </>
  );
}

export default CustomerRegistration;
