import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitJobApplication } from "../../actions/guestUser/submitJobApplication.js";
import MultiToast from "../../actions/shared/MultiToast.js";
import OTP from "../shared/form/OTP.jsx";

export default function WorkerApplicationFrom() {
  const navigate = useNavigate();
  const { companyname } = useParams();
  const [flag, setFlag] = useState(false);
  const [userData, setuserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    companyname,
  });

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setuserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await submitJobApplication(userData, true);
    if ("error" === response.type) MultiToast(response.error, true);
    else setFlag(true);
  };

  return (
    <>
      {!flag && (
        <div>
          <h3 className="container-sm my-5 display-3">Worker Application</h3>
          <form method="post" className="container my-5">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                name="email"
                onChange={handleInputData}
                value={userData.email}
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">First and last name</span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
                name="firstname"
                onChange={handleInputData}
                value={userData.firstname}
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
                name="lastname"
                onChange={handleInputData}
                value={userData.lastname}
              />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput4" className="form-labe1">
                Contact
              </label>
              <input
                className="form-control"
                id="exampleFormControlInput4"
                placeholder="1234567890 10-digits"
                type="text"
                name="contact"
                onChange={handleInputData}
                value={userData.contact}
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput4" className="form-labe1">
                CompanyName
              </label>
              <input
                className="form-control"
                id="exampleFormControlInput4"
                placeholder="1234567890 10-digits"
                type="text"
                name="companyname"
                value={userData.companyname}
                readOnly={true}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-warning"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {flag && (
        <OTP
          userData={userData}
          userType=""
          register={submitJobApplication}
          setCookies={() => {}}
          navigateString={"/"}
          requiredCookie={0}
          toastMsg={"Application Sent Successfully"}
        />
      )}
    </>
  );
}
