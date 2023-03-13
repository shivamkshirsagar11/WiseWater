import React from 'react';
import AddressDetailsForm from './AddressDetailsForm.jsx';

function CompanyDetailsForm({ companyData, setCompanyData }) {
  const { name, email, contact, serviceTime, waterPrice } = companyData;

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setCompanyData(prevState => ({ ...prevState, [name]: value }));
  }

  const setWaterPrice = (event) => {
    const { name, value } = event.target;
    setCompanyData(prevState => {
      prevState.waterPrice = { ...prevState.waterPrice, [name]: value };
      return ({ ...prevState });
    })
  }

  const setAddress = (address) => {
    setCompanyData(prevState => ({ ...prevState, address: { ...address } }));
  }

  return (
    <div>
    <div className="container col-sm-6">
      <div className="">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">
            company name  
          </span>
          <input
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            name="name" onChange={handleInputData} value={name}
          />
        </div>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Company Email
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
          Company Contact
        </label>
        <input
          className="form-control"
          id="exampleFormControlInput4"
          placeholder="10-digits"
          type="text"
          name="contact"
          onChange={handleInputData}
          value={contact}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput4" className="form-labe1">
          Company service time
        </label>
        <input
          className="form-control"
          id="exampleFormControlInput4"
          placeholder="9am to 6pm..."
          type="text"
          name="serviceTime" onChange={handleInputData} value={serviceTime}
        />
      </div>
      <h4 className="display-6 text-center">Water Prices</h4>
      <div className="input-group mb-3">
        <span className="input-group-text">Cold Water</span>
        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" name="coldWater" onChange={setWaterPrice} value={waterPrice.coldWater} />
        <span className="input-group-text">.00</span>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Normal Water</span>
        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" name="normalWater" onChange={setWaterPrice} value={waterPrice.normalWater} />
        <span className="input-group-text">.00</span>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Hot Water</span>
        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" name="hotWater" onChange={setWaterPrice} value={waterPrice.hotWater} />
        <span className="input-group-text">.00</span>
      </div>
    </div>
    <h4 className="display-6 text-center">Company Address</h4>
    <AddressDetailsForm address={companyData.address} setAddress={setAddress} />
    </div>
  )
}

export default CompanyDetailsForm