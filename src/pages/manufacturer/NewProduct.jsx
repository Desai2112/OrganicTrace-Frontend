import React, { useState } from "react";
import { Package, Plus, Upload, X, Check, AlertCircle } from "lucide-react";

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    ingredients: "",
    certifications: [],
    batchSize: "",
    productionTime: "",
    shelfLife: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const certificationOptions = [
    "Organic",
    "Non-GMO",
    "Fair Trade",
    "Vegan",
    "Gluten-Free",
    "Kosher",
  ];

  const handleCertificationToggle = (cert) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-green-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Create New Product
            </h1>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Product
          </button>
        </div>

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Details Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Product Details
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="produce">Produce</option>
                    <option value="dairy">Dairy</option>
                    <option value="grains">Grains</option>
                    <option value="processed">Processed Foods</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredients
                </label>
                <textarea
                  value={formData.ingredients}
                  onChange={(e) =>
                    setFormData({ ...formData, ingredients: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter ingredients list"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch Size
                  </label>
                  <input
                    type="text"
                    value={formData.batchSize}
                    onChange={(e) =>
                      setFormData({ ...formData, batchSize: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 1000 units"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Production Time
                  </label>
                  <input
                    type="text"
                    value={formData.productionTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productionTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 2 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shelf Life
                  </label>
                  <input
                    type="text"
                    value={formData.shelfLife}
                    onChange={(e) =>
                      setFormData({ ...formData, shelfLife: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 6 months"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Image
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="max-w-full h-auto rounded"
                    />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click or drag to upload image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Certifications
              </h3>
              <div className="space-y-2">
                {certificationOptions.map((cert) => (
                  <button
                    key={cert}
                    onClick={() => handleCertificationToggle(cert)}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-lg border ${
                      formData.certifications.includes(cert)
                        ? "bg-green-50 border-green-500 text-green-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span>{cert}</span>
                    {formData.certifications.includes(cert) ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Guidelines
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <p className="ml-3 text-sm text-gray-600">
                    Ensure all product details are accurate and complete
                  </p>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <p className="ml-3 text-sm text-gray-600">
                    Upload high-quality product images
                  </p>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <p className="ml-3 text-sm text-gray-600">
                    Verify certification requirements before selection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
