import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  FileText,
  X,
} from "lucide-react";

export default function ComplianceReports() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);

  // Helper functions for date formatting
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to handle viewing full report
  const handleViewReport = (report) => {
    setSelectedAudit(report.rawData);
    setShowReportModal(true);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(
          "http://localhost:5000/api/audit/completed",
          {
            withCredentials: true,
          }
        );

        // Transform the API response to match our component's expected format
        if (
          response.data &&
          response.data.success &&
          response.data.Completedaudits
        ) {
          const transformedReports = response.data.Completedaudits.map(
            (audit) => {
              // Map findings categories to our status types
              const findingsMap = {
                observation: "positive",
                minor_non_conformity: "improvement",
                major_non_conformity: "issue",
              };

              // Determine overall status based on the most severe finding
              let status = "compliant";
              if (
                audit.findings.some(
                  (f) => f.category === "major_non_conformity"
                )
              ) {
                status = "non_compliant";
              } else if (
                audit.findings.some(
                  (f) => f.category === "minor_non_conformity"
                )
              ) {
                status = "needs_attention";
              }

              // Calculate a simple compliance score based on findings
              let score = 100;
              audit.findings.forEach((finding) => {
                if (finding.category === "minor_non_conformity") score -= 10;
                if (finding.category === "major_non_conformity") score -= 25;
              });
              score = Math.max(0, score); // Ensure score doesn't go below 0

              return {
                id: audit._id,
                company: audit.farmerId.company.name,
                type: `${
                  audit.auditType.charAt(0).toUpperCase() +
                  audit.auditType.slice(1)
                } Audit`,
                date: new Date(audit.completionDate || audit.scheduledDate)
                  .toISOString()
                  .split("T")[0],
                status: status,
                score: score,
                findings: audit.findings.map((finding) => ({
                  type: findingsMap[finding.category] || "improvement",
                  description: finding.description,
                })),
                documents: [
                  "audit_report",
                  "compliance_certificate",
                  audit.status === "non_compliant"
                    ? "corrective_action_plan"
                    : "inspection_checklist",
                ],
                // Keep original data for reference if needed
                rawData: audit,
              };
            }
          );

          setReports(transformedReports);
        } else {
          throw new Error("Invalid API response format");
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching compliance reports:", err);
        setError("Failed to load reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Filter reports based on search term and filters
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;

    // Simple date filtering - can be enhanced based on requirements
    let matchesDate = true;
    if (dateFilter !== "all") {
      const reportDate = new Date(report.date);
      const now = new Date();

      if (dateFilter === "week") {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = reportDate >= oneWeekAgo;
      } else if (dateFilter === "month") {
        matchesDate =
          reportDate.getMonth() === now.getMonth() &&
          reportDate.getFullYear() === now.getFullYear();
      } else if (dateFilter === "quarter") {
        const reportQuarter = Math.floor(reportDate.getMonth() / 3);
        const currentQuarter = Math.floor(now.getMonth() / 3);
        matchesDate =
          reportQuarter === currentQuarter &&
          reportDate.getFullYear() === now.getFullYear();
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const statusStyles = {
    compliant: "bg-green-100 text-green-700",
    needs_attention: "bg-yellow-100 text-yellow-700",
    non_compliant: "bg-red-100 text-red-700",
  };

  const statusIcons = {
    compliant: <CheckCircle2 className="w-4 h-4" />,
    needs_attention: <AlertTriangle className="w-4 h-4" />,
    non_compliant: <XCircle className="w-4 h-4" />,
  };

  const findingStyles = {
    positive: "text-green-600",
    improvement: "text-yellow-600",
    issue: "text-red-600",
  };

  const findingIcons = {
    positive: <CheckCircle2 className="w-4 h-4" />,
    improvement: <AlertTriangle className="w-4 h-4" />,
    issue: <XCircle className="w-4 h-4" />,
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
            <h2 className="text-xl font-semibold text-gray-900">
              Compliance Reports
            </h2>
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

        {/* Loading and Error States */}
        {loading && (
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading compliance reports...</p>
          </div>
        )}

        {error && (
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-red-100 p-8 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Reports List */}
        {!loading && !error && (
          <>
            {filteredReports.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-gray-600">
                  No reports match your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setDateFilter("all");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {report.company}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ID: {report.id}
                          </p>
                          <p className="text-sm text-gray-500">
                            Certificate:{" "}
                            {report.rawData?.certificateId?._id || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">
                              Compliance Score
                            </p>
                            <div className="text-lg font-semibold">
                              <span
                                className={`
                                ${
                                  report.score >= 90
                                    ? "text-green-600"
                                    : report.score >= 70
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }
                              `}
                              >
                                {report.score}%
                              </span>
                            </div>
                          </div>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              statusStyles[report.status]
                            }`}
                          >
                            {statusIcons[report.status]}
                            <span className="ml-2">
                              {report.status
                                .replace("_", " ")
                                .charAt(0)
                                .toUpperCase() +
                                report.status.replace("_", " ").slice(1)}
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
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Key Findings:
                        </p>
                        <div className="space-y-2">
                          {report.findings.map((finding, index) => (
                            <div
                              key={index}
                              className={`flex items-center ${
                                findingStyles[finding.type]
                              }`}
                            >
                              {findingIcons[finding.type]}
                              <span className="ml-2 text-sm">
                                {finding.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <button
                          onClick={() => handleViewReport(report)}
                          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Report
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showReportModal && selectedAudit && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Audit Report</h3>
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4">
                        Basic Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">Audit Type</p>
                          <p className="font-medium capitalize">
                            {selectedAudit.auditType}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Status</p>
                          <p className="font-medium capitalize">
                            {selectedAudit.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Scheduled Date</p>
                          <p className="font-medium">
                            {formatDate(selectedAudit.scheduledDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Scheduled Time</p>
                          <p className="font-medium">
                            {formatTime(selectedAudit.scheduledDate)}
                          </p>
                        </div>
                        {selectedAudit.completionDate && (
                          <div>
                            <p className="text-gray-600">Completion Date</p>
                            <p className="font-medium">
                              {formatDate(selectedAudit.completionDate)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Findings */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4">
                        Audit Findings
                      </h4>
                      {selectedAudit.findings &&
                      selectedAudit.findings.length > 0 ? (
                        <div className="space-y-4">
                          {selectedAudit.findings.map((finding, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 p-4 rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm ${
                                    finding.category === "observation"
                                      ? "bg-blue-100 text-blue-700"
                                      : finding.category ===
                                        "minor_non_conformity"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {finding.category === "observation"
                                    ? "Observation"
                                    : finding.category ===
                                      "minor_non_conformity"
                                    ? "Minor Non-Conformity"
                                    : "Major Non-Conformity"}
                                </span>
                              </div>
                              <p className="text-gray-700">
                                {finding.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">No findings recorded</p>
                      )}
                    </div>

                    {/* Notes */}
                    {selectedAudit.notes && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-4">Notes</h4>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {selectedAudit.notes}
                        </p>
                      </div>
                    )}

                    {/* Certificate Information (if audit is completed) */}
                    {selectedAudit.status === "completed" &&
                      selectedAudit.certificateId && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold mb-4">
                            Certificate Information
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-600">
                                Certificate Status
                              </p>
                              <p className="font-medium capitalize">
                                {selectedAudit.certificateId.status}
                              </p>
                            </div>
                            {selectedAudit.certificateId.expiryDate && (
                              <div>
                                <p className="text-gray-600">Expiry Date</p>
                                <p className="font-medium">
                                  {formatDate(
                                    selectedAudit.certificateId.expiryDate
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Print Report
                      </button>
                      <button
                        onClick={() => setShowReportModal(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
