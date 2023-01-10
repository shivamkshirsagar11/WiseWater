import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

//  not 100% sure how this code works
// REASON :- useEffect with useRef

// now it seems like i am able to understand how useRef is works
// and changed comapnies object from useState hook to useRef hook
// REASON :- optimization

export default function ShowCompanies({ cookies }) {

    const navigate = useNavigate();
    const companies = useRef(null);
    const [userType, setUserType] = useState(null);
    const [searchedCompanies, setSearchedCompanies] = useState(null);
    const fuse = useRef(null);

    useEffect(() => {
        const { token } = cookies;
        const fun = async () => {
            const response = await fetch(`http://localhost:3001/api/user/show-companies`);
            const userTypeResponse = await fetch(`http://localhost:3001/api/user/give-user-type`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token }),
            });
            const data = await response.json();
            const typeOfUser = await userTypeResponse.json();
            setUserType(typeOfUser.userType);
            fuse.current = new Fuse(data.companies, {
                keys: [
                    'name',
                    'address',
                ],
                includeScore: true
            });
            companies.current = data.companies;
            setSearchedCompanies(data.companies);
        }
        fun();
    }, [cookies]);

    const [query, setQuery] = useState('');

    useEffect(() => {
        if (fuse.current) {
            if ('' !== query) {
                const results = fuse.current.search(query);
                const companies = [];
                results.forEach(result => {
                    companies.push(result.item);
                });
                setSearchedCompanies(companies);
            } else
                setSearchedCompanies(companies.current);
        } else {
            
        }
    }, [query]);

    if (null === searchedCompanies)
        return (<Spinner />);

    const handleApply = (e) => {
        e.preventDefault();
        navigate(`/worker/application/${e.target.value}`);
    }

    const handlePlaceorder = (e) => {
        e.preventDefault();
        navigate(`/customer/placeorder/${e.target.value}`);
    }

    return (
        <div>
            <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} />
            {
                searchedCompanies.length !== 0 &&
                searchedCompanies.map((company, index) => {
                    // change is reuqired from UI
                    return (
                        <p key={index} >
                            {company.name}
                            {'guest' === userType && <button value={company.name} onClick={handleApply}>apply</button>}
                            {'customer' === userType && <button value={company.name} onClick={handlePlaceorder}>place order</button>}
                        </p>
                    )
                })
            }
            {searchedCompanies.length === 0 && <p>no companies found</p>}
        </div>
    )
}
