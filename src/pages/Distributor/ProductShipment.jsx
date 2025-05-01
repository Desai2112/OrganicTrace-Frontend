import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TruckIcon,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Map,
  FileText,
  Package,
  ArrowLeft,
  Leaf,
  Truck,
  ClipboardCheck,
  ArrowRight
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ProductTracking = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRecord, setExpandedRecord] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/tracking/track/${productId}`);
        
        if (response.data && response.data.success) {
          setTrackingData(response.data.data || []);
        } else {
          throw new Error(response.data.message || "Failed to fetch tracking data");
        }
      } catch (err) {
        console.error("Error fetching tracking data:", err);
        setError("Unable to load tracking information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchTrackingData();
    }
  }, [productId]);

  const toggleRecordDetails = (recordId) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 ring-green-700/10";
      case "in_transit":
        return "bg-blue-100 text-blue-700 ring-blue-700/10";
      case "certified":
        return "bg-purple-100 text-purple-700 ring-purple-700/10";
      case "harvested":
        return "bg-emerald-100 text-emerald-700 ring-emerald-700/10";
      default:
        return "bg-gray-100 text-gray-700 ring-gray-700/10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in_transit":
        return <Truck className="w-4 h-4 text-blue-500" />;
      case "certified":
        return <ClipboardCheck className="w-4 h-4 text-purple-500" />;
      case "harvested":
        return <Leaf className="w-4 h-4 text-emerald-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (e) {
      return dateString || "N/A";
    }
  };

  const formatDateTime = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy - h:mm a");
    } catch (e) {
      return dateString || "N/A";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-xl">
              <TruckIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Organic Product Tracking
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-3 text-gray-700">Loading tracking information...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h2 className="text-lg font-medium text-red-700 mb-1">Tracking Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        ) : trackingData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
            <TruckIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No Tracking Records Found</h3>
            <p className="text-gray-500">There are no tracking records available for this product.</p>
          </div>
        ) : (
          <>
            {trackingData.map((record) => (
              <div key={record._id} className="mb-8">
                {/* Product information card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white p-3 rounded-lg shadow-md">
                        <Package className="w-8 h-8 text-indigo-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Product ID: {record.productId._id}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mt-1">{record.productId.name}</h2>
                        <span className="text-sm px-2 py-0.5 bg-gray-100 rounded-full text-gray-600 mt-1 inline-block">
                          {record.productId.category}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Status</h3>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full inline-flex items-center gap-1.5 ${getStatusColor(
                            record.currentStatus
                          )}`}
                        >
                          {getStatusIcon(record.currentStatus)}
                          {record.currentStatus.replace("_", " ").charAt(0).toUpperCase() + 
                           record.currentStatus.replace("_", " ").slice(1)}
                        </span>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Location</h3>
                        <p className="text-gray-900">{record.currentLocation || "N/A"}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {record.nextDestination ? 
                            `Next destination: ${record.nextDestination}` : 
                            "Final destination reached"}
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Details</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-500">Quantity:</p>
                            <p className="text-sm text-gray-900">{record.productId.quantity} units</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Price:</p>
                            <p className="text-sm text-gray-900">₹{record.productId.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {record.productId.certifications && record.productId.certifications.map((cert, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 border border-green-100"
                          >
                            {cert}
                          </span>
                        ))}
                        {(!record.productId.certifications || record.productId.certifications.length === 0) && (
                          <span className="text-gray-500 text-sm">No certifications listed</span>
                        )}
                      </div>
                    </div>

                    {record.productId.description && (
                      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                        <p className="text-gray-700">
                          {record.productId.description || "No description available"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline tracking section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Track Journey</h2>
                    <div 
                      className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-800"
                      onClick={() => toggleRecordDetails(record._id)}
                    >
                      {expandedRecord === record._id ? "Hide Details" : "Show Details"}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="relative">
                      {/* Timeline */}
                      <div className={`absolute left-4 top-0 border-l-2 border-gray-200 h-full ${expandedRecord === record._id ? "" : "hidden md:block"}`}></div>

                      {/* Mobile compact view when not expanded */}
                      {expandedRecord !== record._id && (
                        <div className="md:hidden">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                {getStatusIcon(record.currentStatus)}
                              </div>
                              <div>
                                <p className="font-medium text-sm">Current Status</p>
                                <p className="text-xs text-gray-500">
                                  {formatDateTime(record.timeline[record.timeline.length - 1].date)}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                record.currentStatus
                              )}`}
                            >
                              {record.currentStatus.replace("_", " ").charAt(0).toUpperCase() + 
                              record.currentStatus.replace("_", " ").slice(1)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Timeline events - either expanded or desktop view */}
                      <div className={expandedRecord !== record._id ? "hidden md:block" : ""}>
                        {record.timeline.slice().reverse().map((event, index, array) => (
                          <div key={event._id} className="relative pl-12 pb-8">
                            <div 
                              className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                index === 0 
                                  ? 'bg-green-100' 
                                  : index === array.length - 1 
                                    ? 'bg-emerald-100' 
                                    : 'bg-blue-100'
                              }`}
                            >
                              {getStatusIcon(event.status)}
                            </div>
                            <div className="ml-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <h3 className="text-base font-medium text-gray-900">
                                  {event.status.replace("_", " ").charAt(0).toUpperCase() + 
                                   event.status.replace("_", " ").slice(1)}
                                </h3>
                                <time className="text-sm text-gray-500">
                                  {formatDateTime(event.date)}
                                </time>
                              </div>
                              <div className="mt-2 bg-gray-50 rounded-lg p-3">
                                <div className="flex items-start gap-2 mb-2">
                                  <Map className="w-4 h-4 text-gray-500 mt-0.5" />
                                  <div>
                                    <p className="text-xs text-gray-500">Location:</p>
                                    <p className="text-sm text-gray-900">{event.location}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                                  <div>
                                    <p className="text-xs text-gray-500">Notes:</p>
                                    <p className="text-sm text-gray-900">{event.notes}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Show toggle button on both views */}
                      <div className="text-center pt-2">
                        <button 
                          className="text-sm text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 md:hidden"
                          onClick={() => toggleRecordDetails(record._id)}
                        >
                          {expandedRecord === record._id ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Hide Timeline
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              View Timeline
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional information */}
                {expandedRecord === record._id && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Distributor Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-700 font-medium text-lg">
                              {record.distributorId.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{record.distributorId.name}</p>
                            <p className="text-sm text-gray-500">{record.distributorId.email}</p>
                            <p className="text-xs text-gray-400 mt-1">ID: {record.distributorId._id}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Tracking Dates</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Created At</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDateTime(record.createdAt)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Last Updated</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDateTime(record.updatedAt)}
                            </p>
                          </div>
                          {record.expectedDeliveryDate && (
                            <div className="col-span-2">
                              <p className="text-xs text-gray-500">Expected Delivery</p>
                              <p className="text-sm font-medium text-gray-900">
                                {formatDate(record.expectedDeliveryDate)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductTracking;