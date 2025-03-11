import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Package,
  Boxes,
  ClipboardList,
  BarChart3,
  Truck,
  Settings,
  Bell,
  User,
  ListChecks,
} from "lucide-react";

// Distributor Dashboard
export default function DistributorDashboard() {
  const [notifications] = useState(5);

  const quickActions = [
    {
      title: "Manage Inventory",
      description: "Update stock levels and locations",
      icon: <Boxes />,
      link: "/distributor/inventory",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Process Orders",
      description: "Handle incoming and outgoing orders",
      icon: <ClipboardList />,
      link: "/distributor/orders",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Schedule Deliveries",
      description: "Plan and track shipments",
      icon: <Truck />,
      link: "/distributor/deliveries",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Supply Chain",
      description: "Monitor supply chain metrics",
      icon: <BarChart3 />,
      link: "/distributor/supply-chain",
      color: "bg-green-100 text-green-600",
    },
  ];

  const distributionMetrics = [
    { label: "Active Orders", value: "234", change: "+8%" },
    { label: "On-Time Delivery", value: "96%", change: "+1%" },
    { label: "Inventory Level", value: "85%", change: "-2%" },
    { label: "Revenue", value: "$45.2K", change: "+15%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Distribution Center
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <button className="relative text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Settings className="w-6 h-6" />
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <User className="w-6 h-6" />
                <span className="ml-2">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {distributionMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm font-medium text-gray-500">
                {metric.label}
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
                <span
                  className={`ml-2 text-sm font-medium ${
                    metric.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div
                className={`flex items-center justify-center w-12 h-12 ${action.color} rounded-lg mb-4`}
              >
                {React.cloneElement(action.icon, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {action.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>

        {/* Delivery Schedule and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Delivery Schedule */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delivery Schedule
              </h3>
              <Link
                to="/schedule"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 text-gray-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Delivery Route #{item}
                      </p>
                      <p className="text-xs text-gray-500">
                        5 Stops • ETA: 2h {item}0m
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-blue-600">In Transit</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Alerts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Inventory Alerts
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-red-50 rounded-lg">
                <Boxes className="w-5 h-5 text-red-500" />
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Low Stock Alert</p>
                  <p className="text-xs text-gray-500">Product ID #1234</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <Package className="w-5 h-5 text-yellow-500" />
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Pending Restocks</p>
                  <p className="text-xs text-gray-500">
                    3 items need attention
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <ListChecks className="w-5 h-5 text-green-500" />
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Stock Check Complete</p>
                  <p className="text-xs text-gray-500">Zone A-C verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
