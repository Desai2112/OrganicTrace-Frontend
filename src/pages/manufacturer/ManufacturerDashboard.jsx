import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Factory,
  Package,
  ClipboardList,
  History,
  Search,
  BarChart3,
  Truck,
  Settings,
  Bell,
  User,
  Plus,
  FileSpreadsheet,
  ArrowUpDown,
  ListChecks
} from 'lucide-react';

export default function ManufacturerDashboard() {
  const [notifications] = useState(3); // Example notification count

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Create a new product entry',
      icon: <Plus />,
      link: '/products/new',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Process Orders',
      description: 'View and process pending orders',
      icon: <ClipboardList />,
      link: '/orders',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Quality Control',
      description: 'Manage quality checks',
      icon: <ListChecks />,
      link: '/quality',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Track Products',
      description: 'Monitor product movement',
      icon: <Search />,
      link: '/track',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const productionMetrics = [
    { label: 'Total Products', value: '1,234', change: '+12%' },
    { label: 'Active Orders', value: '56', change: '+5%' },
    { label: 'Quality Score', value: '98%', change: '+2%' },
    { label: 'Efficiency Rate', value: '94%', change: '+3%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Factory className="w-8 h-8 text-green-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Manufacturing Control Center
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
          {productionMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <span className="ml-2 text-sm font-medium text-green-600">{metric.change}</span>
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
              <div className={`flex items-center justify-center w-12 h-12 ${action.color} rounded-lg mb-4`}>
                {React.cloneElement(action.icon, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>

        {/* Production Overview and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Production Schedule */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Production Schedule</h3>
              <Link to="/schedule" className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-gray-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Organic Product #{item}</p>
                      <p className="text-xs text-gray-500">Batch #2024-0{item}</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600">In Production</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <ArrowUpDown className="w-5 h-5 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm text-gray-900">New order received</p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Package className="w-5 h-5 text-green-500" />
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Production completed</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-orange-500" />
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Shipment dispatched</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}