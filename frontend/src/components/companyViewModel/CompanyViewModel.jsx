import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CompanyViewModel.css";

const ViewModal = (props) => {
    const data = props.data;
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
                    {data.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="data-row">
                    <span className="key">name : </span>{" "}
                    <span className="value"> {data.name} </span>
                </p>
                <p className="data-row">
                    <span className="key">contact : </span>{" "}
                    <span className="value"> {data.contact} </span>
                </p>
                <p className="data-row">
                    <span className="key">email : </span>{" "}
                    <span className="value"> {data.email} </span>
                </p>
                <p className="data-row">
                    <span className="key">rating : </span>{" "}
                    <span className="value"> {data.rating} </span>
                </p>
                <p className="data-row">
                    <span className="key">service time : </span>{" "}
                    <span className="value"> {data.serviceTime} </span>
                </p>
                <hr />
                <h5>water price</h5>
                <p className="data-row">
                    <span className="key">cold water : </span>{" "}
                    <span className="value"> {data.waterPrice.coldWater}rs </span>
                </p>
                <p className="data-row">
                    <span className="key">service time : </span>{" "}
                    <span className="value"> {data.waterPrice.normalWater}rs </span>
                </p>
                <p className="data-row">
                    <span className="key">service time : </span>{" "}
                    <span className="value"> {data.waterPrice.hotWater}rs </span>
                </p>
                <hr />
                <h5>copany address</h5>
                <p className="data-row">
                    <span className="key">line1 : </span>{" "}
                    <span className="value"> {data.address.line1} </span>
                </p>
                <p className="data-row">
                    <span className="key">line2 : </span>{" "}
                    <span className="value"> {data.address.line2} </span>
                </p>
                <p className="data-row">
                    <span className="key">city : </span>{" "}
                    <span className="value"> {data.address.city} </span>
                </p>
                <p className="data-row">
                    <span className="key">pincode : </span>{" "}
                    <span className="value"> {data.address.pincode} </span>
                </p>
                <p className="data-row">
                    <span className="key">state : </span>{" "}
                    <span className="value"> {data.address.state} </span>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ViewModal;