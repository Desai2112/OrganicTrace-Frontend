import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Tractor, 
  Truck, 
  User,
  Package,
  History,
  Search,
  ListPlus,
  FileSpreadsheet,
  BarChart3,
  Leaf,
  ArrowRight,
  Bell,
  Settings
} from 'lucide-react';

export default function Dashboard() {
  const [notifications] = useState(3);

  const quickStats = [
    { label: 'Active Products', value: '24', change: '+12%', icon: <Package className="w-5 h-5" /> },
    { label: 'Total Yield', value: '1.2K kg', change: '+5%', icon: <Leaf className="w-5 h-5" /> },
    { label: 'Orders', value: '38', change: '+18%', icon: <Truck className="w-5 h-5" /> },
    { label: 'Revenue', value: '$12.4K', change: '+22%', icon: <BarChart3 className="w-5 h-5" /> }
  ];

  const recentActivities = [
    { title: 'New order received', time: '2 hours ago', icon: <Package />, color: 'text-blue-500' },
    { title: 'Product certification updated', time: '4 hours ago', icon: <FileSpreadsheet />, color: 'text-green-500' },
    { title: 'Shipment dispatched', time: '6 hours ago', icon: <Truck />, color: 'text-orange-500' }
  ];

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Register new organic products',
      icon: <ListPlus />,
      link: '/farmer/add',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Track Products',
      description: 'Monitor your product journey',
      icon: <Search />,
      link: '/farmer/track',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'View History',
      description: 'Check past transactions',
      icon: <History />,
      link: '/farmer/history',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Analytics',
      description: 'View performance metrics',
      icon: <BarChart3 />,
      link: '/farmer/analytics',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100/50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                <Tractor className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Farmer Dashboard
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
            Welcome back, Farmer
          </h2>
          <p className="mt-2 text-gray-600">
            Manage and track your organic products with complete transparency
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="bg-green-100 rounded-lg p-2">
                  {React.cloneElement(stat.icon, { className: "text-green-600" })}
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
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
              <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl mb-4`}>
                {React.cloneElement(action.icon, { className: "w-6 h-6 text-white" })}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{action.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-900">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50/80 rounded-lg">
                <div className={`${activity.color}`}>
                  {React.cloneElement(activity.icon, { className: "w-5 h-5" })}
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}