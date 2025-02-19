import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2,
  User,
  Bell,
  Settings,
  ArrowLeft,
  Calendar,
  MapPin,
  Plus,
  Search,
  Filter,
  Clock,
  Users,
  FileCheck,
  CalendarDays
} from 'lucide-react';

export default function AuditSchedule() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  const audits = [
    {
      id: 'AUD001',
      company: 'Green Valley Farms',
      type: 'Initial Certification',
      date: '2024-02-20',
      time: '09:00 AM',
      location: 'California, USA',
      auditor: 'John Smith',
      status: 'upcoming',
      documents: ['checklist', 'previous_reports']
    },
    {
      id: 'AUD002',
      company: 'Organic Solutions',
      type: 'Annual Inspection',
      date: '2024-02-22',
      time: '10:30 AM',
      location: 'Oregon, USA',
      auditor: 'Sarah Johnson',
      status: 'confirmed',
      documents: ['checklist']
    },
    {
      id: 'AUD003',
      company: 'Pure Foods Inc',
      type: 'Follow-up',
      date: '2024-02-25',
      time: '02:00 PM',
      location: 'Washington, USA',
      auditor: 'Mike Brown',
      status: 'pending',
      documents: ['checklist', 'improvement_plan']
    }
  ];

  const statusStyles = {
    upcoming: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-gray-100 text-gray-700'
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
                Audit Schedule
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

        {/* Actions and Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Scheduled Audits</h2>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              Schedule New Audit
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search audits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Types</option>
                <option value="initial">Initial Certification</option>
                <option value="annual">Annual Inspection</option>
                <option value="followup">Follow-up</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Months</option>
                <option value="02">February 2024</option>
                <option value="03">March 2024</option>
                <option value="04">April 2024</option>
              </select>
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Audit List */}
        <div className="space-y-6">
          {audits.map((audit) => (
            <div key={audit.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{audit.company}</h3>
                    <p className="text-sm text-gray-500">ID: {audit.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[audit.status]}`}>
                    {audit.status.charAt(0).toUpperCase() + audit.status.slice(1)}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <div>
                      <p className="text-sm font-medium">{audit.date}</p>
                      <p className="text-xs">{audit.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-sm">{audit.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span className="text-sm">{audit.auditor}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FileCheck className="w-5 h-5 mr-2" />
                    <span className="text-sm">{audit.type}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex space-x-2">
                    {audit.documents.map((doc, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600"
                      >
                        {doc.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
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