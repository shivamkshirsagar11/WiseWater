import React from "react";

function AddressDetailsForm({ address, setAddress }) {
  const handleInput = (e) => {
    const { value, name } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <div className="container col-sm-6">
      <div className="input-group">
        <span className="input-group-text">Line 1</span>
        <textarea
          className="form-control form-control-sm"
          aria-label="With textarea"
          name="line1"
          onChange={handleInput}
          value={address.line1}
        ></textarea>
      </div>
      <br />{" "}
      <div className="input-group">
        <span className="input-group-text">Line 2</span>
        <textarea
          className="form-control form-control-sm "
          aria-label="With textarea"
          name="line2"
          onChange={handleInput}
          value={address.line2}
        ></textarea>
      </div>
      <br />
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">
            City
          </span>
          <input
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            name="city"
            onChange={handleInput}
            value={address.city}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">
            Pincode
          </span>
          <input
            type="text"
            className="form-control"
            id="basic-url"
            placeholder="6 digits"
            aria-describedby="basic-addon3"
            name="pincode"
            onChange={handleInput}
            value={address.pincode}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">
            State
          </span>
          <input
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            name="state"
            onChange={handleInput}
            value={address.state}
          />
        </div>
      </div>
    </div>
  );
}

export default AddressDetailsForm;
