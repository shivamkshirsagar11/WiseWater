import React from 'react'

export default function AddressModal({address}) {
  return (
    <div>
      <p className="data-row">
                    <span className="key">Line1</span>{" "}
                    <span className="value"> {address.line1} </span>
                </p>
      <p className="data-row">
                    <span className="key">Line2</span>{" "}
                    <span className="value"> {address.line2} </span>
                </p>
      <p className="data-row">
                    <span className="key">Pincode</span>{" "}
                    <span className="value"> {address.pincode} </span>
                </p>
      <p className="data-row">
                    <span className="key">State</span>{" "}
                    <span className="value"> {address.state} </span>
                </p>
    </div>
  )
}
