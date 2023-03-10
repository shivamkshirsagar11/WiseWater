import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CompanyViewModel.css";

const ViewModal = (props) => {
    const data = props.data;
    console.log(props.data)
    return (
         <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> 

        <div > 
             <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {data.name}
                </Modal.Title>
            </Modal.Header> 
             <Modal.Body>
                <p className="data-row">
                    <span className="key">Name : </span>{" "}
                    <span className="value"> {data.name} </span>
                </p>
                <p className="data-row">
                    <span className="key">Contact : </span>{" "}
                    <span className="value"> {data.contact} </span>
                </p>
                <p className="data-row">
                    <span className="key">Email : </span>{" "}
                    <span className="value"> {data.email} </span>
                </p>
                <p className="data-row">
                    <span className="key">Rating : </span>{" "}
                    <span className="value"> {data.rating} </span>
                </p>
                <p className="data-row">
                    <span className="key">Service Time : </span>{" "}
                    <span className="value"> {data.serviceTime} </span>
                </p>
                <hr></hr>

                <h5>Water Price</h5>
                <p className="data-row">
                    <span className="key">Cold Water: </span>{" "}
                    <span className="value"> {data.waterPrice.coldWater}rs </span>
                </p>
                <p className="data-row">
                    <span className="key">Normal Water: </span>{" "}
                    <span className="value"> {data.waterPrice.normalWater}rs </span>
                </p>
                <p className="data-row">
                    <span className="key">Hot Water: </span>{" "}
                    <span className="value"> {data.waterPrice.hotWater}rs </span>
                </p>
                <hr></hr>

                <h5>Company Address</h5>
                <p className="data-row">
                    <span className="key">Line1 : </span>{" "}
                    <span className="value"> {data.address.line1} </span>
                </p>
                <p className="data-row">
                    <span className="key">Line2 : </span>{" "}
                    <span className="value"> {data.address.line2} </span>
                </p>
                <p className="data-row">
                    <span className="key">City : </span>{" "}
                    <span className="value"> {data.address.city} </span>
                </p>
                <p className="data-row">
                    <span className="key">Pincode : </span>{" "}
                    <span className="value"> {data.address.pincode} </span>
                </p>
                <p className="data-row">
                    <span className="key">State : </span>{" "}
                    <span className="value"> {data.address.state} </span>
                </p>
            </Modal.Body> 
             
         </div>
        </Modal> 
        
    );
};

export default ViewModal;


