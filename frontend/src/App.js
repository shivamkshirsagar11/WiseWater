import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';

// guest user
import Home from "./pages/guestuser/Home";
import Login from "./pages/guestuser/login";
import WorkerApplicationFrom from './pages/guestuser/WorkerApplicationFrom';

// customer
import CustomerRegistration from './pages/customer/CustomerRegistration';
import CustomerProfile from './pages/customer/CustomerProfile';
import Placeorder from './pages/customer/Placeorder';
import ShowPlacedorderList from './pages/customer/ShowPlacedorderList';
import TrackOrder from "./pages/customer/TrackOrder";
import ShowCustomerDetails from "./components/ShowCustomerDetails";
import ShowCustomer from './pages/owner/ShowCustomer'

// worker
import WorkerAssignedOrders from './pages/worker/WorkerAssignedOrders';
import WorkerProfile from './pages/worker/WorkerProfile';
import WorkerDelieveredOrderes from "./pages/worker/WorkerDelieveredOrders";
import WorkerOrderQuery from "./pages/worker/WorkerOrderQuery";

// owner
import ShowInQueryOrderList from "./pages/owner/ShowInQueryOrderList";
import OwnerRegistration from './pages/owner/OwnerRegistration';
import ShowWorkerApplications from './pages/owner/ShowWorkerApplications';
import ShowPendingOrderList from './pages/owner/ShowPendingOrderList';
import OwnerProfile from './pages/owner/OwnerProfile';
import ShowWorkers from "./pages/owner/ShowWorkers";
import ShowAssignedOrders from './pages/owner/ShowAssignedOrders'
import ResolveInQueryOrder from "./pages/owner/ResolveInQueryOrder";

// general pages
import NotFound from './pages/NotFound';
import ShowCompanies from './pages/ShowCompanies';

function App() {
  const [cookies, setCookies, removeCookies] = useCookies(['token']);

  const handleSetCookies = (key, data) => {
    setCookies(`${key}`, data, { path: '/' });
  }
  const handleRemoveCookies = (key) => {
    removeCookies(`${key}`, { path: '/' });
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">

            {/* guestuser */}
            <Route index element={<Home />} />
            <Route path="/login" element={<Login setCookies={handleSetCookies} />} />

            {/* customer */}
            <Route path="/customer" >
              <Route path="/customer/register" element={<CustomerRegistration setCookies={handleSetCookies} />} />
              <Route path="/customer/profile" element={<CustomerProfile cookies={cookies} removeCookies={handleRemoveCookies} />} />
              <Route path="/customer/placeorder/:company_name" element={<Placeorder cookies={cookies} />} />
              <Route path="/customer/show-placed-orders" element={<ShowPlacedorderList cookies={cookies} />} />
              <Route path="/customer/order/track/:order_id" element={<TrackOrder cookies={cookies} />} />
            </Route>

            {/* worker   */}
            <Route path="/worker">
              <Route path="/worker/application/:companyname" element={<WorkerApplicationFrom />} />
              <Route path="/worker/orders/assigned" element={<WorkerAssignedOrders cookies={cookies} />} />
              <Route path="/worker/orders/delievered" element={<WorkerDelieveredOrderes cookies={cookies} />} />
              <Route path="/worker/order/assigned/query/:order_id" element={<WorkerOrderQuery cookies={cookies} />} />
              <Route path="/worker/profile" element={<WorkerProfile cookies={cookies} removeCookies={handleRemoveCookies} />} />
            </Route>

            {/* owner   */}
            <Route path="/owner">
              <Route path="/owner/register" element={<OwnerRegistration setCookies={handleSetCookies} />} />
              <Route path="/owner/show-worker-applications" element={<ShowWorkerApplications cookies={cookies} />} />
              <Route path="/owner/profile" element={<OwnerProfile cookies={cookies} removeCookies={handleRemoveCookies} />} />
              <Route path="/owner/show-pending-orders" element={<ShowPendingOrderList cookies={cookies} />} />
              <Route path="/owner/show-workers/:order_id" element={<ShowWorkers cookies={cookies} />} />
              <Route path="/owner/show-assigned-orders" element={<ShowAssignedOrders cookies={cookies} />} />
              <Route path="/owner/show-in-query-orders" element={<ShowInQueryOrderList cookies={cookies} />} />
              <Route path="/owner/in-query-order/resolve/:order_id" element={<ResolveInQueryOrder cookies={cookies} />} />
              <Route path="/owner/resolve-order-query/customerdetails/:customer_id" element={<ShowCustomer cookies={cookies} />} />
            </Route>

            {/* show companies   */}
            <Route path="/show-companies" element={<ShowCompanies cookies={cookies} />} />

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
