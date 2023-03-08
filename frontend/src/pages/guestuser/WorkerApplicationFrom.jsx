import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { submitJobApplication } from "../../actions/guestUser/submitJobApplication.js";
import MultiToast from "../../actions/shared/MultiToast.js";
import OTP from "../shared/form/OTP.jsx";

export default function WorkerApplicationFrom() {
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
    console.log("submitted")
    const response = await submitJobApplication(userData, true);
    if ("error" === response.type) MultiToast(response.error, true);
    else setFlag(true);
  };

  return (
    <>
      {!flag && (
        <div>
          <h1 className="text-center my-4 " style={{ color: '#0077be' }}>
            <span className="fw-bold">Worker Application </span>
          </h1>
          {/* <h3 className="container-sm display-4">Worker Application</h3> */}
          <form method="post" className="container col-sm-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
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
              <span className="input-group-text">Name</span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
                placeholder="First Name"
                name="firstname"
                onChange={handleInputData}
                value={userData.firstname}
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
                name="lastname"
                placeholder="Last Name"
                onChange={handleInputData}
                value={userData.lastname}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-labe1">
                Contact
              </label>
              <input
                className="form-control"
                id="exampleFormControlInput4"
                placeholder="10 digits"
                type="text"
                name="contact"
                onChange={handleInputData}
                value={userData.contact}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-labe1">
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
              className="btn "
              style={{
                backgroundColor: "#0077be", color: 'white',
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {flag && (
        <OTP
          userData={userData}
          userType="worker"
          register={submitJobApplication}
          setCookies={() => { }}
          navigateString={"/"}
          requiredCookie={0}
          toastMsg={"Application Sent Successfully"}
        />
      )}
    </>
  );
}
