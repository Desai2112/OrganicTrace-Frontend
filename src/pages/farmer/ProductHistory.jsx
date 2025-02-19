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
  Calendar,
  Download,
  FileText,
  ArrowUpDown,
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function ProductHistory() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const transactions = [
    {
      id: 'TRX001',
      date: '2024-02-17',
      productName: 'Organic Tomatoes',
      quantity: '500 kg',
      price: '$2,500',
      buyer: 'Fresh Foods Market',
      status: 'completed',
      documents: ['invoice', 'certification']
    },
    {
      id: 'TRX002',
      date: '2024-02-16',
      productName: 'Organic Lettuce',
      quantity: '300 kg',
      price: '$1,800',
      buyer: 'Green Grocers',
      status: 'pending',
      documents: ['invoice']
    },
    {
      id: 'TRX003',
      date: '2024-02-15',
      productName: 'Organic Carrots',
      quantity: '400 kg',
      price: '$1,200',
      buyer: 'Wellness Mart',
      status: 'cancelled',
      documents: ['invoice', 'certification']
    }
  ];

  const statusStyles = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700'
  };

  const statusIcons = {
    completed: <CheckCircle2 className="w-4 h-4" />,
    pending: <AlertCircle className="w-4 h-4" />,
    cancelled: <XCircle className="w-4 h-4" />
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
                Product History
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
            to="/farmer/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <div className="flex items-center">
                      Date
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Buyer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Documents</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.productName}</div>
                        <div className="text-sm text-gray-500">ID: {transaction.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.buyer}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[transaction.status]}`}>
                        {statusIcons[transaction.status]}
                        <span className="ml-2">{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {transaction.documents.map((doc, index) => (
                          <button
                            key={index}
                            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            title={`Download ${doc}`}
                          >
                            <FileText className="w-5 h-5" />
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 