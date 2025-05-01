import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  CalendarDays,
  X,
  Send,
} from "lucide-react";

export default function AuditSchedule() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [pendingCertificates, setPendingCertificates] = useState([]);

  // Modal and form states
  const [showModal, setShowModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedAuditId, setSelectedAuditId] = useState(null);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [formData, setFormData] = useState({
    certificateId: "",
    auditType: "initial",
    scheduledDate: "",
    scheduledTime: "",
    farmerId: "",
    notes: "",
  });
  const [completeAuditForm, setCompleteAuditForm] = useState({
    findings: [],
    completionNotes: "",
    certificateStatus: "approved",
    certificateExpiryDate: "",
  });
  const [rescheduleForm, setRescheduleForm] = useState({
    scheduledDate: "",
    scheduledTime: "",
    rescheduleReason: "",
  });

  // Dummy data that matches your Audit model structure
  const [audits, setAudits] = useState([]);

  useEffect(() => {
    // Fetch audits
    const fetchAudits = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/audit/get",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setAudits(response.data.audits);
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching audits");
        setLoading(false);
      }
    };

    // Fetch certificates for reference
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/certificate/all",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setCertificates(response.data.certificates);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    // Fetch pending certificates for the dropdown
    const fetchPendingCertificates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/certificate/pending",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setPendingCertificates(response.data.pendingCertificates || []);
        }
      } catch (error) {
        console.error("Error fetching pending certificates:", error);
        setPendingCertificates([]);
      }
    };

    fetchAudits();
    fetchCertificates();
    fetchPendingCertificates();
  }, []);

  // Filter audits based on search, type and month
  const filteredAudits = audits.filter((audit) => {
    const matchesSearch =
      audit.certificateId?.company
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      audit._id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || audit.auditType === filterType;

    const matchesMonth =
      selectedMonth === "all" ||
      new Date(audit.scheduledDate).getMonth() + 1 === parseInt(selectedMonth);

    return matchesSearch && matchesType && matchesMonth;
  });

  const handleScheduleAudit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      certificateId: "",
      auditType: "initial",
      scheduledDate: "",
      scheduledTime: "",
      farmerId: "",
      notes: "",
    });
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the certificate is changing, find the associated farmer ID
    if (name === "certificateId" && value) {
      const selectedCertificate = pendingCertificates.find(
        (cert) => cert._id === value
      );
      if (selectedCertificate && selectedCertificate.entityId) {
        // Set both certificateId and farmerId
        setFormData((prev) => ({
          ...prev,
          certificateId: value,
          farmerId:
            selectedCertificate.entityId._id || selectedCertificate.entityId,
        }));
        return; // Early return to prevent the standard update below
      }
    }

    // Standard update for other fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Combine date and time into a single ISO string
      const scheduledDateTime = new Date(
        `${formData.scheduledDate}T${formData.scheduledTime}`
      ).toISOString();

      // Create the request payload matching the backend API
      const auditData = {
        certificateId: formData.certificateId,
        auditType: formData.auditType,
        scheduledDate: scheduledDateTime,
        farmerId: formData.farmerId, // Send farmerId to the backend
        notes: formData.notes,
      };

      // Make API call to create the audit
      const response = await axios.post(
        "http://localhost:5000/api/audit/create",
        auditData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Refresh the audits list after successful creation
        const auditsResponse = await axios.get(
          "http://localhost:5000/api/audit/get",
          {
            withCredentials: true,
          }
        );

        if (auditsResponse.data.success) {
          setAudits(auditsResponse.data.audits);
        }

        handleCloseModal();
      } else {
        setError(response.data.message || "Failed to create audit");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error scheduling audit:", err);
      setError(err.response?.data?.message || "Error scheduling audit");
      setLoading(false);
    }
  };

  const handleReschedule = async (auditId) => {
    setSelectedAuditId(auditId);
    setShowRescheduleModal(true);
  };

  const handleCompleteAudit = (auditId) => {
    setSelectedAuditId(auditId);
    setShowCompleteModal(true);
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const scheduledDateTime = new Date(
        `${rescheduleForm.scheduledDate}T${rescheduleForm.scheduledTime}`
      ).toISOString();

      const response = await axios.put(
        `http://localhost:5000/api/audit/reschedule/${selectedAuditId}`,
        {
          scheduledDate: scheduledDateTime,
          rescheduleReason: rescheduleForm.rescheduleReason,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const auditsResponse = await axios.get(
          "http://localhost:5000/api/audit/get",
          {
            withCredentials: true,
          }
        );

        if (auditsResponse.data.success) {
          setAudits(auditsResponse.data.audits);
        }

        setShowRescheduleModal(false);
        setRescheduleForm({
          scheduledDate: "",
          scheduledTime: "",
          rescheduleReason: "",
        });
      } else {
        setError(response.data.message || "Failed to reschedule audit");
      }

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error rescheduling audit");
      setLoading(false);
    }
  };

  const handleAddFinding = () => {
    setCompleteAuditForm((prev) => ({
      ...prev,
      findings: [
        ...prev.findings,
        { category: "observation", description: "" },
      ],
    }));
  };

  const handleFindingChange = (index, field, value) => {
    setCompleteAuditForm((prev) => {
      const newFindings = [...prev.findings];
      newFindings[index] = {
        ...newFindings[index],
        [field]: value,
      };
      return {
        ...prev,
        findings: newFindings,
      };
    });
  };

  const handleRemoveFinding = (index) => {
    setCompleteAuditForm((prev) => ({
      ...prev,
      findings: prev.findings.filter((_, i) => i !== index),
    }));
  };

  const handleCompleteAuditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // First complete the audit with findings
      const auditResponse = await axios.put(
        `http://localhost:5000/api/audit/complete/${selectedAuditId}`,
        {
          findings: completeAuditForm.findings,
        },
        {
          withCredentials: true,
        }
      );

      if (auditResponse.data.success) {
        // Get the certificate ID from the audit response
        const certificateId = auditResponse.data.audit.certificateId;

        // Update the certificate status and expiry date
        const certificateResponse = await axios.put(
          `http://localhost:5000/api/certificate/update/${certificateId}`,
          {
            status: completeAuditForm.certificateStatus,
            expiryDate: completeAuditForm.certificateExpiryDate,
          },
          {
            withCredentials: true,
          }
        );

        if (certificateResponse.data.success) {
          // Refresh the audits list
          const auditsResponse = await axios.get(
            "http://localhost:5000/api/audit/get",
            {
              withCredentials: true,
            }
          );

          if (auditsResponse.data.success) {
            setAudits(auditsResponse.data.audits);
          }

          setShowCompleteModal(false);
          setCompleteAuditForm({
            findings: [],
            completionNotes: "",
            certificateStatus: "approved",
            certificateExpiryDate: "",
          });
        } else {
          setError(
            certificateResponse.data.message || "Failed to update certificate"
          );
        }
      } else {
        setError(auditResponse.data.message || "Failed to complete audit");
      }

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error completing audit");
      setLoading(false);
    }
  };

  const handleViewReport = (audit) => {
    setSelectedAudit(audit);
    setShowReportModal(true);
  };

  const statusStyles = {
    scheduled: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  // Format date in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time from date
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
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
            <h2 className="text-xl font-semibold text-gray-900">
              Scheduled Audits
            </h2>
            <button
              onClick={handleScheduleAudit}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
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
                <option value="surveillance">Surveillance</option>
                <option value="renewal">Renewal</option>
                <option value="special">Special</option>
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
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && !showModal && (
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600">Loading audits...</p>
          </div>
        )}

        {error && !showModal && (
          <div className="bg-red-50 rounded-xl shadow-lg p-8 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Audit List */}
        {!loading && !error && (
          <div className="space-y-6">
            {filteredAudits.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600">
                  No audits found matching your criteria.
                </p>
              </div>
            ) : (
              filteredAudits.map((audit) => (
                <div
                  key={audit._id}
                  className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {audit.farmerId.company?.name ||
                            "Company Name Unavailable"}
                        </h3>
                        {/* Display farmer information if available */}
                        {audit.farmerId && (
                          <p className="text-sm text-gray-600">
                            Farmer: {audit.farmerId.name || "Name Unavailable"}
                          </p>
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          statusStyles[audit.status]
                        }`}
                      >
                        {audit.status.charAt(0).toUpperCase() +
                          audit.status.slice(1)}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-2" />
                        <div>
                          <p className="text-sm font-medium">
                            {formatDate(audit.scheduledDate)}
                          </p>
                          <p className="text-xs">
                            {formatTime(audit.scheduledDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="text-sm">
                          {audit.farmerId.company.address ||
                            "Location Unavailable"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileCheck className="w-5 h-5 mr-2" />
                        <span className="text-sm">
                          {audit.auditType === "initial"
                            ? "Initial Certification"
                            : audit.auditType === "surveillance"
                            ? "Surveillance"
                            : audit.auditType === "renewal"
                            ? "Renewal"
                            : audit.auditType === "special"
                            ? "Special"
                            : "Unknown"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex space-x-2">
                        {audit.findings && audit.findings.length > 0 ? (
                          audit.findings.map((finding, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-lg text-sm ${
                                finding.category === "observation"
                                  ? "bg-blue-100 text-blue-700"
                                  : finding.category === "minor_non_conformity"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : finding.category === "major_non_conformity"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {finding.category === "observation"
                                ? "Observation"
                                : finding.category === "minor_non_conformity"
                                ? "Minor Non-Conformity"
                                : finding.category === "major_non_conformity"
                                ? "Major Non-Conformity"
                                : finding.category}
                            </span>
                          ))
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600">
                            No findings yet
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        {audit.status === "scheduled" && (
                          <>
                            <button
                              onClick={() => handleReschedule(audit._id)}
                              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => handleCompleteAudit(audit._id)}
                              className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                            >
                              Complete Audit
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleViewReport(audit)}
                          className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          View Report
                        </button>
                        <Link
                          to={`/certification/audit/${audit._id}`}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Schedule Audit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Schedule New Audit</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {error && showModal && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Certificate Selection - Now using pendingCertificates with safety check */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Certificate (Pending Only)
                  </label>
                  <select
                    name="certificateId"
                    value={formData.certificateId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a pending certificate...</option>
                    {pendingCertificates && pendingCertificates.length > 0 ? (
                      pendingCertificates.map((cert) => (
                        <option key={cert._id} value={cert._id}>
                          {cert.entityId.name} - {cert.productId.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No pending certificate available.
                      </option>
                    )}
                  </select>
                  {(!pendingCertificates || pendingCertificates.length === 0) &&
                    !loading && (
                      <p className="text-amber-600 text-sm mt-1">
                        No pending certificates available.
                      </p>
                    )}
                </div>

                {/* Display selected farmer info if available */}
                {formData.farmerId && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-blue-700 text-sm">
                      Selected Farmer ID: {formData.farmerId}
                    </p>
                  </div>
                )}

                {/* Audit Type */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Audit Type
                  </label>
                  <select
                    name="auditType"
                    value={formData.auditType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="initial">Initial Certification</option>
                    <option value="surveillance">Surveillance</option>
                    <option value="renewal">Renewal</option>
                    <option value="special">Special</option>
                  </select>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add any additional notes about the audit"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={
                      loading ||
                      (pendingCertificates && pendingCertificates.length === 0)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Schedule Audit
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reschedule Audit Modal */}
        {showRescheduleModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Reschedule Audit</h3>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleRescheduleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      New Date
                    </label>
                    <input
                      type="date"
                      value={rescheduleForm.scheduledDate}
                      onChange={(e) =>
                        setRescheduleForm((prev) => ({
                          ...prev,
                          scheduledDate: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      New Time
                    </label>
                    <input
                      type="time"
                      value={rescheduleForm.scheduledTime}
                      onChange={(e) =>
                        setRescheduleForm((prev) => ({
                          ...prev,
                          scheduledTime: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Reason for Rescheduling
                  </label>
                  <textarea
                    value={rescheduleForm.rescheduleReason}
                    onChange={(e) =>
                      setRescheduleForm((prev) => ({
                        ...prev,
                        rescheduleReason: e.target.value,
                      }))
                    }
                    required
                    placeholder="Please provide a reason for rescheduling"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Rescheduling...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Reschedule Audit
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Complete Audit Modal */}
        {showCompleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Complete Audit</h3>
                <button
                  onClick={() => setShowCompleteModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleCompleteAuditSubmit}>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 font-medium">
                      Findings
                    </label>
                    <button
                      type="button"
                      onClick={handleAddFinding}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      + Add Finding
                    </button>
                  </div>
                  {completeAuditForm.findings.map((finding, index) => (
                    <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <select
                          value={finding.category}
                          onChange={(e) =>
                            handleFindingChange(
                              index,
                              "category",
                              e.target.value
                            )
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="observation">Observation</option>
                          <option value="minor_non_conformity">
                            Minor Non-Conformity
                          </option>
                          <option value="major_non_conformity">
                            Major Non-Conformity
                          </option>
                        </select>
                        <button
                          type="button"
                          onClick={() => handleRemoveFinding(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        value={finding.description}
                        onChange={(e) =>
                          handleFindingChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        required
                        placeholder="Describe the finding..."
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Certificate Status
                  </label>
                  <select
                    value={completeAuditForm.certificateStatus}
                    onChange={(e) =>
                      setCompleteAuditForm((prev) => ({
                        ...prev,
                        certificateStatus: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Certificate Expiry Date
                  </label>
                  <input
                    type="date"
                    value={completeAuditForm.certificateExpiryDate}
                    onChange={(e) =>
                      setCompleteAuditForm((prev) => ({
                        ...prev,
                        certificateExpiryDate: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Completion Notes
                  </label>
                  <textarea
                    value={completeAuditForm.completionNotes}
                    onChange={(e) =>
                      setCompleteAuditForm((prev) => ({
                        ...prev,
                        completionNotes: e.target.value,
                      }))
                    }
                    placeholder="Add any final notes about the audit completion"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Completing...
                      </>
                    ) : (
                      <>
                        <FileCheck className="w-4 h-4 mr-2" />
                        Complete Audit
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Report Modal */}
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
                <h4 className="text-lg font-semibold mb-4">Audit Findings</h4>
                {selectedAudit.findings && selectedAudit.findings.length > 0 ? (
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
                                : finding.category === "minor_non_conformity"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {finding.category === "observation"
                              ? "Observation"
                              : finding.category === "minor_non_conformity"
                              ? "Minor Non-Conformity"
                              : "Major Non-Conformity"}
                          </span>
                        </div>
                        <p className="text-gray-700">{finding.description}</p>
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
                        <p className="text-gray-600">Certificate Status</p>
                        <p className="font-medium capitalize">
                          {selectedAudit.certificateId.status}
                        </p>
                      </div>
                      {selectedAudit.certificateId.expiryDate && (
                        <div>
                          <p className="text-gray-600">Expiry Date</p>
                          <p className="font-medium">
                            {formatDate(selectedAudit.certificateId.expiryDate)}
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
    </div>
  );
}
