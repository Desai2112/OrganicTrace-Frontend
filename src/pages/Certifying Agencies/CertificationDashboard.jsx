import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  AlertCircle,
  FileCheck,
  Calendar,
  BarChart3,
  Settings,
  User,
  Bell,
  ClipboardCheck,
  ArrowRight,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
} from "lucide-react";

export default function CertificationDashboard() {
  const [notifications] = useState(3);

  const quickStats = [
    {
      label: "Pending Requests",
      value: "24",
      change: "+8%",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      label: "Active Certifications",
      value: "156",
      change: "+12%",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      label: "Scheduled Audits",
      value: "18",
      change: "+5%",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: "Certified Entities",
      value: "89",
      change: "+15%",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const recentRequests = [
    {
      id: "REQ001",
      company: "Green Valley Farms",
      type: "New Certification",
      status: "pending",
      date: "2024-02-17",
    },
    {
      id: "REQ002",
      company: "Organic Solutions",
      type: "Renewal",
      status: "in_review",
      date: "2024-02-16",
    },
    {
      id: "REQ003",
      company: "Pure Foods Inc",
      type: "New Certification",
      status: "approved",
      date: "2024-02-15",
    },
  ];

  const upcomingAudits = [
    {
      company: "Nature's Best",
      date: "2024-02-20",
      type: "Annual Inspection",
      location: "California, USA",
    },
    {
      company: "Eco Farms",
      date: "2024-02-22",
      type: "Initial Certification",
      location: "Oregon, USA",
    },
    {
      company: "Green Harvest",
      date: "2024-02-25",
      type: "Follow-up Audit",
      location: "Washington, USA",
    },
  ];

  const quickActions = [
    {
      title: "Review Requests",
      description: "Process pending certification requests",
      icon: <ClipboardCheck />,
      link: "/certification/requests",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Schedule Audits",
      description: "Plan and manage upcoming audits",
      icon: <Calendar />,
      link: "/certification/audits",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Compliance Reports",
      description: "View compliance monitoring data",
      icon: <FileCheck />,
      link: "/certification/compliance",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Analytics",
      description: "Track certification metrics",
      icon: <BarChart3 />,
      link: "/certification/analytics",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    in_review: "bg-blue-100 text-blue-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    in_review: <AlertCircle className="w-4 h-4" />,
    approved: <CheckCircle2 className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Certification Dashboard
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Welcome Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, Certifier
          </h2>
          <p className="mt-2 text-gray-600">
            Manage certification requests and monitor compliance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 rounded-lg p-2">
                  {React.cloneElement(stat.icon, {
                    className: "text-blue-600",
                  })}
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">
                  {stat.label}
                </h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
              <div
                className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl mb-4`}
              >
                {React.cloneElement(action.icon, {
                  className: "w-6 h-6 text-white",
                })}
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {action.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{action.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-900">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Certification Requests */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Requests
              </h3>
              <Link
                to="/certification/requests"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50/80 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-2 h-2 rounded-full ${statusStyles[
                        request.status
                      ].replace("text", "bg")}`}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {request.company}
                      </p>
                      <p className="text-xs text-gray-500">{request.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusStyles[request.status]
                      }`}
                    >
                      {statusIcons[request.status]}
                      <span className="ml-1">
                        {request.status
                          .replace("_", " ")
                          .charAt(0)
                          .toUpperCase() + request.status.slice(1)}
                      </span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {request.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Audits */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Audits
              </h3>
              <Link
                to="/certification/audits"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Schedule
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingAudits.map((audit, index) => (
                <div key={index} className="p-4 bg-gray-50/80 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {audit.company}
                      </p>
                      <p className="text-xs text-gray-500">{audit.type}</p>
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {audit.date}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {audit.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
