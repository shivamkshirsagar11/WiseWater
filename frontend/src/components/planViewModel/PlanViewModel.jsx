import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./OrderViewModel.css";
import AddressModal from "../AddressModal";

const PlanViewModel = (props) => {
    const data = props.data;
    const { plan, customer, userType, worker } = data;

    console.log("from plan modal",props.data)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div style={{"background-image":"linear-gradient(#eef2f3, #8e9eab)"}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    plan ID {plan._id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="data-row">
                    <span className="key">Start Date: </span>{" "}
                    <span className="value"> {plan.start_date} </span>
                </p>
                <p className="data-row">
                    <span className="key">Water Type</span>{" "}
                    <span className="value"> {plan.water_type} </span>
                </p>
                <p className="data-row">
                    <span className="key">Remaining days</span>{" "}
                    <span className="value"> {plan.remaining_days} </span>
                </p>
                <p className="data-row">
                    <span className="key">Next Expected Delievery</span>{" "}
                    <span className="value"> {plan.next_date} </span>
                </p>
                <p className="data-row">
                    <span className="key">Plan Status</span>{" "}
                    <span className="value"> {plan.status} </span>
                </p>
                <hr/>
                {
        (userType === "owner" || userType === "worker") &&
        <>
        <h5>Customer Details</h5>
        <p className="data-row">
                    <span className="key">User Name</span>{" "}
                    <span className="value"> {customer.firstname} {" "} {customer.lastname} </span>
                </p>
        <p className="data-row">
                    <span className="key">User Contact</span>{" "}
                    <span className="value"> {customer.contact} </span>
                </p>
                <hr/>
        </>
      }

      {(userType === "owner" || userType === "worker") && <>
      <h5>Customer Address</h5>
      <AddressModal address={customer.address}/>
      <hr/>
      </>
      }{
        worker && userType === "owner" &&
        <>
        <h5>
          Worker Details
        </h5>
        <p className="data-row">
                    <span className="key">Worker Name</span>{" "}
                    <span className="value"> {worker.firstname} {" "} {worker.lastname} </span>
                </p>
        <p className="data-row">
                    <span className="key">Worker Contact</span>{" "}
                    <span className="value"> {worker.contact} </span>
                </p>
        <hr/>
        </>
      }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            </div>
        </Modal>
    );
};
export default PlanViewModel;