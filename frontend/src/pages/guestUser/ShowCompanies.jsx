import React, { useEffect, useState, useRef } from "react";
import Spinner from "../Spinner.jsx";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { giveCompaniesData } from "../../actions/guestUser/giveCompaniesData.js";
import { giveUserType } from "../../actions/guestUser/giveUserType.js";
import MultiToast from "../../actions/shared/MultiToast.js";

//  not 100% sure how this code works
// REASON :- useEffect with useRef

// now it seems like i am able to understand how useRef is works
// and changed comapnies object from useState hook to useRef hook
// REASON :- optimization

export default function ShowCompanies({ cookies }) {
  const navigate = useNavigate();
  const companies = useRef([]);
  const [userType, setUserType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedCompanies, setSearchedCompanies] = useState([]);
  const fuse = useRef(null);

  useEffect(() => {
    const { token } = cookies;
    setLoading(true);
    const fetchData = async () => {
      var response = await giveCompaniesData();
      if ("error" === response.type) {
        MultiToast(response.error, true);
        return;
      }
      const companiesData = [...response.companiesData];

      response = await giveUserType(token);
      console.log(response);
      if ("error" === response.type) {
        MultiToast(response.error, true);
        return;
      }
      const userType = response.userType;
      console.log(response.userType);
      fuse.current = new Fuse(companiesData, {
        keys: ["name", "address"],
        includeScore: true,
      });
      companies.current = companiesData;
      setSearchedCompanies(companiesData);
      setUserType(userType);
      setLoading(false);
    };
    fetchData();
  }, [cookies]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (fuse.current) {
      if ("" !== query) {
        const results = fuse.current.search(query);
        const companies = [];
        results.forEach((result) => {
          companies.push(result.item);
        });
        setSearchedCompanies(companies);
      } else setSearchedCompanies(companies.current);
    }
  }, [query]);

  if (true === loading) return <Spinner />;

  const redirectHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    navigate(`${e.target.value}`);
  };

  return (
    <>
      <h3 className="container my-3 display-3">Apply for a job</h3>
      <div className="container-sm input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Companies here"
          aria-describedby="button-addon2"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </div>
      {searchedCompanies.length !== 0 &&
        searchedCompanies.map((company, index) => {
          // change is reuqired from UI
          return (
            <div key={index} className="container">
              <h4 className="display-4" style={{ color: "blue" }}>
                {company.name}
              </h4>
              <p>
                {" "}
                <h5 className="display-7" style={{ color: "green" }}>
                  water price
                </h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    cold water : {company.waterPrice.coldWater}
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    normal water : {company.waterPrice.normalWater}
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    hot water : {company.waterPrice.hotWater}
                  </li>
                </ul>
              </p>
              {"guest" === userType && (
                <button
                  value={`/worker/application/${company.name}`}
                  onClick={redirectHandler}
                  className="btn btn-warning"
                >
                  apply
                </button>
              )}
              {"customer" === userType && (
                <button
                  value={`/customer/placeorder/${company.name}`}
                  onClick={redirectHandler}
                  className="btn btn-warning"
                >
                  place order
                </button>
              )}
            </div>
          );
        })}
      {searchedCompanies.length === 0 && (
        <h4 className="container-sm display-6" style={{ color: "red" }}>
          No Data on This
        </h4>
      )}
    </>
  );
}
