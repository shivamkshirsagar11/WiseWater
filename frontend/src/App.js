import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";

// guest user
// import Map from "./pages/shared/map/MapRender.jsx";
import Home from "./pages/guestUser/Home.jsx";
import Login from "./pages/guestUser/login.jsx";
import WorkerApplicationFrom from "./pages/guestUser/WorkerApplicationFrom.jsx";
import ShowCompanies from "./pages/guestUser/showCompanies/ShowCompanies.jsx";

// customer
import CustomerRegistration from "./pages/customer/CustomerRegistration.jsx";
import Placeorder from "./pages/customer/Placeorder.jsx";
import ShowPlacedorderList from "./pages/customer/ShowPlacedorderList.jsx";
import TrackOrder from "./pages/customer/TrackOrder.jsx";
import ShowCustomer from "./pages/owner/ShowCustomer.jsx";
import ShowPayments from './pages/customer/ShowPayments/ShowPayments.jsx'

// worker
import WorkerAssignedOrders from "./pages/worker/WorkerAssignedOrders.jsx";
import WorkerDelieveredOrderes from "./pages/worker/WorkerDelieveredOrders.jsx";
import WorkerOrderQuery from "./pages/worker/WorkerOrderQuery.jsx";

// owner
import ShowInQueryOrderList from "./pages/owner/ShowInQueryOrderList.jsx";
import OwnerRegistration from "./pages/owner/OwnerRegistration.jsx";
import ShowWorkerApplications from "./pages/owner/ShowWorkerApplications.jsx";
import ShowPendingOrderList from "./pages/owner/ShowPendingOrderList.jsx";
import ShowWorkers from "./pages/owner/ShowWorkers.jsx";
import ShowAssignedOrders from "./pages/owner/ShowAssignedOrders.jsx";
import ResolveInQueryOrder from "./pages/owner/ResolveInQueryOrder.jsx";
import ShowPaymentsOwner from "./pages/owner/ShowPayments/ShowPaymentsOwner.jsx";

import Profile from "./pages/shared/profile/Profile.jsx";

// general pages
import NotFound from "./pages/NotFound.jsx";

import CookiesProvider, { CookiesContext } from './context/CookiesProvider.js'

function App() {
  // console.log(useContext(CookiesContext))
  // const { cookies, handleRemoveCookies, handleSetCookies } = useContext(CookiesContext);

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* guestuser */}
            <Route index element={<Home />} />
            {/* <Route
                path="/open/order"
                element={<Map cookies={cookies} />}
              /> */}
            {/* <Route
              path="/login"
              element={<Login setCookies={handleSetCookies} />}
            /> */}
            {/* <Route
              path="/verification/contact/otp"
              element={<Login setCookies={handleSetCookies} />}
            /> */}
            <Route
              path="/worker/application/:companyname"
              element={<WorkerApplicationFrom />}
            />
            <Route
              path="/show-companies"
              element={<ShowCompanies />}
            />

            {/* customer */}
            <Route path="/customer">
              <Route
                path="/customer/register"
                element={<CustomerRegistration />}
              />
              <Route
                path="/customer/profile"
                element={
                  <Profile
                    userType="customer"
                  />
                }
              />
              <Route
                path="/customer/placeorder/:company_name"
                element={<Placeorder />}
              />
              <Route
                path="/customer/get-payment-details"
                element={<ShowPayments />}
              />
              <Route
                path="/customer/show-placed-orders"
                element={<ShowPlacedorderList />}
              />
              <Route
                path="/customer/order/track/:orderId"
                element={<TrackOrder />}
              />
            </Route>

            {/* worker   */}
            <Route path="/worker">
              <Route
                path="/worker/orders/assigned"
                element={<WorkerAssignedOrders />}
              />
              <Route
                path="/worker/orders/delievered"
                element={<WorkerDelieveredOrderes />}
              />
              <Route
                path="/worker/order/assigned/query/:order_id"
                element={<WorkerOrderQuery />}
              />
              <Route
                path="/worker/profile"
                element={
                  <Profile
                    userType="worker"
                  />
                }
              />
            </Route>

            {/* owner   */}
            <Route path="/owner">
              <Route
                path="/owner/register"
                element={<OwnerRegistration />}
              />
              <Route
                path="/owner/show-worker-applications"
                element={<ShowWorkerApplications />}
              />
              <Route
                path="/owner/profile"
                element={
                  <Profile
                    userType="owner"
                  />
                }
              />
              <Route
                path="/owner/get-payment-details"
                element={<ShowPaymentsOwner />}
              />
              <Route
                path="/owner/show-pending-orders"
                element={<ShowPendingOrderList />}
              />
              <Route
                path="/owner/show-workers/:orderId"
                element={<ShowWorkers />}
              />
              <Route
                path="/owner/show-assigned-orders"
                element={<ShowAssignedOrders />}
              />
              <Route
                path="/owner/show-in-query-orders"
                element={<ShowInQueryOrderList />}
              />
              <Route
                path="/owner/in-query-order/resolve/:order_id"
                element={<ResolveInQueryOrder />}
              />

              <Route
                path="/owner/resolve-order-query/customerdetails/:customer_id"
                element={<ShowCustomer />}
              />
            </Route>

            {/* show companies   */}

            {/* page not found   */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </CookiesProvider>
  );
}

export default App;
