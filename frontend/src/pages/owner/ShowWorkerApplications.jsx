import React, { useEffect, useState, useRef, useContext } from 'react';
import Spinner from '../Spinner.jsx';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import { giveWorkerApplications } from '../../actions/owner/giveWorkerApplications.js';
import { hireWorker } from '../../actions/owner/hireWorker.js';
import UserDetails from '../shared/details/UserDetails.jsx';
import MultiToast from '../../actions/shared/MultiToast.js';
import Layout from '../shared/Layout/Layout.jsx';
import { CookiesContext } from '../../context/CookiesProvider.js';
import { deleteWorkerApplication } from '../../actions/owner/deleteWorkerApplication.js';

//  not 100% sure how this code works
// REASON :- useEffect with useRef

// REMAING :- for now i am fatching all the worker details but 

// some how we need to pass company id to backend in fetch function with post method
// then backend will find all the users who applied for this company and then only those worker will be shown to owner but for now authentication is remaing so i didn't did that
// AND ACCRODINGY WE ALSO NEED TO CHANGE BACKEND AS WELL

function ShowWorkerApplications() {

    const navigate = useNavigate();

    const { cookies } = useContext(CookiesContext);
    const [searchedWorkerApplications, setSearchedWorkerApplications] = useState([]);
    const [query, setQuery] = useState('');
    const workerApplications = useRef([]);
    const fuse = useRef(null);
    const [loading, setLoading] = useState(false);
    const { token } = cookies;

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            const { token } = cookies;
            const response = await giveWorkerApplications(token);
            setLoading(false);
            if (false === response.authenticated) {
                MultiToast(response.message, true);
                navigate('/');
            }
            if ('error' === response.type) {
                MultiToast(response.error, true);
            } else {
                console.log(response)
                workerApplications.current = [...response.workerApplications];
                fuse.current = new Fuse(workerApplications.current, {
                    keys: [
                        'firstname',
                        'lastname',
                    ],
                    includeScore: true
                });
                setSearchedWorkerApplications(workerApplications.current);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (fuse.current) {
            if ('' !== query) {
                console.log(query)
                const results = fuse.current.search(query);
                const temp = [];
                results.forEach(result => {
                    temp.push(result.item);
                });
                console.log(temp);
                setSearchedWorkerApplications(temp);
            } else {
                setSearchedWorkerApplications(workerApplications.current)
            }
        }
    }, [fuse, query]);


    const handleHiring = async (e) => {
        e.preventDefault();

        const workerApplication = { ...searchedWorkerApplications[e.target.value] };
        console.log(workerApplication);
        const response = await hireWorker(token, workerApplication);
        if ('error' === response.type) {
            MultiToast(response.error, true);
        } else {
            const response = await giveWorkerApplications(token);
            workerApplications.current = [response.workerApplications];
            setSearchedWorkerApplications(response.workerApplications);
            setQuery('');
        }
    }
    const deleteWorkerApplications = async (e) => {
        e.preventDefault();

        const workerApplication = { ...searchedWorkerApplications[e.target.value] };
        console.log(workerApplication);
        const response = await deleteWorkerApplication(token, workerApplication);
        if ('error' === response.type) {
            MultiToast(response.error, true);
        } else {
            const response = await giveWorkerApplications(token);
            workerApplications.current = [response.workerApplications];
            setSearchedWorkerApplications(response.workerApplications);
            setQuery('');
        }
    }
    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
    }
    const styles_company = {
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
        <div >
            <Layout userType={'owner'}>
                {loading ? <Spinner /> :
                    <>
                        <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} className="form-control"
                            placeholder="Search Companies here"
                            aria-describedby="button-addon2"
                            style={styles_company}
                        />
                        {
                            searchedWorkerApplications.length !== 0 ?
                                <>
                                    {
                                        searchedWorkerApplications.map((workerApplication, index) => {
                                            return (
                                                <div key={index}>
                                                    <h3 style={{ textAlign: "center", fontWeight: "600", fontFamily: "monospace" }}>Application {index + 1}</h3>
                                                    <UserDetails userData={workerApplication} />
                                                    <div style={{ textAlign: "center" }}>
                                                        <button className="btn btn-warning" onClick={handleHiring} style={{ fontSize: "1.2em", fontWeight: "700", color: "darkblue", textAlign: "center" }} value={index}>Hire Worker</button>
                                                    </div>
                                                    <div style={{ textAlign: "center" }}>
                                                        <button className="btn btn-warning" onClick={deleteWorkerApplication} style={{ fontSize: "1.2em", fontWeight: "700", color: "darkblue", textAlign: "center" }} value={index}>reject worker application</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                                :
                                <div style={styles}>
                                    <h1 style={{ color: "#b33800", fontWeight: "500", fontSize: "4rem", textAlign: "center" }}>No Application Found</h1>
                                </div>
                        }
                    </>
                }
            </Layout>
        </div>
    );
}

export default ShowWorkerApplications