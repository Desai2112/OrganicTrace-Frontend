import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BoxesIcon,
  PlusCircle,
  ShoppingCart,
  MapPin,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  User,
  LogOut,
  Settings,
  Search,
  Workflow,
  Calendar,
  DollarSign,
  Award,
  QrCode,
  Eye,
  BarChart3,
  Filter,
  ChevronDown,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

const ItemList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQRItem, setActiveQRItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "table"

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/tracking/distributor/delivered",
          {
            withCredentials: true
          }
        );
        setInventoryItems(response.data.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch inventory data: " + err.message);
        setInventoryItems([]);
        console.error("Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleViewShipmentDetails = (itemId) => {
    window.location.href = `/distributor/shipment-details/${itemId}`;
  };

  const toggleQRCode = (itemId) => {
    setActiveQRItem(activeQRItem === itemId ? null : itemId);
  };

  const handleRefresh = async () => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/tracking/distributor/delivered",
          {
            withCredentials: true
          }
        );
        setInventoryItems(response.data.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch inventory data: " + err.message);
        setInventoryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  };

  // Filter items based on search term
  const filteredItems = inventoryItems.filter(item => 
    item.productId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productId.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.currentLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-gray-600">Loading inventory data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <AlertTriangle className="text-red-500 h-12 w-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-2">Error Loading Data</h2>
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

  // Calculate stats after loading and error checks
  const inventoryStats = [
    {
      icon: <BoxesIcon className="text-blue-500" size={20} />,
      label: "Total Products",
      value: inventoryItems.length,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: <AlertTriangle className="text-amber-500" size={20} />,
      label: "Low Stock Items",
      value: inventoryItems.filter((item) => item.productId.quantity < 1000).length,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      icon: <MapPin className="text-purple-500" size={20} />,
      label: "Storage Zones",
      value: new Set(inventoryItems.map((item) => item.currentLocation)).size,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      icon: <BarChart3 className="text-green-500" size={20} />,
      label: "Avg. Price/kg",
      value: "₹" + (inventoryItems.reduce((sum, item) => sum + item.productId.price, 0) / inventoryItems.length).toFixed(2),
      color: "bg-green-50 text-green-600 border-green-200",
    },
  ];

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
              <h1 className="text-xl font-bold text-blue-600 ml-3 hidden lg:block">TrackChain</h1>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-2">
              <li>
                <Link to="/distributor/dashboard" className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 group">
                  <BarChart3 className="w-5 h-5" />
                  <span className="ml-3 hidden lg:block">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/distributor/orders" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="ml-3 hidden lg:block">Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/distributor/supply-chain" className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 group">
                  <Workflow className="w-5 h-5" />
                  <span className="ml-3 hidden lg:block">Supply Chain</span>
                </Link>
              </li>
              {/* Add more menu items here */}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-100">
            <div className="space-y-2">
              <Link to="/distributor/profile" className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 group">
                <User className="w-5 h-5" />
                <span className="ml-3 hidden lg:block">Profile</span>
              </Link>
              <Link to="/distributor/settings" className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 group">
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
              <h1 className="text-2xl font-semibold text-gray-800">Inventory Management</h1>
              
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
                    placeholder="Search products, categories..."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {inventoryStats.map((stat, index) => (
              <div
                key={index}
                className={`rounded-lg border p-6 ${stat.color}`}
              >
                <div className="flex items-center mb-2">
                  {stat.icon}
                  <p className="text-sm ml-2">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setViewMode("grid")} 
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                </div>
              </button>
              <button 
                onClick={() => setViewMode("table")} 
                className={`p-2 rounded-lg ${viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                <div className="flex flex-col gap-1">
                  <div className="w-6 h-1 bg-current rounded-sm"></div>
                  <div className="w-6 h-1 bg-current rounded-sm"></div>
                  <div className="w-6 h-1 bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm">
                  <Filter size={16} />
                  <span>Filter</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center">
                <PlusCircle size={16} className="mr-2" />
                Add Product
              </button>
            </div>
          </div>

          {/* Products Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredItems.length === 0 ? (
                <div className="col-span-full bg-white rounded-lg p-8 text-center">
                  <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <BoxesIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{item.productId.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">Category: {item.productId.category}</p>
                        </div>
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full items-center
                          ${
                            item.currentStatus === "delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.currentStatus === "delivered" ? (
                            <CheckCircle size={12} className="mr-1" />
                          ) : (
                            <AlertTriangle size={12} className="mr-1" />
                          )}
                          {item.currentStatus}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <BoxesIcon size={14} className="mr-2 text-blue-500" />
                            Quantity
                          </div>
                          <p className="text-lg font-medium">{item.productId.quantity} kg</p>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <DollarSign size={14} className="mr-2 text-green-500" />
                            Price
                          </div>
                          <p className="text-lg font-medium">₹{item.productId.price}/kg</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <MapPin size={14} className="text-purple-500 mr-2" />
                        <p className="text-sm text-gray-600">{item.currentLocation}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar size={14} className="mr-2" />
                        <p>
                          Harvested:{" "}
                          {new Date(
                            item.timeline.find((t) => t.status === "harvested")?.date ||
                              item.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => toggleQRCode(item._id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="QR Code"
                          >
                            <QrCode size={18} />
                          </button>
                          
                          {activeQRItem === item._id && (
                            <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-xl p-4 transform translate-y-24">
                              <div className="mb-2 text-center text-xs font-medium text-gray-700">
                                Scan to view details
                              </div>
                              <QRCode 
                                value={`${window.location.origin}/distributor/shipment-details/${item._id}`} 
                                size={120}
                                level="M"
                                className="border border-gray-200 p-1"
                              />
                            </div>
                          )}
                          
                          <button
                            onClick={() => handleViewShipmentDetails(item._id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Edit">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No inventory items found
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item) => (
                        <tr
                          key={item._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.productId.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {item.productId.category}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-600">{item.productId.quantity} kg</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-medium rounded-full items-center
                              ${
                                item.currentStatus === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {item.currentStatus === "delivered" ? (
                                <CheckCircle size={12} className="mr-1" />
                              ) : (
                                <AlertTriangle size={12} className="mr-1" />
                              )}
                              {item.currentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <MapPin size={14} className="text-purple-500 mr-2" />
                              <p className="text-sm text-gray-600">{item.currentLocation}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-600">₹{item.productId.price}/kg</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => toggleQRCode(item._id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="QR Code"
                              >
                                <QrCode size={18} />
                              </button>
                              
                              {activeQRItem === item._id && (
                                <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-xl p-4 transform -translate-x-32">
                                  <QRCode 
                                    value={`${window.location.origin}/distributor/shipment-details/${item._id}`} 
                                    size={120}
                                    level="M"
                                    className="border border-gray-200 p-1"
                                  />
                                </div>
                              )}
                              
                              <button
                                onClick={() => handleViewShipmentDetails(item._id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="View Details"
                              >
                                <Eye size={18} />
                              </button>
                              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Edit">
                                <Edit size={18} />
                              </button>
                              <button className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg" title="Delete">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ItemList;