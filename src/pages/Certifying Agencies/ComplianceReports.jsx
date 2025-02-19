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
  FileCheck,
  Calendar,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BarChart,
  FileText,
  ChevronDown
} from 'lucide-react';

export default function ComplianceReports() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const reports = [
    {
      id: 'RPT001',
      company: 'Green Valley Farms',
      type: 'Monthly Compliance',
      date: '2024-02-15',
      status: 'compliant',
      score: 95,
      findings: [
        { type: 'positive', description: 'Excellent organic practices maintained' },
        { type: 'improvement', description: 'Minor updates needed in record keeping' }
      ],
      documents: ['compliance_report', 'inspection_checklist', 'evidence_photos']
    },
    {
      id: 'RPT002',
      company: 'Nature\'s Best',
      type: 'Quarterly Audit',
      date: '2024-02-10',
      status: 'needs_attention',
      score: 78,
      findings: [
        { type: 'improvement', description: 'Storage conditions need improvement' },
        { type: 'issue', description: 'Documentation gaps identified' }
      ],
      documents: ['audit_report', 'improvement_plan']
    },
    {
      id: 'RPT003',
      company: 'Pure Organics',
      type: 'Violation Report',
      date: '2024-02-05',
      status: 'non_compliant',
      score: 45,
      findings: [
        { type: 'issue', description: 'Major non-compliance in pesticide usage' },
        { type: 'issue', description: 'Immediate corrective action required' }
      ],
      documents: ['violation_report', 'corrective_action_plan']
    }
  ];

  const statusStyles = {
    compliant: 'bg-green-100 text-green-700',
    needs_attention: 'bg-yellow-100 text-yellow-700',
    non_compliant: 'bg-red-100 text-red-700'
  };

  const statusIcons = {
    compliant: <CheckCircle2 className="w-4 h-4" />,
    needs_attention: <AlertTriangle className="w-4 h-4" />,
    non_compliant: <XCircle className="w-4 h-4" />
  };

  const findingStyles = {
    positive: 'text-green-600',
    improvement: 'text-yellow-600',
    issue: 'text-red-600'
  };

  const findingIcons = {
    positive: <CheckCircle2 className="w-4 h-4" />,
    improvement: <AlertTriangle className="w-4 h-4" />,
    issue: <XCircle className="w-4 h-4" />
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
                Compliance Reports
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Compliance Reports</h2>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FileText className="w-5 h-5 mr-2" />
              Generate New Report
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reports..."
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
                <option value="compliant">Compliant</option>
                <option value="needs_attention">Needs Attention</option>
                <option value="non_compliant">Non-Compliant</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{report.company}</h3>
                    <p className="text-sm text-gray-500">ID: {report.id}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Compliance Score</p>
                      <div className="text-lg font-semibold">
                        <span className={`
                          ${report.score >= 90 ? 'text-green-600' : 
                            report.score >= 70 ? 'text-yellow-600' : 'text-red-600'}
                        `}>
                          {report.score}%
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[report.status]}`}>
                      {statusIcons[report.status]}
                      <span className="ml-2">
                        {report.status.replace('_', ' ').charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <FileCheck className="w-5 h-5 mr-2" />
                    <span className="text-sm">{report.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="text-sm">{report.date}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Findings:</p>
                  <div className="space-y-2">
                    {report.findings.map((finding, index) => (
                      <div key={index} className={`flex items-center ${findingStyles[finding.type]}`}>
                        {findingIcons[finding.type]}
                        <span className="ml-2 text-sm">{finding.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex space-x-2">
                    {report.documents.map((doc, index) => (
                      <button
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        {doc.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Report
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