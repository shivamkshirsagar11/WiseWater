import { useState, useEffect, useContext } from "react";
import ShowOrder from "../shared/order/Order.jsx";
import Spinner from '../Spinner.jsx';
import { useNavigate } from "react-router-dom";
import { givePendingOrders } from "../../actions/owner/givePendingOrders.js";
import MultiToast from "../../actions/shared/MultiToast.js";
import Layout from "../shared/Layout/Layout.jsx";
import { CookiesContext } from "../../context/CookiesProvider.js";

export default function ShowPendingOrderList() {
  const navigate = useNavigate();

  const { cookies } = useContext(CookiesContext);
  const [pendingOrderList, setPendingOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("here");
  useEffect(() => {
    const { token } = cookies;

    const fetchData = async () => {
      setLoading(true);
      const response = await givePendingOrders(token);
      setLoading(false);
      if (false === response.authenticated) {
        navigate('/');
      }
      if ('error' === response.type) {
        MultiToast(response.error, true);
      }
      setPendingOrderList(response.pendingOrderList);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);



  const redirectHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    navigate(`${e.target.value}`);
  };
  // why we delete order.status
  // REASON :- in showOrder componenet there is condataion on this order.status
  // when owner wants to show panding orders then there is no meansing to show order status

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  }
  return (
    <div style={{ "background-image": "linear-gradient(#b993d6, #8ca6db)" }}>
      <Layout userType={'owner'}>
        {loading ? <Spinner /> :
          <>
            {pendingOrderList.length === 0 && <div style={styles}>
              <h1 style={{ color: "#b33800", fontWeight: "500", fontSize: "4rem", textAlign: "center" }}>No Orders are Assigned</h1>
            </div>}
            {pendingOrderList.map((order, index) => {
              delete order.status
              console.log(order)
              return (

                <div key={index}>
                  <ShowOrder order={order} />
                  <button className="btn btn-warning ml-4" style={{ fontSize: "1.2em", fontWeight: "600" }}
                    onClick={redirectHandler}
                    value={`/owner/show-workers/${order.orderId}`}
                  >Assign</button>
                </div>
              );
            })}
          </>
        }
      </Layout>
    </div >
  );
}
