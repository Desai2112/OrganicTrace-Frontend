import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Tractor, 
  Factory, 
  Truck, 
  Store, 
  User,
  Package,
  History,
  Search,
  ListPlus,
  FileSpreadsheet,
  Calendar,
  BarChart3
} from 'lucide-react';

export default function Dashboard() {
  const [userRole] = useState('farmer'); // This would come from auth context in real app

  const roleIcons = {
    farmer: <Tractor className="w-6 h-6" />,
    manufacturer: <Factory className="w-6 h-6" />,
    distributor: <Truck className="w-6 h-6" />,
    retailer: <Store className="w-6 h-6" />,
    consumer: <User className="w-6 h-6" />
  };

  const roleSpecificFeatures = {
    farmer: [
      { title: 'Add New Product', icon: <ListPlus />, link: '/products/add' },
      { title: 'Manage Products', icon: <Package />, link: '/products/manage' },
      { title: 'View Supply Chain', icon: <Truck />, link: '/supply-chain' },
      { title: 'Product History', icon: <History />, link: '/history' }
    ],
    manufacturer: [
      { title: 'Add New Product', icon: <ListPlus />, link: '/products/add' },
      { title: 'Manage Products', icon: <Package />, link: '/products/manage' },
      { title: 'Supply Chain View', icon: <Truck />, link: '/supply-chain' },
      { title: 'Production Reports', icon: <FileSpreadsheet />, link: '/reports' }
    ],
    distributor: [
      { title: 'Entry Product List', icon: <ListPlus />, link: '/entry-products' },
      { title: 'Exit Product List', icon: <Package />, link: '/exit-products' },
      { title: 'Track Shipments', icon: <Truck />, link: '/tracking' },
      { title: 'Delivery Reports', icon: <FileSpreadsheet />, link: '/reports' }
    ],
    retailer: [
      { title: 'Current Inventory', icon: <Package />, link: '/inventory' },
      { title: 'Used Today', icon: <Calendar />, link: '/used-today' },
      { title: 'Track Products', icon: <Search />, link: '/track' },
      { title: 'Sales Analytics', icon: <BarChart3 />, link: '/analytics' }
    ],
    consumer: [
      { title: 'Track My Food', icon: <Search />, link: '/track-food' },
      { title: 'Purchase History', icon: <History />, link: '/history' },
      { title: 'Used Products', icon: <Calendar />, link: '/used-products' },
      { title: 'View Supply Chain', icon: <Truck />, link: '/supply-chain' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {roleIcons[userRole]}
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Organic Food Traceability System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome to your {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
          </h2>
          <p className="mt-2 text-gray-600">
            Track and manage organic food products through the supply chain with complete transparency.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleSpecificFeatures[userRole].map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                {React.cloneElement(feature.icon, { className: "w-6 h-6 text-green-600" })}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">
                Access and manage your {feature.title.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="ml-4">
                  <p className="text-sm text-gray-900">Product #{item} updated</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}