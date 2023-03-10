import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./OrderViewModel.css";

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
            <div >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order ID {data.orderId}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="data-row">
                    <span className="key">Order Status : </span>{" "}
                    <span className="value"> {data.status} </span>
                </p>
                <hr></hr>
                {/* <h5>Your Details</h5> */}
                <p className="data-row">
                    <span className="key">Name : </span>{" "}
                    <span className="value"> {customer_data.firstname + " " + customer_data.lastname} </span>
                </p>
                <p className="data-row">
                    <span className="key">Contact : </span>{" "}
                    <span className="value"> {customer_data.contact} </span>
                </p>
                <p className="data-row">
                    <span className="key">Water Quantity : </span>{" "}
                    <span className="value"> {data.water_quantity} </span>
                </p>
                <p className="data-row">
                    <span className="key">Water Type : </span>{" "}
                    <span className="value"> {data.water_type} </span>
                </p>
                <p className="data-row">
                    <span className="key">Water Cost : </span>{" "}
                    <span className="value"> {data.cost} par litter </span>
                </p>
                <p className="data-row">
                    <span className="key">Total Cost : </span>
                    <span className="value">{data.water_quantity * data.cost}</span>
                </p>
                <hr />
                <h5>Your Address</h5>
                <p className="data-row">
                    <span className="key">Line1 : </span>{" "}
                    <span className="value"> {address.line1} </span>
                </p>
                <p className="data-row">
                    <span className="key">Line2 : </span>{" "}
                    <span className="value"> {address.line2} </span>
                </p>
                <p className="data-row">
                    <span className="key">City : </span>{" "}
                    <span className="value"> {address.city} </span>
                </p>
                <p className="data-row">
                    <span className="key">Pincode : </span>{" "}
                    <span className="value"> {address.pincode} </span>
                </p>
                <p className="data-row">
                    <span className="key">State : </span>{" "}
                    <span className="value"> {address.state} </span>
                </p>
                {
                    worker_data &&
                    <>
                        <hr />
                        <h5>Worker Details</h5>
                        <p className="data-row">
                            <span className="key">Name : </span>{" "}
                            <span className="value"> {worker_data.firstname + " " + worker_data.lastname} </span>
                        </p>
                        <p className="data-row">
                            <span className="key">Contact : </span>{" "}
                            <span className="value"> {worker_data.contact} </span>
                        </p>
                    </>
                }
            </Modal.Body>
            </div>
        </Modal>
    );
};
export default OrderViewModel;