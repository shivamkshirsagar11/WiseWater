import React, { useContext, useEffect, useState } from 'react'
import { authenticateUser } from '../../../actions/shared/authenticateUser';
import MultiToast from '../../../actions/shared/MultiToast';
import Spinner from '../../Spinner.jsx';
import { getPaymentDetails } from '../../../actions/customer/getPaymentDetails';
import { useNavigate } from 'react-router-dom';
import { CookiesContext } from '../../../context/CookiesProvider';
import Layout from '../../shared/Layout/Layout.jsx';
import Payment from './Payment';

function ShowPayments() {

    const { cookies } = useContext(CookiesContext);
    const [loading, setLoading] = useState(false);
    const [paymentList, setPaymentList] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const { token } = cookies;
        const authenticate = async () => {
            setLoading(true);
            const rsp = await authenticateUser('customer', token);
            if (false === rsp.authenticated) {
                MultiToast(rsp.message, true);
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
        <>
            <Layout userType='customer'>

                { loading ? <Spinner />:
                <>
                    {paymentList.length === 0 && <div style={styles}>
                    <h1 style={{ color: "#b33800", fontWeight: "500", fontSize: "4rem", textAlign: "center" }}>Oops !! No Payment Details</h1>
                    </div>}
                    {paymentList.map((payment, index) => (
                        <div key={index}>
                            <h3>Company Name :- {payment.company_name}</h3>
                            <Payment payment={payment} />
                        </div>
                    ))
                    }
                </>
                }
            </Layout>
        </>
    )
}

export default ShowPayments