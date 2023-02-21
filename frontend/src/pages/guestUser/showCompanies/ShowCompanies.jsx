import React, { useEffect, useState, useRef, useContext } from "react";
import Spinner from "../../Spinner.jsx";
import Fuse from "fuse.js";
import { giveCompaniesData } from "../../../actions/guestUser/giveCompaniesData.js";
import { giveUserType } from "../../../actions/guestUser/giveUserType.js";
import MultiToast from "../../../actions/shared/MultiToast.js";
import Layout from "../../shared/Layout/Layout.jsx";
import CompanyList from "./CompanyList.jsx";
import { CookiesContext } from "../../../context/CookiesProvider.js";

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



  return (
    <div style={{"background-image":"linear-gradient(#b993d6, #8ca6db)"}}>
    <Layout userType={userType}>
      {/* <h3 className="container my-3 display-3">Apply for a job</h3> */}
      {/* <div className="header" style={{ marginTop: '5px' }}> */}
        <input
          type="text"
          className="form-control"
          placeholder="Search Companies here"
          aria-describedby="button-addon2"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          style={{"background-image":"linear-gradient(#b993d6, #8ca6db)"}}
          />
<br/>
<CompanyList userType={userType} companyList={searchedCompanies} />
          {/* </div> */}
      {searchedCompanies.length === 0 && (
        <h4 className="container-sm display-6" style={{ color: "red" }}>
          No Data on This
        </h4>
      )}
    </Layout>
    </div>
  );
}
