import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/farmer/Dashboard";
import ManufacturerDashboard from "./pages/manufacturer/ManufacturerDashboard";
import DistributorDashboard from "./pages/Distributor/DistributorDashboard";
import LandingPage from "./pages/auth/LandingPage";
import CertificationDashboard from "./pages/Certifying Agencies/CertificationDashboard";
import AddProduct from "./pages/farmer/AddProduct";
import TrackProducts from "./pages/farmer/TrackProducts";
import ProductHistory from "./pages/farmer/ProductHistory";
import CertificationRequests from "./pages/Certifying Agencies/CertificationRequests";
import AuditSchedule from "./pages/Certifying Agencies/AuditSchedule";
import Certifications from "./pages/Certifying Agencies/Certifications";
import ComplianceReports from "./pages/Certifying Agencies/ComplianceReports";
import Analytics from "./pages/farmer/Analytics";
import Profile from "./pages/farmer/Profile";
import Inventory from "./pages/Distributor/Inventory";
import Orders from "./pages/Distributor/Orders";
import Deliveries from "./pages/Distributor/Deliveries";
import SupplyChain from "./pages/Distributor/SupplyChain";
import NewProduct from "./pages/manufacturer/NewProduct";
import QualityControl from "./pages/manufacturer/QualityControl";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="track" element={<TrackProducts />} />
          <Route path="history" element={<ProductHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        <Route path="/manufacturer">
          <Route path="dashboard" element={<ManufacturerDashboard />} />
          <Route path="new-product" element={<NewProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="quality-control" element={<QualityControl />} />
          <Route path="track-products" element={<TrackProducts />} />
        </Route>
        <Route path="/distributor">
          <Route path="dashboard" element={<DistributorDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="deliveries" element={<Deliveries />} />
          <Route path="supply-chain" element={<SupplyChain />} />
        </Route>
        <Route path="/certification">
          <Route path="dashboard" element={<CertificationDashboard />} />
          <Route path="requests" element={<CertificationRequests />} />
          <Route path="audits" element={<AuditSchedule />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="compliance" element={<ComplianceReports />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
