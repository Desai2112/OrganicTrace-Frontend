import React, { useState } from "react";
import {
  Truck,
  Calendar,
  MapPin,
  Clock,
  Plus,
  Search,
  Filter,
} from "lucide-react";

export default function Deliveries() {
  const [deliveries] = useState([
    {
      id: "DEL-001",
      route: "Route A",
      driver: "John Smith",
      vehicle: "TRK-101",
      stops: 5,
      status: "In Transit",
      eta: "2:30 PM",
      date: "2024-02-19",
    },
    {
      id: "DEL-002",
      route: "Route B",
      driver: "Sarah Johnson",
      vehicle: "TRK-102",
      stops: 3,
      status: "Scheduled",
      eta: "3:45 PM",
      date: "2024-02-19",
    },
    {
      id: "DEL-003",
      route: "Route C",
      driver: "Mike Davis",
      vehicle: "TRK-103",
      stops: 4,
      status: "Completed",
      eta: "-",
      date: "2024-02-18",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Truck className="w-8 h-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Delivery Management
            </h1>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Schedule Delivery
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Calendar className="w-10 h-10 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Today's Deliveries
                </p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Truck className="w-10 h-10 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Routes
                </p>
                <p className="text-2xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <MapPin className="w-10 h-10 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Stops</p>
                <p className="text-2xl font-semibold text-gray-900">23</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search deliveries..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>

        {/* Deliveries Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stops
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ETA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {delivery.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {delivery.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {delivery.driver}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {delivery.vehicle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {delivery.stops}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        delivery.status
                      )}`}
                    >
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      {delivery.eta}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {delivery.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
