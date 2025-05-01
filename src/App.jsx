import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/farmer/Dashboard";
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
import CertifierProfile from "./pages/Certifying Agencies/Profile";
import DistributorDashboard from "./pages/Distributor/DistributorDashboard";
import ItemList from "./pages/Distributor/ItemList";
import SupplyChainTracking from "./pages/Distributor/SupplyChainTracking";
import ProductTracking from "./pages/Distributor/ProductShipment";

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
        </Route>
        <Route path="/distributor">
          <Route path="dashboard" element={<DistributorDashboard />} />
          <Route path="orders" element={<ItemList />} />
          <Route path="supply-chain" element={<SupplyChainTracking />} />
          <Route
            path="shipment-details/:productId"
            element={<ProductTracking />}
          />
        </Route>
        <Route path="/certification">
          <Route path="dashboard" element={<CertificationDashboard />} />
          <Route path="requests" element={<CertificationRequests />} />
          <Route path="audits" element={<AuditSchedule />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="compliance" element={<ComplianceReports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<CertifierProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
