import React from 'react'

export default function ShowCustomerDetails({userData}) {
    return (
        <div>
            <p>your first name : {userData.firstname}</p>
                <p>your last name : {userData.lastname}</p>
                <p>your email address : {userData.email}</p>
                <p>your Contact number : {userData.contact}</p>
                <h3>address</h3>
                <p>line1 : {userData.address.line1}</p>
                <p>line1 : {userData.address.line2}</p>
                <p>line1 : {userData.address.pincode}</p>
                <p>line1 : {userData.address.state}</p>
        </div>
    )
}
