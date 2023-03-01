import React from "react";

function UserDetailsForm({ userData, setUserData }) {
  const {
    firstname,
    lastname,
    email,
    contact,
    password,
    confirmPassword,
  } = userData;

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container col-sm-6">
      <div className="input-group">
        <span className="input-group-text">Name</span>
        <input
          type="text"
          aria-label="First name"
          className="form-control"
          name="firstname"
          placeholder="Enter First Name"
          onChange={handleInputData}
          value={firstname}
        />
        <input
          type="text"
          aria-label="Last name"
          className="form-control"
          name="lastname"
          placeholder="Enter Last Name"
          onChange={handleInputData}
          value={lastname}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1 " className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control "
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          name="email"
          onChange={handleInputData}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput4" className="form-labe1">
          Contact
        </label>
        <input
          className="form-control form-control-sm"
          id="exampleFormControlInput4"
          placeholder="10 digits"
          type="text"
          name="contact"
          onChange={handleInputData}
          value={contact}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput4" className="form-labe1">
          Password
        </label>
        <input
          className="form-control"
          id="exampleFormControlInput4"
          placeholder="Must be atleast 8 digits with atleast 1 capital,1 digit,1 special (@, $, !, &, etc)"
          type="password"
          name="password"
          onChange={handleInputData}
          value={password}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput4" className="form-labe1">
          Confirm Password
        </label>
        <input
          className="form-control"
          id="exampleFormControlInput4"
          placeholder=""
          type="password"
          name="confirmPassword"
          onChange={handleInputData}
          value={confirmPassword}
        />
      </div>
    </div>
  );
}

export default UserDetailsForm;
