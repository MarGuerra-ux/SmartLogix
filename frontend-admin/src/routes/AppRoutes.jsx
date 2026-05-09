import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import InventoryPage from "../pages/inventory/InventoryPage";
import OrdersPage from "../pages/orders/OrdersPage";
import ShippingPage from "../pages/shipping/ShippingPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;