import React from "react";
import { Link } from "react-router-dom";
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  AlertCircle, 
  BarChart3, 
  BoxesIcon, 
  Workflow,
  User,
  LogOut,
  Settings,
  Search,
  RefreshCw
} from "lucide-react";

const DistributorDashboard = () => {
  const quickStats = [
    {
      icon: <Package className="text-blue-500" size={20} />,
      label: "Products",
      value: 0,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: <ShoppingCart className="text-purple-500" size={20} />,
      label: "Orders",
      value: 0,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      icon: <Truck className="text-green-500" size={20} />,
      label: "Shipments",
      value: 0,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      icon: <AlertCircle className="text-amber-500" size={20} />,
      label: "Low Stock",
      value: 0,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    }
  ];

  const featureCards = [
    {
      icon: <ShoppingCart className="text-purple-500" size={24} />,
      title: "Orders",
      description: "Process and manage customer orders efficiently.",
      link: "/distributor/orders",
    },
    {
      icon: <Workflow className="text-green-500" size={24} />,
      title: "Supply Chain",
      description: "Monitor product movement through the supply chain.",
      link: "/distributor/supply-chain",
    }
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
                <Link to="/distributor/dashboard" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
                  <BarChart3 className="w-5 h-5" />
                  <span className="ml-3 hidden lg:block">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/distributor/orders" className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 group">
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
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-100">
            <div className="space-y-2">
              <Link to="/distributor/profile" className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 groupAscendant.transition-colors">
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
              <h1 className="text-2xl font-semibold text-gray-800">Distribution Center</h1>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    className="pl-10 p-2 bg-gray-50 border border-gray-200 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search dashboard..."
                  />
                </div>
                
                <button 
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
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome to your Distribution Center
            </h2>
            <p className="mt-2 text-gray-600">
              Monitor your inventory, process orders, and track shipments from one central location
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className={`rounded-lg border p-6 ${stat.color} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center mb-2">
                  {stat.icon}
                  <p className="text-sm ml-2">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureCards.map((card, index) => (
              <Link
                key={index}
                to={card.link}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center mb-3">
                  {card.icon}
                  <h2 className="text-lg font-medium text-gray-900 ml-2">
                    {card.title}
                  </h2>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  Access Now
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DistributorDashboard;