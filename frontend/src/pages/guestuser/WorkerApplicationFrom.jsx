import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { submitJobApplication } from '../../actions/guestUser/submitJobApplication'
import MultiToast from '../../actions/shared/MultiToast';
import OTP from '../shared/form/OTP';

export default function WorkerApplicationFrom() {
  const navigate = useNavigate();
  const { companyname } = useParams();
  const [flag, setFlag] = useState(false);
  const [userData, setuserData] = useState({
    firstname: '', lastname: '', email: '', contact: '', companyname
  });

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setuserData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await submitJobApplication(userData, true);
    if ("error" === response.type) MultiToast(response.error, true);
    else setFlag(true);
  }

  return (
    <>
    {!flag && <div>
      <form method="post" >
        firstName : <input type="text" name="firstname" onChange={handleInputData} value={userData.firstname} />
        lastName : <input type="text" name="lastname" onChange={handleInputData} value={userData.lastname} />
        email : <input type="email" name="email" onChange={handleInputData} value={userData.email} />
        contact : <input type="text" name="contact" onChange={handleInputData} value={userData.contact} />
        companyname : <input type="text" name="companyname" value={userData.companyname} readOnly={true} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>}
    {flag && <OTP userData={userData} userType="" register = {submitJobApplication} setCookies={()=>{}} navigateString = {"/"} requiredCookie = {0} toastMsg = {"Application Sent Successfully"}/>}
    </>
  );
}