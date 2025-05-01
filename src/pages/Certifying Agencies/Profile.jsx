import { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Users,
  FileText,
  Calendar,
  Edit2,
  Save,
  X,
} from "lucide-react";

export default function CertifierProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "EcoCert Solutions",
    email: "contact@ecocert.com",
    phone: "+1 (555) 123-4567",
    address: "123 Green Street, Eco City, EC 12345",
    website: "www.ecocert.com",
    description:
      "Leading certification agency specializing in organic and sustainable agriculture certification with over 15 years of experience in the industry.",
    established: "2008",
    accreditations: [
      "USDA National Organic Program (NOP)",
      "European Union Organic Certification",
      "ISO/IEC 17065:2012",
    ],
    specialties: [
      "Organic Agriculture",
      "Sustainable Farming",
      "Fair Trade Certification",
      "Non-GMO Verification",
    ],
    teamMembers: [
      {
        name: "Dr. Sarah Johnson",
        role: "Lead Certification Officer",
        certifications: ["ISO Lead Auditor", "USDA NOP Expert"],
      },
      {
        name: "Michael Chen",
        role: "Senior Inspector",
        certifications: ["Organic Inspector", "GAP Auditor"],
      },
      {
        name: "Emily Rodriguez",
        role: "Compliance Manager",
        certifications: ["Quality Management Specialist"],
      },
    ],
  });

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset any changes and exit edit mode
    setIsEditing(false);
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
                Agency Profile
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agency Information */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/20">
              <h2 className="text-xl font-semibold mb-6">Agency Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {profileData.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {profileData.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-600">{profileData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-600">{profileData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-600">{profileData.address}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-600">{profileData.website}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-600">
                    Established {profileData.established}
                  </span>
                </div>
              </div>
            </div>

            {/* Certification Specialties */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/20">
              <h2 className="text-xl font-semibold mb-6">
                Certification Specialties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-50 rounded-lg p-3"
                  >
                    <Award className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-gray-800">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Accreditations */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/20">
              <h2 className="text-xl font-semibold mb-6">Accreditations</h2>
              <div className="space-y-4">
                {profileData.accreditations.map((accreditation, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-green-50 rounded-lg p-3"
                  >
                    <FileText className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-800 text-sm">
                      {accreditation}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-6">Key Team Members</h2>
              <div className="space-y-6">
                {profileData.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="ml-8">
                      {member.certifications.map((cert, certIndex) => (
                        <span
                          key={certIndex}
                          className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-2 mb-2"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
