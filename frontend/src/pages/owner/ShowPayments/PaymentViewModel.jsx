import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./PaymentViewModel.css";
import ShowPayment from "../../../components/ShowPayment";

const PaymentViewModel = (props) => {
    const { data } = props;
    console.log(props.data)
    const { payment, customer_data } = data;
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
                    customer Name : {customer_data.firstname + ' ' + customer_data.lastname}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="data-row">
                    <span className="key">contact No : </span>{" "}
                    <span className="value"> {customer_data.contact} </span>
                </p>
                <hr />
                <ShowPayment payment={payment}/>
                <hr />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default PaymentViewModel;