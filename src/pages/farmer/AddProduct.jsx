import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Tractor,
  User,
  Bell,
  Settings,
  ArrowLeft,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Tag,
  Leaf,
  Upload,
  Plus
} from 'lucide-react';

export default function AddProduct() {
  const [notifications] = useState(3);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    harvestDate: '',
    location: '',
    quantity: '',
    price: '',
    description: '',
    certifications: []
  });
  const [image, setImage] = useState(null);

  const certificationOptions = [
    'Organic',
    'Non-GMO',
    'Fair Trade',
    'Rainforest Alliance',
    'USDA Organic'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleCertificationToggle = (cert) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
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
                Add New Product
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
            to="/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Image Upload */}
              <div className="space-y-6">
                <div className="relative group">
                  <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50/50 overflow-hidden">
                    {image ? (
                      <img src={image} alt="Product" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-6">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-600">
                              Upload product image
                            </span>
                            <span className="mt-1 block text-xs text-gray-500">
                              PNG, JPG up to 10MB
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications</h3>
                  <div className="space-y-2">
                    {certificationOptions.map((cert) => (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => handleCertificationToggle(cert)}
                        className={`flex items-center px-4 py-2 rounded-lg w-full transition-colors ${
                          formData.certifications.includes(cert)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Leaf className="w-4 h-4 mr-2" />
                        {cert}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({...formData, productName: e.target.value})}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
                    >
                      <option value="">Select category</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="grains">Grains</option>
                      <option value="herbs">Herbs</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Harvest Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.harvestDate}
                        onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
                        placeholder="Farm location"
                      />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity (kg)
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per kg ($)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
                        placeholder="Enter price"
                      />
                      <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Link
                    to="/dashboard"
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 