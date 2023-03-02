import React from 'react'


export default function UserDetails({ userData, userType }) {
  const styles={
    padding: "15px",
		textAlign: "left",
    fontSize:"25px",
    fontWeight:"700",
    fontFamily:"-moz-initial",
    color:"#002171"
    
			
  }
  return (
  <div >
    <div >
    <div className="text-center" style={{backgroundColor:"#0077be"}}>
      <h1 style={{
                  color:'white',fontSize:"2.5rem",fontWeight:"500",fontFamily:"cursive"
                }}>{userType}</h1>
    </div>
    <div >
    <table style={{margin:"0 auto"}}>
      <tbody >
        <tr >
          <td style={styles}>First Name </td>
          <td style={styles}>:---</td>
          <td style={styles}>{userData.firstname}</td>
        </tr>
        <tr >
          <td style={styles}>Last Name </td>
          <td style={styles}>:---</td>
          <td style={styles}>{userData.lastname}</td>
        </tr>
        <tr >
          <td style={styles}>Email </td>
          <td style={styles}>:---</td>
          <td style={styles}>{userData.email}</td>
        </tr>
        <tr >
          <td style={styles}>Contact No </td>
          <td style={styles}>:---</td>
          <td style={styles}>{userData.contact}</td>
        </tr>
      </tbody>
    </table>
      {/* <div  >First Name --: {userData.firstname}</div>
      <div  >Last Name  --: {userData.lastname}</div>
      <div  >Email      --: {userData.email}</div>
      <div  >Contact No --: {userData.contact}</div> */}
    </div>



    </div>
  </div>
    )
}
