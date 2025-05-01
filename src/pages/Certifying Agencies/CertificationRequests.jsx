import { useState, useEffect } from "react";
import axios from "axios";
import {
  Building2,
  Calendar,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Package,
  DollarSign,
} from "lucide-react";

export default function CertificationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    approved: <CheckCircle2 className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/certificate/pending"
        );
        if (response.data.success) {
          setRequests(response.data.pendingCertificates);
        }
      } catch (error) {
        setError("Failed to fetch certification requests. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 bg-red-50 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px- аспекел4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Certification Requests
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {requests.length > 0 ? (
          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.entityId.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {request.entityId.email}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          statusStyles[request.status]
                        }`}
                      >
                        {statusIcons[request.status]}
                        <span className="ml-2">
                          {request.status.toUpperCase()}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Product for Certification
                    </h4>
                    <div
                      key={request.productId._id}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center text-gray-600">
                          <Package className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">
                            {request.productId.name}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{request.productId.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <ClipboardCheck className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            Quantity: {request.productId.quantity} kg
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            Price: ₹{request.productId.price}/kg
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center text-gray-600">
                          <span className="text-sm">
                            Required Certifications:{" "}
                            {request.productId.certifications.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        Issue Date:{" "}
                        {new Date(request.issueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            No pending certification requests found.
          </div>
        )}
      </main>
    </div>
  );
}