import React from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Leaf,
  DollarSign,
  Package,
  Truck,
  Users,
  Calendar,
  Award,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function Analytics() {
  const performanceMetrics = [
    {
      title: "Total Revenue",
      value: "$45,678",
      change: "+12.5%",
      trend: "up",
      description: "Last 30 days",
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: "Active Products",
      value: "24",
      change: "+4",
      trend: "up",
      description: "Currently tracked",
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: "Yield Rate",
      value: "92%",
      change: "-2.1%",
      trend: "down",
      description: "Average success rate",
      icon: <Leaf className="w-6 h-6" />,
    },
    {
      title: "Orders Fulfilled",
      value: "156",
      change: "+18",
      trend: "up",
      description: "This month",
      icon: <Truck className="w-6 h-6" />,
    },
  ];

  const productPerformance = [
    {
      name: "Organic Tomatoes",
      volume: "2,500 kg",
      revenue: "$12,500",
      growth: "+15%",
      status: "High Demand",
    },
    {
      name: "Fresh Lettuce",
      volume: "1,800 kg",
      revenue: "$9,000",
      growth: "+8%",
      status: "Stable",
    },
    {
      name: "Carrots",
      volume: "3,200 kg",
      revenue: "$8,000",
      growth: "-5%",
      status: "Oversupply",
    },
  ];

  const certifications = [
    {
      name: "Organic Certification",
      status: "Active",
      expiry: "2024-12-31",
      score: "98%",
    },
    {
      name: "Fair Trade",
      status: "Active",
      expiry: "2024-10-15",
      score: "95%",
    },
    {
      name: "Sustainable Farming",
      status: "Pending Renewal",
      expiry: "2024-03-30",
      score: "92%",
    },
  ];

  const alerts = [
    {
      type: "warning",
      message: "Tomato yield below target by 10%",
      time: "2 hours ago",
    },
    {
      type: "success",
      message: "Organic certification renewed",
      time: "1 day ago",
    },
    {
      type: "info",
      message: "New market price trends available",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100/50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Farm Analytics
            </h1>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 border border-gray-200">
              Download Report
            </button>
            <select className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 border border-gray-200">
              <option value="30">Last 30 Days</option>
              <option value="60">Last 60 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {metric.title}
                  </p>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {metric.value}
                    </p>
                    <span
                      className={`ml-2 text-sm font-medium flex items-center ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {metric.change}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {metric.description}
                  </p>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Performance */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Product Performance
              </h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Volume</th>
                    <th className="px-6 py-3">Revenue</th>
                    <th className="px-6 py-3">Growth</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productPerformance.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.volume}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.revenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`${
                            product.growth.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.growth}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            product.status === "High Demand"
                              ? "bg-green-100 text-green-800"
                              : product.status === "Stable"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts and Updates */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 mb-2" />
                  <p className="text-sm text-gray-500">Active Buyers</p>
                  <p className="text-xl font-semibold text-gray-900">24</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="text-sm text-gray-500">Harvest Due</p>
                  <p className="text-xl font-semibold text-gray-900">5</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="text-sm text-gray-500">Certifications</p>
                  <p className="text-xl font-semibold text-gray-900">3</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <Truck className="w-6 h-6 text-orange-600 mb-2" />
                  <p className="text-sm text-gray-500">Pending Orders</p>
                  <p className="text-xl font-semibold text-gray-900">8</p>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
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
                        : alert.type === "success"
                        ? "bg-green-50"
                        : "bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <AlertCircle
                        className={`w-5 h-5 ${
                          alert.type === "warning"
                            ? "text-yellow-500"
                            : alert.type === "success"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {cert.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Expires: {cert.expiry}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          cert.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {cert.status}
                      </span>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {cert.score}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
