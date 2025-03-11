import React, { useState } from "react";
import {
  ListChecks,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  FileCheck,
  Clock,
  AlertOctagon,
  ChevronDown,
  Eye,
} from "lucide-react";

export default function QualityControl() {
  const [inspections] = useState([
    {
      id: "QC-001",
      product: "Organic Tomato Sauce",
      batch: "BATCH-2024-001",
      type: "Production",
      inspector: "John Smith",
      date: "2024-02-19",
      status: "Passed",
      score: "98%",
    },
    {
      id: "QC-002",
      product: "Whole Grain Pasta",
      batch: "BATCH-2024-002",
      type: "Pre-packaging",
      inspector: "Sarah Johnson",
      date: "2024-02-19",
      status: "In Progress",
      score: "-",
    },
    {
      id: "QC-003",
      product: "Natural Snack Bars",
      batch: "BATCH-2024-003",
      type: "Final",
      inspector: "Mike Davis",
      date: "2024-02-18",
      status: "Failed",
      score: "85%",
    },
  ]);

  const metrics = [
    {
      title: "Quality Score",
      value: "96.5%",
      change: "+1.2%",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Inspections Today",
      value: "15",
      change: "+3",
      icon: <FileCheck className="w-6 h-6" />,
    },
    {
      title: "Avg. Inspection Time",
      value: "45m",
      change: "-5m",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Critical Issues",
      value: "2",
      change: "-1",
      icon: <AlertOctagon className="w-6 h-6" />,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Passed":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score) => {
    if (score === "-") return "text-gray-500";
    const numScore = parseInt(score);
    if (numScore >= 95) return "text-green-600";
    if (numScore >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ListChecks className="w-8 h-8 text-green-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Quality Control
            </h1>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 border border-gray-200">
              Download Reports
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              New Inspection
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

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search inspections..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                  Inspection Type
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

        {/* Inspections Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {inspection.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inspection.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inspection.batch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inspection.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inspection.inspector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inspection.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        inspection.status
                      )}`}
                    >
                      {inspection.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap font-medium ${getScoreColor(
                      inspection.score
                    )}`}
                  >
                    {inspection.score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <XCircle className="w-5 h-5" />
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
