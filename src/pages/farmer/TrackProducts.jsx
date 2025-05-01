import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Tractor,
  User,
  Bell,
  Settings,
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  CheckCircle2,
  Clock,
  Truck,
  Send,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

export default function TrackProducts() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    productId: "",
    status: "harvested",
    location: "",
    nextDestination: "",
    temperature: "",
    humidity: "",
    notes: "",
    distributorId: "",
  });

  useEffect(() => {
    fetchTrackingData();
    fetchDistributors();
  }, [filterStatus]);

  const fetchDistributors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/distributor",
        { withCredentials: true }
      );

      if (response.data.success) {
        setDistributors(response.data.data || []);
      } else {
        setError("Failed to fetch distributors");
      }
    } catch (error) {
      setError("Error fetching distributors");
      console.error("Error fetching distributors:", error);
    }
  };

  const handleDistributorChange = async (distributorId) => {
    try {
      setFormData((prev) => ({ ...prev, distributorId: distributorId || "" }));

      if (!distributorId) {
        setSelectedDistributor(null);
        setFormData((prev) => ({ ...prev, nextDestination: "" }));
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/auth/distributor`,
        { withCredentials: true }
      );

      if (response.data.success) {
        const distributor = response.data.data.find(
          (d) => d._id === distributorId
        );
        if (distributor) {
          setSelectedDistributor(distributor);
          setFormData((prev) => ({
            ...prev,
            nextDestination: distributor.company?.address || ""
          }));
        }
      }
    } catch (error) {
      setError("Error fetching distributor details");
      console.error("Error fetching distributor details:", error);
    }
  };

  const fetchTrackingData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/tracking", {
        withCredentials: true,
      });

      if (response.data.success) {
        setProducts(response.data.data || []);
        setAvailableProducts([]);
      } else {
        setError("Failed to fetch tracking data");
      }
    } catch (error) {
      setError("Error fetching product tracking data");
      console.error("Error fetching tracking data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTrackingData();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleOpenModal = (type, product = null) => {
    setModalType(type);
    setSelectedProduct(product);

    if (type === "add") {
      setFormData({
        productId: "",
        status: "harvested",
        location: "",
        nextDestination: "",
        temperature: "",
        humidity: "",
        notes: "",
        distributorId: "",
      });
    } else if (type === "transfer" && product) {
      setFormData({
        productId: product.productId?._id || "",
        status: product.currentStatus || "",
        location: product.currentLocation || "",
        nextDestination: "",
        temperature: "",
        humidity: "",
        notes: "",
        distributorId: product.distributorId || "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add") {
        const response = await axios.post(
          "http://localhost:5000/api/tracking",
          formData,
          { withCredentials: true }
        );
        if (response.data.success) {
          setProducts((prev) => [response.data.product, ...prev]);
          setAvailableProducts((prev) =>
            prev.filter((p) => p._id !== formData.productId)
          );
          handleCloseModal();
        }
      } else if (modalType === "transfer" && selectedProduct) {
        const response = await axios.put(
          `http://localhost:5000/api/tracking/${selectedProduct._id}`,
          formData,
          { withCredentials: true }
        );
        if (response.data.success) {
          setProducts((prev) =>
            prev.map((p) =>
              p._id === selectedProduct._id ? response.data.product : p
            )
          );
          setError(null);
          alert("Product transfer successful!");
          handleCloseModal();
        } else {
          setError(response.data.message || "Failed to transfer product");
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          `Error ${modalType === "add" ? "adding" : "updating"} tracking data`
      );
      console.error(`Error ${modalType} tracking:`, error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "N/A";
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInMinutes / (60 * 24));
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  const statusColors = {
    harvested: "bg-green-100 text-green-700",
    certified: "bg-blue-100 text-blue-700",
    in_transit: "bg-orange-100 text-orange-700",
    processing: "bg-yellow-100 text-yellow-700",
    delivered: "bg-purple-100 text-purple-700",
  };

  const statusIcons = {
    harvested: <Tractor className="w-4 h-4" />,
    certified: <CheckCircle2 className="w-4 h-4" />,
    in_transit: <Truck className="w-4 h-4" />,
    processing: <Loader2 className="w-4 h-4" />,
    delivered: <MapPin className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100/50 to-emerald-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                <Tractor className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Track Products
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="mb-6 flex justify-between items-center">
          <Link
            to="/farmer/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="all">All Statuses</option>
                <option value="harvested">Harvested</option>
                <option value="certified">Certified</option>
                <option value="in_transit">In Transit</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
              <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
              <span className="ml-2 text-gray-600">Loading products...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8 bg-white/80 backdrop-blur-md rounded-xl shadow-lg text-red-500">
              <AlertCircle className="w-6 h-6 mr-2" />
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
              <Truck className="w-12 h-12 mb-2 text-gray-400" />
              <p className="text-gray-500">No tracked products found</p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.productId?.name || "Unknown Product"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.productId?.category || "Uncategorized"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-full flex items-center ${
                          statusColors[product.currentStatus] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {statusIcons[product.currentStatus] || (
                          <Clock className="w-4 h-4" />
                        )}
                        <span className="ml-2 text-sm font-medium">
                          {product.currentStatus
                            ? product.currentStatus
                                .replace("_", " ")
                                .charAt(0)
                                .toUpperCase() +
                              product.currentStatus.slice(1)
                            : "Unknown"}
                        </span>
                      </div>
                      {product.currentStatus !== "in_transit" && (
                        <button
                          onClick={() => handleOpenModal("transfer", product)}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <Send className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Transfer</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-sm">
                        {product.currentLocation || "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="text-sm">
                        Updated{" "}
                        {formatTimeAgo(product.updatedAt)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Truck className="w-5 h-5 mr-2" />
                      <span className="text-sm">
                        {product.nextDestination || "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      <div className="space-y-4">
                        {product.timeline && product.timeline.map((event, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                statusColors[event.status] || "bg-gray-100"
                              }`}
                            >
                              {statusIcons[event.status] || (
                                <Clock className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {event.status
                                  ? event.status
                                      .replace("_", " ")
                                      .charAt(0)
                                      .toUpperCase() + event.status.slice(1)
                                  : "Unknown"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(event.date)} • {event.location || "N/A"}
                              </p>
                              {event.notes && (
                                <p className="text-xs text-gray-500 mt-1 italic">
                                  {event.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {showModal && modalType === "transfer" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Transfer Product
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Distributor
                </label>
                <select
                  name="distributorId"
                  value={formData.distributorId || ""}
                  onChange={(e) => handleDistributorChange(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select a distributor</option>
                  {distributors.map((distributor) => (
                    <option key={distributor._id} value={distributor._id}>
                      {distributor.name || "Unnamed Distributor"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  placeholder="Current Location"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Destination
                </label>
                <input
                  type="text"
                  name="nextDestination"
                  value={formData.nextDestination || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  placeholder="Next Destination"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter temperature"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter humidity"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes || ""}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add any additional notes"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Transfer Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}