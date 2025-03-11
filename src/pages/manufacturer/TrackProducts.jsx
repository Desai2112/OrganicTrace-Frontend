import React, { useState } from "react";
import {
  Search,
  Package,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  Truck,
  BarChart3,
  Filter,
  ChevronDown,
  Eye,
  History,
} from "lucide-react";

export default function TrackProducts() {
  const [products] = useState([
    {
      id: "PRD-001",
      name: "Organic Tomato Sauce",
      batch: "BATCH-2024-001",
      location: "Production Line A",
      stage: "Manufacturing",
      startDate: "2024-02-15",
      eta: "2024-02-20",
      status: "On Track",
    },
    {
      id: "PRD-002",
      name: "Whole Grain Pasta",
      batch: "BATCH-2024-002",
      location: "Quality Control",
      stage: "Quality Check",
      startDate: "2024-02-16",
      eta: "2024-02-21",
      status: "Delayed",
    },
    {
      id: "PRD-003",
      name: "Natural Snack Bars",
      batch: "BATCH-2024-003",
      location: "Packaging",
      stage: "Packaging",
      startDate: "2024-02-17",
      eta: "2024-02-22",
      status: "On Track",
    },
  ]);

  const metrics = [
    {
      title: "Active Batches",
      value: "12",
      change: "+2",
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: "In Production",
      value: "5",
      change: "0",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "Avg. Production Time",
      value: "4.5d",
      change: "-0.5d",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "On-Time Rate",
      value: "94%",
      change: "+2%",
      icon: <BarChart3 className="w-6 h-6" />,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800";
      case "Delayed":
        return "bg-red-100 text-red-800";
      case "Ahead":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case "Manufacturing":
        return "bg-blue-100 text-blue-800";
      case "Quality Check":
        return "bg-purple-100 text-purple-800";
      case "Packaging":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-green-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Product Tracking
            </h1>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 border border-gray-200">
              Export Data
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Track New Batch
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {metric.title}
                  </p>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {metric.value}
                    </p>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  {React.cloneElement(metric.icon, {
                    className: "w-6 h-6 text-green-600",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products or batches..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                  Production Stage
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
              </div>
              <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                <Filter className="w-5 h-5 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ETA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.batch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      {product.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStageColor(
                        product.stage
                      )}`}
                    >
                      {product.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                      {product.startDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      {product.eta}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-800">
                        <History className="w-5 h-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm mt-6">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
