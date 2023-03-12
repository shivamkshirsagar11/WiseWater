import React, { useContext, useEffect, useState } from 'react'
import { authenticateUser } from '../../../actions/shared/authenticateUser';
import MultiToast from '../../../actions/shared/MultiToast';
import Spinner from '../../Spinner.jsx';
import { getPaymentDetails } from '../../../actions/owner/getPaymentDetails';
import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/Layout/Layout';
import { CookiesContext } from '../../../context/CookiesProvider';
import Payment from './Payment';

function ShowPaymentsOwner() {

    const { cookies } = useContext(CookiesContext);
    const [loading, setLoading] = useState(false);
    const [paymentList, setPaymentList] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const { token } = cookies;

        const authenticate = async () => {
            setLoading(true);
            const rsp = authenticateUser('owner', token);
            if (false === rsp.authenticated) {
                navigate('/');
            }
            const response = await getPaymentDetails(token);
            setLoading(false);
            if (false === response.authenticated) {
                MultiToast(response.message, true);
                navigate('/');
            }
            if ('error' === response.type) {
                MultiToast(response.error, true);
                // navigate('/');
            } else {
                setPaymentList(response.paymentList);
                console.log(response.paymentList);
            }
        }
        authenticate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies]);

    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
    }
    return (
        <div >
            <Layout userType={'owner'}>
                {loading ? <Spinner /> :
                    <>
                        {
                            paymentList.length !== 0 ?
                                paymentList.map((payment, index) => {
                                    console.log(payment.customer_data.firstname)
                                    return (
                                        <div key={index}>
                                            <h3>Customer Name :- {payment.customer_data.firstname} {payment.customer_data.lastname}</h3>
                                            <Payment payment={payment} setPaymentList={setPaymentList} setLoading={setLoading} />
                                        </div>
                                    )
                                })
                                :
                                <div style={styles}>
                                    <h1 style={{ color: "#b33800", fontWeight: "500", fontSize: "4rem", textAlign: "center" }}>Oops!! No Details Found</h1>
                                </div>
                        }
                    </>
                }
            </Layout>
        </div>
    )
}

export default ShowPaymentsOwner