import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Tractor,
  User,
  Bell,
  Settings,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  FileText,
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

export default function ProductHistory() {
  const [notifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });

  useEffect(() => {
    fetchProducts(1);
  }, [dateFilter, statusFilter]);

  const fetchProducts = async (page) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(
        "http://localhost:5000/api/product/get",
        {
          params: {
            page,
            date: dateFilter !== "all" ? dateFilter : undefined,
            status: statusFilter !== "all" ? statusFilter : undefined,
            search: searchTerm || undefined,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setProducts(response.data.data.products);
        setPagination(response.data.data.pagination);
      } else {
        setError(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Error fetching product history"
      );
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };
  

  const statusStyles = {
    registered: "bg-green-100 text-green-700",
    processed: "bg-yellow-100 text-yellow-700",
    dispatched: "bg-blue-100 text-blue-700",
  };

  const statusIcons = {
    registered: <CheckCircle2 className="w-4 h-4" />,
    processed: <AlertCircle className="w-4 h-4" />,
    dispatched: <Tractor className="w-4 h-4" />,
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
                placeholder="Search products..."
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
                <option value="registered">Registered</option>
                <option value="processed">Processed</option>
                <option value="dispatched">Dispatched</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
              <span className="ml-2 text-gray-600">Loading products...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8 text-red-500">
              <AlertCircle className="w-6 h-6 mr-2" />
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mb-2" />
              <p>No products found</p>
            </div>
          ) : (
            <>
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
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Harvest Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product._id}
                        className="border-b border-gray-200 hover:bg-gray-50/50"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDate(product.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDate(product.harvestDate)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {product.quantity} kgs
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              statusStyles[product.status]
                            }`}
                          >
                            {statusIcons[product.status]}
                            <span className="ml-2 capitalize">
                              {product.status}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Showing page {pagination.currentPage} of{" "}
                    {pagination.totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => fetchProducts(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className={`p-2 rounded-lg ${
                        pagination.currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => fetchProducts(pagination.currentPage + 1)}
                      disabled={
                        pagination.currentPage === pagination.totalPages
                      }
                      className={`p-2 rounded-lg ${
                        pagination.currentPage === pagination.totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}