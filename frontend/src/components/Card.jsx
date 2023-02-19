import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Card({
  email,
  setEmail,
  password,
  setPassword,
  hadleSubmit,
  collection,
  varC,
  src,
  toLink,
  text
}) {
  return (
    <div>
      <div className="card" style={{ "width": "18rem" }}>
        <img src={src} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{collection}</h5>
          <p className="card-text">{collection} shit</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
              <div className="accordion-item">
                <h2 className="accordion-header" id={`flush-heading${varC}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${varC}`}
                    aria-expanded="false"
                    aria-controls={`#flush-collapse${varC}`}
                  >
                    Login
                  </button>
                </h2>
                <div
                  id={`flush-collapse${varC}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`flush-heading${varC}`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    email:{" "}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    password:{" "}
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      value={collection}
                      onClick={hadleSubmit}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
          </li>
        </ul>
        <div className="card-body">
        <Link to={toLink}>{text}</Link>
        </div>
      </div>
    </div>
  );
}
