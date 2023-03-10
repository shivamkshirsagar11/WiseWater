import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./PaymentViewModel.css";
import ShowPayment from "../../../components/ShowPayment";

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