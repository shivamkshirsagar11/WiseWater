// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// // import "./PaymentViewModel.css";

// const UserViewModel = (props) => {
//     const { user } = props;
//     console.log(props.user)

//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     title
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p className="user-row">
//                     <span className="key">contact No : </span>{" "}
//                     {/* <span className="value"> {customer_user.contact} </span> */}
//                 </p>
//                 <hr />
//                 <p>address</p>
//                 <p>
//                     <span className="key">line1 : </span>{" "}
//                     {/* <span className="value"> {customer_user.address.line1} </span> */}
//                 </p>
//                 <p>
//                     <span className="key">line2 : </span>{" "}
//                     {/* <span className="value"> {customer_user.address.line2} </span> */}
//                 </p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={props.onHide}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };
// export default UserViewModel;









import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import "./PaymentViewModel.css";

const UserViewModel = (props) => {
    const { onHide, user, userType } = props;
    console.log(userType)
    console.log(user)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {user.firstname} {user.lastname}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="data-row">
                    <span className="key">Contact No : </span>{" "}
                    <span className="value"> {user.contact} </span>
                </p>
                <p className="data-row">
                    <span className="key">Email : </span>{" "}
                    <span className="value"> {user.email} </span>
                </p>
                {
                    userType === 'customer' &&
                    <>
                        < hr />
                        <p>Address</p>
                        <p>
                            <span className="key">Line1 : </span>{" "}
                            <span className="value"> {user.address.line1} </span>
                        </p>
                        <p>
                            <span className="key">Line2 : </span>{" "}
                            <span className="value"> {user.address.line2} </span>
                        </p>
                        <p>
                            <span className="key">City : </span>{" "}
                            <span className="value"> {user.address.city} </span>
                        </p>
                        <p>
                            <span className="key">Pincode : </span>{" "}
                            <span className="value"> {user.address.pincode} </span>
                        </p>
                        <p>
                            <span className="key">State : </span>{" "}
                            <span className="value"> {user.address.state} </span>
                        </p>
                    </>
                }
            </Modal.Body>
        </Modal>
    );
};
export default UserViewModel;