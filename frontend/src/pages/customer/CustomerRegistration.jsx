import React, { useContext, useState } from "react";
import { registerUser } from "../../actions/shared/registerUser.js";
import UserDetailsForm from "../shared/form/UserDetailsForm.jsx";
import AddressDetailsForm from "../shared/form/AddressDetailsForm.jsx";
import MultiToast from "../../actions/shared/MultiToast.js";
import { CookiesContext } from "../../context/CookiesProvider.js";
import OTP from "../shared/form/OTP.jsx";

function CustomerRegistration() {

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
  const styles = {
    backgroundColor: '#bbdefb',

  };
  return (

    <body style={styles}>
      {!flag && (
        <div className="container " style={{ backgroundColor: "#e3f2fd" }}>
          <h1 className="text-center " style={{ color: '#0077be' }}>
            <span className="fw-bold">Customer Registration </span>
          </h1>
          <form method="post">
            <UserDetailsForm userData={userData} setUserData={setUserData} />
            <AddressDetailsForm
              address={userData.address}
              setAddress={setAddress}
            />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-success "
                style={{
                  backgroundColor: "#0077be", color: 'white',
                }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

      )}
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
    </body>

  );
}

export default CustomerRegistration;
