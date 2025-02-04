import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/farmer/Dashboard';
import ManufacturerDashboard from './pages/manufacturer/ManufacturerDashboard';
import  DistributorDashboard  from './pages/Distributor/DistributorDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer/dashboard" element={<Dashboard />} />
        <Route path="/manufaturer/dashboard" element={<ManufacturerDashboard />} />
        <Route path="/distributor/dashboard" element={<DistributorDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}