import React, { useEffect, useState, useRef, useContext } from "react";
import Spinner from "../../Spinner.jsx";
import Fuse from "fuse.js";
import { giveCompaniesData } from "../../../actions/guestUser/giveCompaniesData.js";
import { giveUserType } from "../../../actions/guestUser/giveUserType.js";
import MultiToast from "../../../actions/shared/MultiToast.js";
import Layout from "../../shared/Layout/Layout.jsx";
import CompanyList from "./CompanyList.jsx";
import { CookiesContext } from "../../../context/CookiesProvider.js";
import { useNavigate } from "react-router-dom";

//  not 100% sure how this code works
// REASON :- useEffect with useRef

// now it seems like i am able to understand how useRef is works
// and changed comapnies object from useState hook to useRef hook
// REASON :- optimization

export default function ShowCompanies() {
  console.log(useContext(CookiesContext))
  const { cookies } = useContext(CookiesContext);
  const companies = useRef([]);
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchedCompanies, setSearchedCompanies] = useState([]);
  const fuse = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { token } = cookies;
    setLoading(true);
    const fetchData = async () => {
      var response = await giveCompaniesData();
      if (false === response.authenticated) {
        navigate('/');
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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


  const styles = {
    fontSize: "1.8rem",
    fontWeight: "700",
    borderRadius: "3px",
    border: "4px solid #c5cae9",
    padding: "13px ",
    margin: "0 auto",
    textAlign: "center",
    color: "#0d47a1",
    backgroundColor: "#ede7f6 ",
    input: {
      '::placeholder': {
        color: "blue",
      },
    },
  }



  return (
    <div style={{ backgroundColor: "#64b5f6" }}>
      <Layout userType={userType}>
        <input
          type="text"
          className="form-control "
          placeholder="Search Companies Here"
          aria-describedby="button-addon2"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          style={styles}
        />
        <br />
        <CompanyList userType={userType} companyList={searchedCompanies} />
        {/* </div> */}
        {searchedCompanies.length === 0 && (
          <h1 className="container-sm " style={{ color: "#b71c1c", fontSize: "4rem", fontWeight: "500", textAlign: "center" }}>
            Oops !! Data Unavailable
          </h1>
        )}
      </Layout>
    </div>
  );
}
