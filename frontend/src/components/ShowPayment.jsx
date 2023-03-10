import React from "react";

function ShowPayment({ payment }) {
  return (
    <div>
      {0 !== payment.coldWater.water_quantity && (
        <>
          <p className="data-row">
            <span className="key">water type : </span>{" "}
            <span className="value"> cold water </span>
          </p>
          <p className="data-row">
            <span className="key">water cost : </span>{" "}
            <span className="value"> {payment.coldWater.cost} par litter </span>
          </p>
          <p className="data-row">
            <span className="key">water quantity : </span>{" "}
            <span className="value"> {payment.coldWater.water_quantity} </span>
          </p>
          <p className="data-row">
            <span className="key">total cost : </span>
            <span className="value">
              {payment.coldWater.water_quantity * payment.coldWater.cost}
            </span>
          </p>
        </>
      )}
      {0 !== payment.hotWater.water_quantity && (
        <>
          <p className="data-row">
            <span className="key">water type : </span>{" "}
            <span className="value"> hot water </span>
          </p>
          <p className="data-row">
            <span className="key">water cost : </span>{" "}
            <span className="value"> {payment.hotWater.cost} par litter </span>
          </p>
          <p className="data-row">
            <span className="key">water quantity : </span>{" "}
            <span className="value"> {payment.hotWater.water_quantity} </span>
          </p>
          <p className="data-row">
            <span className="key">total cost : </span>
            <span className="value">
              {payment.hotWater.water_quantity * payment.hotWater.cost}
            </span>
          </p>
        </>
      )}
      {0 !== payment.normalWater.water_quantity && (
        <>
          <p className="data-row">
            <span className="key">water type : </span>{" "}
            <span className="value"> normal water </span>
          </p>
          <p className="data-row">
            <span className="key">water cost : </span>{" "}
            <span className="value">
              {" "}
              {payment.normalWater.cost} par litter{" "}
            </span>
          </p>
          <p className="data-row">
            <span className="key">water quantity : </span>{" "}
            <span className="value">
              {" "}
              {payment.normalWater.water_quantity}{" "}
            </span>
          </p>
          <p className="data-row">
            <span className="key">total cost : </span>
            <span className="value">
              {payment.normalWater.water_quantity * payment.normalWater.cost}
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default ShowPayment;
