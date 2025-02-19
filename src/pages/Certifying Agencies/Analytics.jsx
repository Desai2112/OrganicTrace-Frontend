import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2,
  User,
  Bell,
  Settings,
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Filter,
  FileCheck
} from 'lucide-react';

export default function Analytics() {
  const [notifications] = useState(3);
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    {
      title: 'Total Certifications',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: <FileCheck className="w-5 h-5" />
    },
    {
      title: 'Compliance Rate',
      value: '94%',
      change: '+5%',
      trend: 'up',
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      title: 'Active Entities',
      value: '89',
      change: '+15%',
      trend: 'up',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Pending Requests',
      value: '24',
      change: '-8%',
      trend: 'down',
      icon: <AlertTriangle className="w-5 h-5" />
    }
  ];

  const complianceData = [
    { status: 'Compliant', count: 145, color: 'bg-green-500' },
    { status: 'Needs Attention', count: 28, color: 'bg-yellow-500' },
    { status: 'Non-Compliant', count: 12, color: 'bg-red-500' }
  ];

  const monthlyTrends = [
    { month: 'Jan', certifications: 42, compliance: 95 },
    { month: 'Feb', certifications: 38, compliance: 92 },
    { month: 'Mar', certifications: 45, compliance: 94 },
    { month: 'Apr', certifications: 40, compliance: 93 },
    { month: 'May', certifications: 48, compliance: 96 }
  ];

  const recentAlerts = [
    {
      id: 'ALT001',
      type: 'warning',
      message: 'Compliance rate dropped below threshold for 3 entities',
      time: '2 hours ago'
    },
    {
      id: 'ALT002',
      type: 'success',
      message: 'Monthly certification target achieved',
      time: '5 hours ago'
    },
    {
      id: 'ALT003',
      type: 'error',
      message: 'Critical non-compliance detected in 2 facilities',
      time: '1 day ago'
    }
  ];

  const alertStyles = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700'
  };

  const alertIcons = {
    success: <CheckCircle2 className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    error: <XCircle className="w-4 h-4" />
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
                Analytics Dashboard
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
        <div className="mb-6">
          <Link 
            to="/certification/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Time Range Filter */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 rounded-lg p-2">
                  {stat.icon}
                </div>
                <div className="flex items-center">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Compliance Distribution */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Compliance Distribution</h3>
              <PieChart className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {complianceData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${item.color} mr-2`} />
                  <span className="text-sm text-gray-600 flex-1">{item.status}</span>
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({Math.round(item.count / complianceData.reduce((acc, curr) => acc + curr.count, 0) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
              <Filter className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${alertStyles[alert.type]}`}>
                    {alertIcons[alert.type]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            <BarChart3 className="w-5 h-5 text-gray-500" />
          </div>
          <div className="h-64 flex items-end justify-between">
            {monthlyTrends.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 bg-blue-500/20 rounded-t-lg" style={{ height: `${data.certifications}%` }}>
                  <div className="w-full bg-blue-500 rounded-t-lg" style={{ height: `${data.compliance}%` }}></div>
                </div>
                <span className="text-sm text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Compliance Rate</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500/20 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Certifications</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 