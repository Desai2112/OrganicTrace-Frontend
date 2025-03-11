import React from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Package,
  Truck,
  Clock,
  DollarSign,
} from "lucide-react";

export default function SupplyChain() {
  const metrics = [
    {
      title: "On-Time Delivery Rate",
      value: "96%",
      change: "+2.5%",
      trend: "up",
      description: "Last 30 days",
    },
    {
      title: "Average Lead Time",
      value: "2.3 days",
      change: "-0.5 days",
      trend: "down",
      description: "From order to delivery",
    },
    {
      title: "Order Accuracy",
      value: "98.5%",
      change: "+1.2%",
      trend: "up",
      description: "Orders without errors",
    },
    {
      title: "Inventory Turnover",
      value: "12.4x",
      change: "+0.8x",
      trend: "up",
      description: "Annual rate",
    },
  ];

  const alerts = [
    {
      type: "warning",
      message: "Low inventory alert for 3 products",
      time: "2 hours ago",
    },
    {
      type: "info",
      message: "New supplier onboarding completed",
      time: "5 hours ago",
    },
    {
      type: "success",
      message: "Monthly quality audit passed",
      time: "1 day ago",
    },
  ];

  const suppliers = [
    {
      name: "Organic Farms Co.",
      reliability: "98%",
      leadTime: "2 days",
      quality: "4.8/5",
      status: "Active",
    },
    {
      name: "Fresh Produce Inc.",
      reliability: "95%",
      leadTime: "3 days",
      quality: "4.5/5",
      status: "Active",
    },
    {
      name: "Green Valley Foods",
      reliability: "92%",
      leadTime: "2.5 days",
      quality: "4.6/5",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Supply Chain Analytics
            </h1>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500">
                {metric.title}
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
                <span
                  className={`ml-2 text-sm font-medium flex items-center ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {metric.change}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supplier Performance */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Supplier Performance
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reliability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quality
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {suppliers.map((supplier, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {supplier.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {supplier.reliability}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {supplier.leadTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {supplier.quality}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {supplier.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts and Updates */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Alerts
            </h2>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    alert.type === "warning"
                      ? "bg-yellow-50"
                      : alert.type === "info"
                      ? "bg-blue-50"
                      : "bg-green-50"
                  }`}
                >
                  <div className="flex items-center">
                    <AlertCircle
                      className={`w-5 h-5 ${
                        alert.type === "warning"
                          ? "text-yellow-500"
                          : alert.type === "info"
                          ? "text-blue-500"
                          : "text-green-500"
                      }`}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Package className="w-10 h-10 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total SKUs</p>
                <p className="text-2xl font-semibold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Truck className="w-10 h-10 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Shipments
                </p>
                <p className="text-2xl font-semibold text-gray-900">45</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Clock className="w-10 h-10 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Avg Processing
                </p>
                <p className="text-2xl font-semibold text-gray-900">1.2d</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <DollarSign className="w-10 h-10 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Monthly Cost
                </p>
                <p className="text-2xl font-semibold text-gray-900">$45.2K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
