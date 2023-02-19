import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/guestUser/loginUser.js";
import "react-toastify/dist/ReactToastify.css";
import MultiToast from "../../actions/shared/MultiToast.js";
import Card from "../../components/Card.jsx";
import ownerImage from "../../media/p1.jpg";
import customerImage from "../../media/p2.jpg";
import workerImage from "../../media/p3.jpg";
export default function Login({ setCookies }) {
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
              toLink = "/customer/register"
              text = {"Signup"}
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
              toLink = "/show-companies"
              text = {"Apply for job"}
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
              toLink = "/owner/register"
              text = {"Signup"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
