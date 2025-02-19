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
  CheckCircle2,
  Calendar,
  FileCheck,
  AlertCircle,
  Clock,
  XCircle,
  Download,
  Eye,
  RotateCcw
} from 'lucide-react';

export default function Certifications() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const certifications = [
    {
      id: 'CERT001',
      company: 'Green Valley Farms',
      type: 'Organic Production',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-14',
      status: 'active',
      products: ['Tomatoes', 'Lettuce', 'Carrots'],
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10',
      documents: ['certificate', 'audit_report', 'compliance_checklist']
    },
    {
      id: 'CERT002',
      company: 'Nature\'s Best',
      type: 'Organic Processing',
      issueDate: '2023-12-01',
      expiryDate: '2024-11-30',
      status: 'expiring_soon',
      products: ['Organic Juice', 'Dried Fruits'],
      lastAudit: '2023-11-25',
      nextAudit: '2024-05-25',
      documents: ['certificate', 'audit_report']
    },
    {
      id: 'CERT003',
      company: 'Pure Organics',
      type: 'Organic Storage',
      issueDate: '2023-06-15',
      expiryDate: '2024-06-14',
      status: 'suspended',
      products: ['Storage Facility A', 'Storage Facility B'],
      lastAudit: '2024-01-20',
      nextAudit: '2024-03-20',
      documents: ['certificate', 'suspension_notice']
    }
  ];

  const statusStyles = {
    active: 'bg-green-100 text-green-700',
    expiring_soon: 'bg-yellow-100 text-yellow-700',
    suspended: 'bg-red-100 text-red-700',
    expired: 'bg-gray-100 text-gray-700'
  };

  const statusIcons = {
    active: <CheckCircle2 className="w-4 h-4" />,
    expiring_soon: <Clock className="w-4 h-4" />,
    suspended: <AlertCircle className="w-4 h-4" />,
    expired: <XCircle className="w-4 h-4" />
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
                Active Certifications
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
                placeholder="Search certifications..."
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
                <option value="active">Active</option>
                <option value="expiring_soon">Expiring Soon</option>
                <option value="suspended">Suspended</option>
                <option value="expired">Expired</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Types</option>
                <option value="production">Production</option>
                <option value="processing">Processing</option>
                <option value="storage">Storage</option>
              </select>
              <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Certifications List */}
        <div className="space-y-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cert.company}</h3>
                    <p className="text-sm text-gray-500">ID: {cert.id}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[cert.status]}`}>
                    {statusIcons[cert.status]}
                    <span className="ml-2">
                      {cert.status.replace('_', ' ').charAt(0).toUpperCase() + cert.status.slice(1)}
                    </span>
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center text-gray-600">
                    <FileCheck className="w-5 h-5 mr-2" />
                    <span className="text-sm">{cert.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Valid Until</p>
                      <p className="text-sm font-medium">{cert.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Last Audit</p>
                      <p className="text-sm font-medium">{cert.lastAudit}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Next Audit</p>
                      <p className="text-sm font-medium">{cert.nextAudit}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Certified Products:</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.products.map((product, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex space-x-2">
                    {cert.documents.map((doc, index) => (
                      <button
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        {doc.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <button className="inline-flex items-center px-4 py-2 text-yellow-600 hover:text-yellow-700 transition-colors">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Renew
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
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