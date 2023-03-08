import React from 'react';
function AddressDetails({ address }) {
  const styles = {
    padding: "15px",
    textAlign: "left",
    fontSize: "25px",
    fontWeight: "700",
    fontFamily: "-moz-initial",
    color: "#002171"


  }
  return (
    <div >
      <div>
        <div className="display- 7" style={{ textAlign: "center", fontFamily: "cursive", color: "darkblue", fontSize: "2rem", fontWeight: "500" }}>Address</div>
        <table style={{ margin: "0 auto" }}>
          <tbody >
            <tr >
              <td style={styles}>Line1 </td>
              <td style={styles}>:---</td>
              <td style={styles}>{address.line1}</td>
            </tr>
            <tr >
              <td style={styles}>Line2</td>
              <td style={styles}>:---</td>
              <td style={styles}>{address.line2}</td>
            </tr>
            <tr >
              <td style={styles}>Pincode</td>
              <td style={styles}>:---</td>
              <td style={styles}>{address.pincode}</td>
            </tr>
            <tr >
              <td style={styles}>State</td>
              <td style={styles}>:---</td>
              <td style={styles}>{address.state}</td>
            </tr>
          </tbody>
        </table>


      </div>
    </div>

  )
}

export default AddressDetails