import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// guest user
import Home from "./pages/guestUser/Home.jsx";
import WorkerApplicationFrom from "./pages/guestUser/WorkerApplicationFrom.jsx";
import ShowCompanies from "./pages/guestUser/showCompanies/ShowCompanies.jsx";

// customer
import CustomerRegistration from "./pages/customer/CustomerRegistration.jsx";
import Placeorder from "./pages/customer/Placeorder.jsx";
import ShowPlacedorderList from "./pages/customer/ShowPlacedorderList.jsx";
import TrackOrder from "./pages/customer/TrackOrder.jsx";
import ShowCustomer from "./pages/owner/ShowCustomer.jsx";
import ShowPayments from './pages/customer/ShowPayments/ShowPayments.jsx'
import Plans from "./pages/customer/Plans.jsx";

// worker
import WorkerAssignedOrders from "./pages/worker/WorkerAssignedOrders.jsx";
import WorkerDelieveredOrderes from "./pages/worker/WorkerDelieveredOrders.jsx";
import WorkerOrderQuery from "./pages/worker/WorkerOrderQuery.jsx";
import DailyOrders from "./pages/worker/DailyOrders.jsx";

// owner
import ShowInQueryOrderList from "./pages/owner/ShowInQueryOrderList.jsx";
import ShowAssignedPlans from "./pages/owner/ShowAssignedPlans.jsx";
import AssignPlan from "./pages/owner/AssignPlan.jsx";
import OwnerRegistration from "./pages/owner/OwnerRegistration.jsx";
import ShowWorkerApplications from "./pages/owner/ShowWorkerApplications.jsx";
import ShowPendingOrderList from "./pages/owner/ShowPendingOrderList.jsx";
import ShowWorkers from "./pages/owner/ShowWorkers.jsx";
import ShowAssignedOrders from "./pages/owner/ShowAssignedOrders.jsx";
import ResolveInQueryOrder from "./pages/owner/ResolveInQueryOrder.jsx";
import ShowPaymentsOwner from "./pages/owner/ShowPayments/ShowPaymentsOwner.jsx";
import CustomerPlans from "./pages/owner/CustomerPlans.jsx";

import Profile from "./pages/shared/profile/Profile.jsx";



import NotFound from "./pages/NotFound.jsx";
import CookiesProvider from './context/CookiesProvider.js'
import Temp from "./pages/Temp.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import ShowOwners from "./pages/admin/ShowUsers/ShowOwners/ShowOwners.jsx";
import ShowCustomers from "./pages/admin/ShowUsers/ShowCustomers/ShowCustomers.jsx";
import ShowOwnersApplications from "./pages/admin/ShowOwnersApplications.jsx";
import ProtectedRouter from "./ProtectedRouter.jsx";
import SubscriptionForm from "./pages/customer/SubscriptionForm.jsx";
import LoginChecker from "./LoginChecker.jsx";
import { DataProvider } from "./context/DataProvider.js";


function App() {

  return (
    <DataProvider>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">

              {/* admin */}
              <Route path='/admin/login' element={<Temp />} />
              <Route
                path="/admin/show-customers"
                element={<ShowCustomers />}
              />
              <Route
                path="/adminPage"
                element={<AdminPage userType='admin' />}
              />
              <Route
                path="/admin/show-owners"
                element={<ShowOwners />}
              />
              <Route
                path="admin/show-owners-applications"
                element={<ShowOwnersApplications />}
              />


              {/* guestuser */}
              <Route index element={<LoginChecker > <Home /> </LoginChecker>} />
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
                  path="/customer/get-subscription-details"
                  element={
                    <ProtectedRouter userType='customer'>
                      <Plans />
                    </ProtectedRouter>
                  }
                />

                <Route
                  path="/customer/subscription-from/:company_name"
                  element={
                    <ProtectedRouter userType='customer'>
                      <SubscriptionForm />
                    </ProtectedRouter>
                  }
                />
                {
                  /*
                  <Route path="/customer" element={<ProtectedRouter userType='customer'>
                    <CustomerHome/>
                  </ProtectedRouter>} />
                   */
                }

                <Route
                  path="/customer/profile"
                  element={
                    <ProtectedRouter userType='customer'>
                      <Profile
                        userType="customer"
                      />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/customer/placeorder/:company_name"
                  element={
                    <ProtectedRouter userType='customer'>
                      <Placeorder />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/customer/get-payment-details"
                  element={
                    <ProtectedRouter userType='customer'>
                      <ShowPayments />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/customer/show-placed-orders"
                  element={
                    <ProtectedRouter userType='customer'>
                      <ShowPlacedorderList />
                    </ProtectedRouter>
                  }
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
                  element={
                    <ProtectedRouter userType='worker'>
                      <WorkerAssignedOrders />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/worker/orders/daily"
                  element={
                    <ProtectedRouter userType='worker'>
                      <DailyOrders />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/worker/orders/delievered"
                  element={
                    <ProtectedRouter userType='worker'>
                      <WorkerDelieveredOrderes />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/worker/order/assigned/query/:order_id"
                  element={<WorkerOrderQuery />}
                />
                <Route
                  path="/worker/profile"
                  element={
                    <ProtectedRouter userType='worker'>
                      <Profile
                        userType="worker"
                      />
                    </ProtectedRouter>
                  }
                />
              </Route>

              {/* owner   */}
              <Route path="/owner">
                <Route
                  path="/owner/register"
                  element={
                    <OwnerRegistration />
                  }
                />
                <Route
                  path="/owner/assigned/plans"
                  element={
                    <ProtectedRouter userType='owner'>
                      <ShowAssignedPlans />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/owner/customer-plans"
                  element={
                    <ProtectedRouter userType='owner'>
                      <CustomerPlans />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/owner/show-worker-applications"
                  element={
                    <ShowWorkerApplications />
                  }
                />
                <Route
                  path="/owner/profile"
                  element={
                    <ProtectedRouter userType='owner'>
                      <Profile userType="owner" />
                    </ProtectedRouter>
                  }
                />
                <Route
                  path="/owner/get-payment-details"
                  element={<ProtectedRouter userType='owner'><ShowPaymentsOwner /></ProtectedRouter>}
                />
                <Route
                  path="/owner/show-pending-orders"
                  element={<ProtectedRouter userType='owner'><ShowPendingOrderList /></ProtectedRouter>}
                />
                <Route
                  path="/owner/show-workers/:orderId"
                  element={<ProtectedRouter userType='owner'><ShowWorkers /></ProtectedRouter>}
                />
                <Route
                  path="/owner/assign-plan/:orderId"
                  element={<ProtectedRouter userType='owner'><AssignPlan /></ProtectedRouter>}
                />
                <Route
                  path="/owner/show-assigned-orders"
                  element={<ProtectedRouter userType='owner'><ShowAssignedOrders /></ProtectedRouter>}
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
                  element={<ProtectedRouter userType='owner'> <ShowCustomer /></ProtectedRouter>}
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
    </DataProvider>
  );
}

export default App;
