import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./OrderViewModel.css";
import { useState } from "react";

const OrderViewModel = (props) => {
    const data = props.data;
    const { customer_data, worker_data, address } = data;

    console.log(props.data)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    order ID {data.orderId}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="data-row">
                    <span className="key">order status : </span>{" "}
                    <span className="value"> {data.status} </span>
                </p>
                <h5>customer details</h5>
                <p className="data-row">
                    <span className="key">name : </span>{" "}
                    <span className="value"> {customer_data.firstname + " " + customer_data.lastname} </span>
                </p>
                <p className="data-row">
                    <span className="key">contact : </span>{" "}
                    <span className="value"> {customer_data.contact} </span>
                </p>
                <p className="data-row">
                    <span className="key">water quantity : </span>{" "}
                    <span className="value"> {data.water_quantity} </span>
                </p>
                <p className="data-row">
                    <span className="key">water type : </span>{" "}
                    <span className="value"> {data.water_type} </span>
                </p>
                <p className="data-row">
                    <span className="key">water cost : </span>{" "}
                    <span className="value"> {data.cost} par litter </span>
                </p>
                <p className="data-row">
                    <span className="key">total cost : </span>
                    <span className="value">{data.water_quantity * data.cost}</span>
                </p>
                <hr />
                <h5>customer address</h5>
                <p className="data-row">
                    <span className="key">line1 : </span>{" "}
                    <span className="value"> {address.line1} </span>
                </p>
                <p className="data-row">
                    <span className="key">line2 : </span>{" "}
                    <span className="value"> {address.line2} </span>
                </p>
                <p className="data-row">
                    <span className="key">city : </span>{" "}
                    <span className="value"> {address.city} </span>
                </p>
                <p className="data-row">
                    <span className="key">pincode : </span>{" "}
                    <span className="value"> {address.pincode} </span>
                </p>
                <p className="data-row">
                    <span className="key">state : </span>{" "}
                    <span className="value"> {address.state} </span>
                </p>
                {
                    worker_data &&
                    <>
                        <hr />
                        <h5>worker deatils</h5>
                        <p className="data-row">
                            <span className="key">name : </span>{" "}
                            <span className="value"> {worker_data.firstname + " " + worker_data.lastname} </span>
                        </p>
                        <p className="data-row">
                            <span className="key">contact : </span>{" "}
                            <span className="value"> {worker_data.contact} </span>
                        </p>
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default OrderViewModel;