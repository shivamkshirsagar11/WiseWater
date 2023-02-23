import React from 'react'
import Clock from 'react-digital-clock';

export default function UserDetails({ userData, userType }) {
    return (
        <div className="container">
             <div className="card text-center" style={{"backgroundImage":"linear-gradient(#b993d6, #8ca6db)"}}>
  <div className="display-7 card-header">
    {userType}
  </div>
  <div className="card-body">
    <h4 className="display-7 card-text">your first name : {userData.firstname}</h4>
    <h4 className="display-7 card-text">your last name : {userData.lastname}</h4>
    <h4 className="display-7 card-text">your email address : {userData.email}</h4>
    <h4 className="display-7 card-text">your Contact number : {userData.contact}</h4>
  </div>
  <div className="display-8 card-footer text-muted">
    Current Time: <Clock/>
  </div>
</div>
        </div>
    )
}
