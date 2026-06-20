import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import LoginPage from "../pages/login/LoginPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ActivityPage from "../pages/activity/ActivityPage";

import InventoryPage from "../pages/inventory/InventoryPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import ProductsPage from "../pages/products/ProductsPage";

import OrdersPage from "../pages/orders/OrdersPage";
import ShippingPage from "../pages/shipping/ShippingPage";
import RefundsPage from "../pages/refunds/RefundsPage";

import CarriersPage from "../pages/carriers/CarriersPage";
import TrackingPage from "../pages/tracking/TrackingPage";

import ClientsPage from "../pages/clients/ClientsPage";

import SalesPage from "../pages/sales/SalesPage";
import DailyCashPage from "../pages/daily-cash/DailyCashPage";
import MetricsPage from "../pages/metrics/MetricsPage";
import TopSalesPage from "../pages/top-sales/TopSalesPage";

import AutomationFlowPage from "../pages/automation-flow/AutomationFlowPage";

import UsersPage from "../pages/users/UsersPage";
import SettingsPage from "../pages/settings/SettingsPage";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("smartlogix_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/activity" element={<ActivityPage />} />

          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductsPage />} />

          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/shipping" element={<ShippingPage />} />

          <Route path="/tracking" element={<TrackingPage />} />

          <Route path="/refunds" element={<RefundsPage />} />

          <Route path="/carriers" element={<CarriersPage />} />
          <Route path="/automation-flow" element={<AutomationFlowPage />} />

          <Route path="/clients" element={<ClientsPage />} />

          <Route path="/sales" element={<SalesPage />} />
          <Route path="/daily-cash" element={<DailyCashPage />} />
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/top-sales" element={<TopSalesPage />} />

          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;