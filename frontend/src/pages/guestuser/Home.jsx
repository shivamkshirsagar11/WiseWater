import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/guestUser/loginUser.js";
import "react-toastify/dist/ReactToastify.css";
import MultiToast from "../../actions/shared/MultiToast.js";
import Card from "../../components/Card.jsx";
import ownerImage from "../../media/owner.jfif";
import customerImage from "../../media/customer.jfif";
import workerImage from "../../media/worker2.jfif";

import { CookiesContext } from '../../context/CookiesProvider.js'

export default function Login() {
    const { setCookies } = useContext(CookiesContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const hadleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            collectionName: e.target.value,
            email: email,
            password: password,
        };
        const response = await loginUser(user);
        console.log(response);
        if ("error" === response.type) {
            MultiToast(response.error, true);
        } else {
            setCookies("token", response.token);
            MultiToast("successfully logged in", false);
            navigate(`/${user.collectionName.toLowerCase()}/profile`);
        }
    };
    const styles = {
        backgroundColor: '#bbdefb',

    };
    const cards = {
        backgroundColor: '#10a2ff',
    };
    const hea = {
        backgroundColor: "#64B5F6",
        padding: "12px",
        textAlign: "center",
        // backgroundImage: "water",
    }
    const ti = {
        color: "darkblue",
        fontSize: "45px",
        margin: "0",
        textTransform: "uppercase"

    }
    return (
        <div style={styles} >
            {/* // <h1 className="container display-3" > 
            //     Wise Water
            // </h1> */}

            <header style={hea} >
                <h1 className="header-title" style={ti}>Wise Water</h1>
            </header>
            <div className=" container p-3 mb-2   bg-gradient text-blue" style={cards} >
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <form>
                        <div className="row align-items-center">
                            <div className="col">
                                <Card
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    hadleSubmit={hadleSubmit}
                                    collection={"Customer"}
                                    varC={"One"}
                                    src={customerImage}
                                    toLink="/customer/register"
                                    text={"Signup"}
                                />
                            </div>
                            <div className="col">
                                <Card
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    hadleSubmit={hadleSubmit}
                                    collection={"Worker"}
                                    varC={"Two"}
                                    src={workerImage}
                                    toLink="/show-companies"
                                    text={"Apply for job"}
                                />
                            </div>
                            <div className="col">
                                <Card
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    hadleSubmit={hadleSubmit}
                                    collection={"Owner"}
                                    varC={"Three"}
                                    src={ownerImage}
                                    toLink="/owner/register"
                                    text={"Signup"}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

