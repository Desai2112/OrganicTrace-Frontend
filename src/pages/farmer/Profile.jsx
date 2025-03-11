import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  User,
  Mail,
  Building,
  MapPin,
  Phone,
  FileText,
  Save,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    company: {
      name: "",
      address: "",
      contact: "",
      registrationNumber: "",
    },
    profileImage: "",
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const userData = response.data.data;
        setProfileData({
          ...userData,
          profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            userData.name
          )}&background=0D9488&color=fff&size=128&bold=true&format=svg`,
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch profile data");
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/user/profile",
        {
          name: profileData.name,
          email: profileData.email,
          company: profileData.company,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsEditing(false);
        // Update the profile image with new name if changed
        setProfileData({
          ...response.data.data,
          profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            response.data.data.name
          )}&background=0D9488&color=fff&size=128&bold=true&format=svg`,
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100/50 to-emerald-50 pt-24 pb-8 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100/50 to-emerald-50 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </motion.div>
        )}

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <motion.div
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-teal-500 to-emerald-500"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={profileData.profileImage}
                  alt={`${profileData.name}'s avatar`}
                  className="w-full h-full"
                />
              </motion.div>
            </div>
            <h1 className="text-2xl font-bold mt-4 text-gray-900">
              {profileData.name}
            </h1>
            <p className="text-gray-600">Organic Farmer</p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Company Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={profileData.company.name}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        company: {
                          ...profileData.company,
                          name: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <FileText className="w-4 h-4 mr-2" />
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={profileData.company.registrationNumber}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        company: {
                          ...profileData.company,
                          registrationNumber: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={profileData.company.address}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        company: {
                          ...profileData.company,
                          address: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.company.contact}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        company: {
                          ...profileData.company,
                          contact: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-colors flex items-center"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
