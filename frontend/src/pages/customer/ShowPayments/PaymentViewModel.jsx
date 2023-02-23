import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./PaymentViewModel.css";

const PaymentViewModel = (props) => {
    const { data } = props;
    console.log(props.data)
    const { payment } = data;
    console.log(payment.coldWater)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Company Name : {data.company_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="data-row">
                    <span className="key">contact No : </span>{" "}
                    <span className="value"> {data.contact} </span>
                </p>

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
                    <span className="value">{payment.coldWater.water_quantity * payment.coldWater.cost}</span>
                </p>
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
                    <span className="value">{payment.hotWater.water_quantity * payment.hotWater.cost}</span>
                </p>
                <p className="data-row">
                    <span className="key">water type : </span>{" "}
                    <span className="value"> normal water </span>
                </p>
                <p className="data-row">
                    <span className="key">water cost : </span>{" "}
                    <span className="value"> {payment.normalWater.cost} par litter </span>
                </p>
                <p className="data-row">
                    <span className="key">water quantity : </span>{" "}
                    <span className="value"> {payment.normalWater.water_quantity} </span>
                </p>
                <p className="data-row">
                    <span className="key">total cost : </span>
                    <span className="value">{payment.normalWater.water_quantity * payment.normalWater.cost}</span>
                </p>
                <hr />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default PaymentViewModel;