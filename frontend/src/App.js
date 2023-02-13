import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";

// guest user
import Home from "./pages/guestUser/Home.jsx";
import Login from "./pages/guestUser/login.jsx";
import WorkerApplicationFrom from "./pages/guestUser/WorkerApplicationFrom.jsx";
import ShowCompanies from "./pages/guestUser/ShowCompanies.jsx";
// customer
import CustomerRegistration from "./pages/customer/CustomerRegistration.jsx";
import Placeorder from "./pages/customer/Placeorder.jsx";
import ShowPlacedorderList from "./pages/customer/ShowPlacedorderList.jsx";
import TrackOrder from "./pages/customer/TrackOrder.jsx";
import ShowCustomer from "./pages/owner/ShowCustomer.jsx";

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

import Profile from "./pages/shared/profile/Profile.jsx";

// general pages
import NotFound from "./pages/NotFound.jsx";

function App() {
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);

  const handleSetCookies = (key, data) => {
    setCookies(`${key}`, data, { path: "/" });
  };
  const handleRemoveCookies = (key) => {
    removeCookies(`${key}`, { path: "/" });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* guestuser */}
            <Route index element={<Home />} />
            <Route
              path="/login"
              element={<Login setCookies={handleSetCookies} />}
            />
            <Route
              path="/verification/contact/otp"
              element={<Login setCookies={handleSetCookies} />}
            />
            <Route
              path="/worker/application/:companyname"
              element={<WorkerApplicationFrom />}
            />
            <Route
              path="/show-companies"
              element={<ShowCompanies cookies={cookies} />}
            />

            {/* customer */}
            <Route path="/customer">
              <Route
                path="/customer/register"
                element={<CustomerRegistration setCookies={handleSetCookies}/>}
              />
              <Route
                path="/customer/profile"
                element={
                  <Profile
                    userType="customer"
                    cookies={cookies}
                    removeCookies={handleRemoveCookies}
                  />
                }
              />
              <Route
                path="/customer/placeorder/:company_name"
                element={<Placeorder cookies={cookies} />}
              />
              <Route
                path="/customer/show-placed-orders"
                element={<ShowPlacedorderList cookies={cookies} />}
              />
              <Route
                path="/customer/order/track/:order_id"
                element={<TrackOrder cookies={cookies} />}
              />
            </Route>

            {/* worker   */}
            <Route path="/worker">
              <Route
                path="/worker/orders/assigned"
                element={<WorkerAssignedOrders cookies={cookies} />}
              />
              <Route
                path="/worker/orders/delievered"
                element={<WorkerDelieveredOrderes cookies={cookies} />}
              />
              <Route
                path="/worker/order/assigned/query/:order_id"
                element={<WorkerOrderQuery cookies={cookies} />}
              />
              <Route
                path="/worker/profile"
                element={
                  <Profile
                    userType="worker"
                    cookies={cookies}
                    removeCookies={handleRemoveCookies}
                  />
                }
              />
            </Route>

            {/* owner   */}
            <Route path="/owner">
              <Route
                path="/owner/register"
                element={<OwnerRegistration setCookies={handleSetCookies} />}
              />
              <Route
                path="/owner/show-worker-applications"
                element={<ShowWorkerApplications cookies={cookies} />}
              />
              <Route
                path="/owner/profile"
                element={
                  <Profile
                    userType="owner"
                    cookies={cookies}
                    removeCookies={handleRemoveCookies}
                  />
                }
              />
              <Route
                path="/owner/show-pending-orders"
                element={<ShowPendingOrderList cookies={cookies} />}
              />
              <Route
                path="/owner/show-workers/:order_id"
                element={<ShowWorkers cookies={cookies} />}
              />
              <Route
                path="/owner/show-assigned-orders"
                element={<ShowAssignedOrders cookies={cookies} />}
              />
              <Route
                path="/owner/show-in-query-orders"
                element={<ShowInQueryOrderList cookies={cookies} />}
              />
              <Route
                path="/owner/in-query-order/resolve/:order_id"
                element={<ResolveInQueryOrder cookies={cookies} />}
              />

              <Route
                path="/owner/resolve-order-query/customerdetails/:customer_id"
                element={<ShowCustomer cookies={cookies} />}
              />
            </Route>

            {/* show companies   */}

            {/* page not found   */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
