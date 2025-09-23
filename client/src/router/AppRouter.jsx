import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// layouts
import CustomerLayout from "../layouts/CustomerLayout";
import WaiterLayout from "../layouts/WaiterLayout";
import CashierLayout from "../layouts/CashierLayout";
import KitchenLayout from "../layouts/KitchenLayout";

// pages
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
