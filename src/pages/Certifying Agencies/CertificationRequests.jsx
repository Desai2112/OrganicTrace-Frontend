import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2,
  User,
  Bell,
  Settings,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  FileCheck,
  ClipboardCheck,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function CertificationRequests() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const requests = [
    {
      id: 'CERT001',
      companyName: 'Green Valley Farms',
      productName: 'Organic Tomatoes',
      type: 'New Certification',
      submittedDate: '2024-02-15',
      status: 'pending',
      documents: ['application', 'farm_details', 'soil_test'],
      priority: 'high'
    },
    {
      id: 'CERT002',
      companyName: 'Nature\'s Best',
      productName: 'Organic Lettuce',
      type: 'Renewal',
      submittedDate: '2024-02-14',
      status: 'in_review',
      documents: ['application', 'previous_cert'],
      priority: 'medium'
    },
    {
      id: 'CERT003',
      companyName: 'Pure Organics',
      productName: 'Organic Carrots',
      type: 'New Certification',
      submittedDate: '2024-02-13',
      status: 'approved',
      documents: ['application', 'farm_details'],
      priority: 'low'
    }
  ];

  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-700',
    in_review: 'bg-blue-100 text-blue-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    in_review: <AlertCircle className="w-4 h-4" />,
    approved: <CheckCircle2 className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />
  };

  const priorityStyles = {
    high: 'bg-red-50 text-red-700',
    medium: 'bg-yellow-50 text-yellow-700',
    low: 'bg-green-50 text-green-700'
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
                Certification Requests
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

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{request.companyName}</h3>
                    <p className="text-sm text-gray-500">ID: {request.id}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityStyles[request.priority]}`}>
                      {request.priority.toUpperCase()} Priority
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[request.status]}`}>
                      {statusIcons[request.status]}
                      <span className="ml-2">
                        {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-gray-600">
                    <FileCheck className="w-5 h-5 mr-2" />
                    <span className="text-sm">{request.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="text-sm">Submitted: {request.submittedDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClipboardCheck className="w-5 h-5 mr-2" />
                    <span className="text-sm">{request.productName}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex space-x-2">
                    {request.documents.map((doc, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600"
                      >
                        {doc.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 