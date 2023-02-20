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
    <div className="container">
      <div className="input-group">
        <span className="input-group-text">First and last name</span>
        <input
          type="text"
          aria-label="First name"
          className="form-control"
          name="firstname"
          onChange={handleInputData}
          value={firstname}
        />
        <input
          type="text"
          aria-label="Last name"
          className="form-control"
          name="lastname"
          onChange={handleInputData}
          value={lastname}
        />
      </div>
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
          value={email}
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
          placeholder="1234567890 10-digits"
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
          placeholder="1234567890 10-digits"
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
