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
                    Email:{" "}
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    Password:{" "}
                    <input
                      type="password"
                      value={password}
                      placeholder="Enter password"
                      class="form-control"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <br/>
                    <button
                      type="submit"
                      value={collection}
                      onClick={hadleSubmit}
                      className="btn btn-primary"
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
