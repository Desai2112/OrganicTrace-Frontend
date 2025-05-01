import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Truck,
  CheckCircle,
  Clock,
  Box,
  User,
  Settings,
  LogOut,
  ArrowLeft,
  Calendar,
  Thermometer,
  Droplets,
  FileDown,
  MapPin,
  AlertCircle,
  Eye,
  BoxesIcon,
  Search,
  RefreshCw,
  Workflow,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const SupplyChainTracking = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptingLoad, setAcceptingLoad] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle accepting incoming load
  const handleAcceptLoad = async (shipmentId) => {
    try {
      setAcceptingLoad(shipmentId);
      const response = await axios.put(
        `http://localhost:5000/api/tracking/accept/${shipmentId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setShipments(
          shipments.map((shipment) => {
            if (shipment.id === shipmentId) {
              return {
                ...shipment,
                status: "Delivered",
                events: [
                  {
                    time: new Date().toLocaleString(),
                    description: "Load accepted at destination",
                  },
                  ...shipment.events,
                ],
              };
            }
            return shipment;
          })
        );
      } else {
        setError("Failed to accept load. Please try again.");
      }
    } catch (err) {
      console.error("Error accepting load:", err);
      setError("Failed to accept load. Please try again.");
    } finally {
      setAcceptingLoad(null);
    }
  };

  // Function to format the API response into the structure needed for UI
  const formatShipmentData = (apiResponse) => {
    if (!apiResponse || !apiResponse.success) {
      throw new Error("Invalid API response");
    }

    if (apiResponse.data && !Array.isArray(apiResponse.data)) {
      return [mapShipmentData(apiResponse.data)];
    }

    if (Array.isArray(apiResponse.data)) {
      return apiResponse.data.map((shipment) => mapShipmentData(shipment));
    }

    return [];
  };

  // Helper function to map API data to our component format
  const mapShipmentData = (data) => {
    let temperature = "N/A";
    let humidity = "N/A";

    const transitEvent = data.timeline.find(
      (event) =>
        event.status === "in_transit" &&
        event.notes &&
        (event.notes.includes("Temp:") || event.notes.includes("Humidity:"))
    );

    if (transitEvent) {
      const tempMatch = transitEvent.notes.match(/Temp:\s*(\d+°C)/);
      const humidityMatch = transitEvent.notes.match(/Humidity:\s*(\d+%)/);

      if (tempMatch) temperature = tempMatch[1];
      if (humidityMatch) humidity = humidityMatch[1];
    }

    const events = data.timeline
      .map((event) => ({
        time: new Date(event.date).toLocaleString(),
        description: `${capitalizeFirstLetter(
          event.status.replace("_", " ")
        )} at ${event.location}${event.notes ? ` - ${event.notes}` : ""}`,
      }))
      .reverse();

    const statusMap = {
      in_transit: "In Transit",
      delivered: "Delivered",
      harvested: "Harvested",
      certified: "Certified",
      delayed: "Delayed",
      processing: "Processing",
    };

    return {
      id: data._id,
      product: data.productId.name,
      origin: data.timeline[0]?.location || data.currentLocation,
      destination: data.nextDestination,
      status: statusMap[data.currentStatus] || data.currentStatus,
      currentLocation: data.currentLocation,
      temperature: temperature,
      humidity: humidity,
      estimatedDelivery: "Pending",
      certifications: data.productId.certifications,
      events: events,
      totalQuantity: data.productId.quantity,
      price: data.productId.price,
    };
  };

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/tracking/distributor",
          {
            withCredentials: true,
          }
        );

        const formattedShipments = formatShipmentData(response.data);
        setShipments(formattedShipments);
        setError(null);
      } catch (err) {
        console.error("Error fetching shipments:", err);
        setError("Failed to load shipments. Please try again later.");

        const sampleResponse = {
          data: {
            _id: "67ec0fd22d941aba62c25bfd",
            productId: {
              _id: "67ec0fd22d941aba62c25bf7",
              name: "Sugarcane",
              category: "grains",
              registeredBy: "67d165f067ee5b2c3fb0c96f",
              location: "Surat",
              quantity: 10000,
              price: 52,
              description: "",
              certifications: [
                "NPOP Certification",
                "India Organic Certification",
              ],
            },
            userId: "67d165f067ee5b2c3fb0c96f",
            distributorId: {
              _id: "67eb9b681875ebb024f14e3e",
              email: "22dcs014@charusat.edu.in",
              name: "OrganicTrace",
            },
            currentStatus: "in_transit",
            currentLocation: "Surat",
            nextDestination: "Vadodara",
            timeline: [
              {
                status: "harvested",
                date: "2025-04-02T00:00:00.000Z",
                location: "Surat",
                notes: "Product harvested at farm.",
                _id: "67ec0fd22d941aba62c25bfe",
              },
              {
                status: "certified",
                date: "2025-04-01T16:10:54.667Z",
                location: "Certification Office",
                notes: "Product certified successfully",
                _id: "67ec100e2d941aba62c25c30",
              },
              {
                status: "in_transit",
                date: "2025-04-01T16:13:27.092Z",
                location: "Surat",
                notes:
                  "Transferred to manufacturer. Temp: 30°C, Humidity: 60%. Notes: N/A",
                _id: "67ec10a72f65246aec8396fc",
              },
            ],
            createdAt: "2025-04-01T16:09:54.480Z",
            updatedAt: "2025-04-01T16:13:27.098Z",
            __v: 1,
          },
          message: "Tracking record fetched successfully",
          success: true,
        };

        try {
          const formattedShipments = formatShipmentData(sampleResponse);
          setShipments(formattedShipments);
        } catch (formatErr) {
          console.error("Error formatting sample data:", formatErr);
          setShipments([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const shipmentStats = [
    {
      icon: <Truck className="text-blue-500" size={20} />,
      label: "Active Shipments",
      value: shipments.length,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: <Truck className="text-amber-500" size={20} />,
      label: "In Transit",
      value: shipments.filter((s) => s.status === "In Transit").length,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      icon: <CheckCircle className="text-green-500" size={20} />,
      label: "Delivered",
      value: shipments.filter((s) => s.status === "Delivered").length,
      color: "bg-green-50 text-green-600 border-green-200",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "In Transit":
        return <Truck className="w-4 h-4 text-blue-500" />;
      case "Harvested":
        return <Calendar className="w-4 h-4 text-amber-500" />;
      case "Certified":
        return <CheckCircle className="w-4 h-4 text-purple-500" />;
      case "Delayed":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.currentLocation
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      shipment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/tracking/distributor",
        {
          withCredentials: true,
        }
      );

      const formattedShipments = formatShipmentData(response.data);
      setShipments(formattedShipments);
      setError(null);
    } catch (err) {
      console.error("Error refreshing shipments:", err);
      setError("Failed to refresh shipments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-gray-600">Loading shipment data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <AlertCircle className="text-red-500 h-12 w-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed h-full w-16 lg:w-64 bg-white shadow-lg z-50">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="bg-blue-500 p-2 rounded-lg">
                <BoxesIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-blue-600 ml-3 hidden lg:block">
                TrackChain
              </h1>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-2">
              <li>
                <Link
                  to="/distributor/dashboard"
                  className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 group "
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="ml-3 hidden lg:block">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/distributor/orders"
                  className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 group"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="ml-3 hidden lg:block">Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/distributor/supply-chain"
                  className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
                >
                  <Workflow className="w-5 h-5" />
                  <span className="ml-3 hidden lg:block">Supply Chain</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="space-y-2">
              <Link
                to="/distributor/profile"
                className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 group"
              >
                <User className="w-5 h-5" />
                <span className="ml-3 hidden lg:block">Profile</span>
              </Link>
              <Link
                to="/distributor/settings"
                className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 group"
              >
                <Settings className="w-5 h-5" />
                <span className="ml-3 hidden lg:block">Settings</span>
              </Link>
              <button className="flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 group">
                <LogOut className="w-5 h-5" />
                <span className="ml-3 hidden lg:block">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-16 lg:pl-64">
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to="/distributor/dashboard"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </Link>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Supply Chain Tracking
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 p-2 bg-gray-50 border border-gray-200 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search shipments..."
                  />
                </div>

                <button
                  onClick={handleRefresh}
                  className="p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  title="Refresh Data"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {shipmentStats.map((stat, index) => (
              <div
                key={index}
                className={`rounded-lg border p-6 ${stat.color} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center mb-2">
                  {stat.icon}
                  <p className="text-sm ml-2">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Shipments List */}
          {filteredShipments.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-100">
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No shipments found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or wait for new shipments
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Shipment {shipment.id}
                        </p>
                        <h3 className="text-lg font-medium text-gray-900">
                          {shipment.product}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full items-center
                          ${
                            shipment.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : shipment.status === "In Transit"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {getStatusIcon(shipment.status)}
                        {shipment.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <MapPin size={14} className="mr-2" />
                          Origin
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {shipment.origin}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <MapPin size={14} className="mr-2" />
                          Destination
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {shipment.destination}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Thermometer size={14} className="mr-2" />
                          Temperature
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {shipment.temperature}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Droplets size={14} className="mr-2" />
                          Humidity
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {shipment.humidity}
                        </p>
                      </div>
                    </div>

                    {shipment.certifications &&
                      shipment.certifications.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <CheckCircle size={14} className="mr-2" />
                            Certifications
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {shipment.certifications.map((cert, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Box size={14} className="mr-2" />
                        Current Location:
                        <span className="ml-1 font-medium text-gray-700">
                          {shipment.currentLocation}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Clock size={14} className="mr-2" />
                        Tracking Events
                      </div>
                      <div className="space-y-3">
                        {shipment.events.map((event, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {event.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {event.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Download Report"
                        >
                          <FileDown size={18} />
                        </button>
                        {shipment.status !== "Delivered" && (
                          <button
                            onClick={() => handleAcceptLoad(shipment.id)}
                            disabled={acceptingLoad === shipment.id}
                            className={`flex items-center p-2 text-green-600 hover:bg-green-50 rounded-lg ${
                              acceptingLoad === shipment.id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <CheckCircle size={18} className="mr-2" />
                            {acceptingLoad === shipment.id
                              ? "Accepting..."
                              : "Accept Load"}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-2" />
                        {shipment.estimatedDelivery !== "Pending" ? (
                          <>
                            Est. Delivery:{" "}
                            <span className="ml-1 font-medium text-gray-700">
                              {shipment.estimatedDelivery}
                            </span>
                          </>
                        ) : (
                          <>
                            Quantity:{" "}
                            <span className="ml-1 font-medium text-gray-700">
                              {shipment.totalQuantity?.toLocaleString()} units
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SupplyChainTracking;
