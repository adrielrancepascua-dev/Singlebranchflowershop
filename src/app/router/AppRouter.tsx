import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../../modules/dashboard/layouts/DashboardLayout';
import FlowersAdminHome from '../../modules/flowers/dashboard/pages/FlowersAdminHome';
import FlowerOrdersPage from '../../modules/flowers/dashboard/pages/FlowerOrdersPage';
import FlowerProductsPage from '../../modules/flowers/dashboard/pages/FlowerProductsPage';
import FlowerInventoryPage from '../../modules/flowers/dashboard/pages/FlowerInventoryPage';
import FlowerReportsPage from '../../modules/flowers/dashboard/pages/FlowerReportsPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/flowers" replace />} />
          <Route path="flowers" element={<FlowersAdminHome />} />
          <Route path="flowers/orders" element={<FlowerOrdersPage />} />
          <Route path="flowers/products" element={<FlowerProductsPage />} />
          <Route path="flowers/inventory" element={<FlowerInventoryPage />} />
          <Route path="flowers/reports" element={<FlowerReportsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard/flowers" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
