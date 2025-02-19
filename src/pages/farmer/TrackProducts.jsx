import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Tractor,
  User,
  Bell,
  Settings,
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Truck
} from 'lucide-react';

export default function TrackProducts() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const products = [
    {
      id: 'PRD001',
      name: 'Organic Tomatoes',
      status: 'in_transit',
      location: 'Distribution Center, NY',
      lastUpdate: '2 hours ago',
      nextDestination: 'Retail Store, Manhattan',
      temperature: '4°C',
      humidity: '85%',
      timeline: [
        { status: 'harvested', date: '2024-02-15', location: 'Farm' },
        { status: 'certified', date: '2024-02-16', location: 'Certification Center' },
        { status: 'in_transit', date: '2024-02-17', location: 'Distribution Center' }
      ]
    },
    // Add more products as needed
  ];

  const statusColors = {
    harvested: 'bg-green-100 text-green-700',
    certified: 'bg-blue-100 text-blue-700',
    in_transit: 'bg-orange-100 text-orange-700',
    delivered: 'bg-purple-100 text-purple-700'
  };

  const statusIcons = {
    harvested: <Tractor className="w-4 h-4" />,
    certified: <CheckCircle2 className="w-4 h-4" />,
    in_transit: <Truck className="w-4 h-4" />,
    delivered: <MapPin className="w-4 h-4" />
  };

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
                Track Products
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
            to="/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="all">All Statuses</option>
                <option value="harvested">Harvested</option>
                <option value="certified">Certified</option>
                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">ID: {product.id}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center ${statusColors[product.status]}`}>
                    {statusIcons[product.status]}
                    <span className="ml-2 text-sm font-medium">
                      {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-sm">{product.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="text-sm">Updated {product.lastUpdate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Truck className="w-5 h-5 mr-2" />
                    <span className="text-sm">{product.nextDestination}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-4">
                      {product.timeline.map((event, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusColors[event.status]}`}>
                            {statusIcons[event.status]}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {event.status.replace('_', ' ').charAt(0).toUpperCase() + event.status.slice(1)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {event.date} • {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}