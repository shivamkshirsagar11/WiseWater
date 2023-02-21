import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/guestUser/loginUser.js";
import "react-toastify/dist/ReactToastify.css";
import MultiToast from "../../actions/shared/MultiToast.js";
import Card from "../../components/Card.jsx";
import ownerImage from "../../media/p1.jpg";
import customerImage from "../../media/p2.jpg";
import workerImage from "../../media/p3.jpg";

import { CookiesContext } from '../../context/CookiesProvider.js'

export default function Login() {
    const { setCookies } = useContext(CookiesContext);
    const navigate = useNavigate();
    // console.log(props)
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
            console.log(response.error);
            MultiToast(response.error, true);
        } else {
            setCookies("token", response.token);
            console.log(response.token);
            MultiToast("successfully logged in", false);
            navigate(`/${user.collectionName.toLowerCase()}/profile`);
        }
    };

    return (
        <>
            <h1 className="container display-3">
                Wise Water
            </h1>
            <div className=" container my-3 p-3 mb-2 bg-primary bg-gradient text-blue">
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
        </>
    )
}

