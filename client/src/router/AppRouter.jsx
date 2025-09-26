import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// layouts
import CustomerLayout from "../layouts/CustomerLayout";
import WaiterLayout from "../layouts/WaiterLayout";
import CashierLayout from "../layouts/CashierLayout";
import KitchenLayout from "../layouts/KitchenLayout";
import AdminLayout from "../layouts/AdminLayout";

// pages
// Customer
import MenuPage from "../pages/customer/MenuPage";
import OrdersPage from "../pages/customer/OrdersPage";
import StartPage from "../pages/customer/StartPage";
import PaymentPage from "../pages/customer/PaymentPage";
import ProfilePage from "../pages/customer/ProfilePage";
import WaiterDashboard from "../pages/waiter/WaiterDashboard";
import TablesPage from "../pages/waiter/TablesPage";
import SessionOrders from "../pages/waiter/SessionOrders";
import CashierDashboard from "../pages/cashier/CashierDashboard";
import PaymentsPage from "../pages/cashier/PaymentsPage";
import ReportsPage from "../pages/cashier/ReportsPage";
import OrdersQueue from "../pages/kitchen/OrdersQueue";
import CompletedSession from "../pages/customer/CompletedSession";
//Admin
import Dashboard from "../pages/admin/Dashboard";
import AdminOrders from "../pages/admin/OrdersPage";
import AdminCustomers from "../pages/admin/CustomersPage";
import AdminMenu from "../pages/admin/MenuPage";
import AdminTables from "../pages/admin/TablesPage";
import AdminStaff from "../pages/admin/StaffPage";
import AdminPayments from "../pages/admin/PaymentsPage";
import AdminSettings from "../pages/admin/SettingsPage";
import AdminSessions from "../pages/admin/SessionsPage";

import AdminLogin from "../pages/admin/Login";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="start/:tableId" element={<StartPage />} />
        {/* Customer (QR menu) */}
        <Route path="/session/:sessionId" element={<CustomerLayout />}>
          <Route index element={<MenuPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="/:id/closed" element={<CompletedSession />} />

        {/* Admin Routes */}
        <Route path="login" element={<AdminLogin />}></Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="tables" element={<AdminTables />} />
          <Route path="staff" element={<AdminStaff />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="sessions" element={<AdminSessions />} />
        </Route>
        {/* Waiter */}
        <Route path="/waiter" element={<WaiterLayout />}>
          <Route index element={<WaiterDashboard />} />
          <Route path="tables" element={<TablesPage />} />
          <Route path="sessions/:id" element={<SessionOrders />} />
        </Route>

        {/* Cashier */}
        <Route path="/cashier" element={<CashierLayout />}>
          <Route index element={<CashierDashboard />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Kitchen */}
        <Route path="/kitchen" element={<KitchenLayout />}>
          <Route index element={<OrdersQueue />} />
        </Route>
      </Routes>
    </Router>
  );
}
