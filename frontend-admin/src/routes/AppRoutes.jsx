import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ActivityPage from "../pages/activity/ActivityPage";

import InventoryPage from "../pages/inventory/InventoryPage";
import OrdersPage from "../pages/orders/OrdersPage";
import ShippingPage from "../pages/shipping/ShippingPage";
import ProductsPage from "../pages/products/ProductsPage";

import ClientsPage from "../pages/clients/ClientsPage";

import SalesPage from "../pages/sales/SalesPage";
import DailyCashPage from "../pages/daily-cash/DailyCashPage";

import MetricsPage from "../pages/metrics/MetricsPage";
import TopSalesPage from "../pages/top-sales/TopSalesPage";

import UsersPage from "../pages/users/UsersPage";
import SettingsPage from "../pages/settings/SettingsPage";

import RefundsPage from "../pages/refunds/RefundsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/activity" element={<ActivityPage />} />

          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/refunds" element={<RefundsPage />} />

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