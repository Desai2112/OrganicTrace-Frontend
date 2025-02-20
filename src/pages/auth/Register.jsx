import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "farmer",
    company: {
      name: "",
      address: "",
      contact: "",
      registrationNumber: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }
      setError("");
      setStep(2);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      if (response.data.success) {
        navigate(`/${formData.role}/dashboard`);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const renderStepIndicator = () => (
    <motion.div
      className="flex items-center justify-center mb-8"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="flex items-center">
        <motion.div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 1
              ? "bg-green-500 text-white"
              : "bg-green-100 text-green-500"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          1
        </motion.div>
        <motion.div
          className={`h-1 w-16 mx-2 ${
            step === 2 ? "bg-green-500" : "bg-green-100"
          }`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 2
              ? "bg-green-500 text-white"
              : "bg-green-100 text-green-500"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          2
        </motion.div>
      </div>
    </motion.div>
  );

  const renderStep1 = () => (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          I am a...
        </label>
        <select
          id="role"
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          {Object.entries({
            farmer: "Farmer",
            manufacturer: "Manufacturer",
            distributor: "Distributor",
            certifier: "Certifier",
          }).map(([value, label]) => (
            <option key={value} value={value} className="py-2">
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          required
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
          placeholder="Enter company name"
          value={formData.company.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              company: { ...formData.company, name: e.target.value },
            })
          }
        />
      </div>

      <div>
        <label
          htmlFor="companyAddress"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Address
        </label>
        <input
          id="companyAddress"
          type="text"
          required
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
          placeholder="Enter company address"
          value={formData.company.address}
          onChange={(e) =>
            setFormData({
              ...formData,
              company: { ...formData.company, address: e.target.value },
            })
          }
        />
      </div>

      <div>
        <label
          htmlFor="companyContact"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Contact Number
        </label>
        <input
          id="companyContact"
          type="tel"
          required
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
          placeholder="Enter contact number"
          value={formData.company.contact}
          onChange={(e) =>
            setFormData({
              ...formData,
              company: { ...formData.company, contact: e.target.value },
            })
          }
        />
      </div>

      <div>
        <label
          htmlFor="registrationNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Registration Number
        </label>
        <input
          id="registrationNumber"
          type="text"
          required
          className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
          placeholder="Enter registration number"
          value={formData.company.registrationNumber}
          onChange={(e) =>
            setFormData({
              ...formData,
              company: {
                ...formData.company,
                registrationNumber: e.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
      <motion.div
        className="max-w-5xl w-full m-4 bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl flex overflow-hidden border border-white/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-500 to-emerald-500 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          <motion.div
            className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.7, 0.5, 0.7],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="relative text-white text-center z-10"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-4xl font-bold mb-6">
              {step === 1 ? "Join Our Platform" : "Company Details"}
            </h1>
            <p className="text-lg opacity-90 leading-relaxed">
              {step === 1
                ? "Be part of the organic food traceability revolution."
                : "Tell us about your organization."}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="w-full lg:w-1/2 p-8 md:p-12"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {step === 1 ? "Create Account" : "Company Information"}
            </h2>
            <p className="text-gray-600 mt-2">
              {step === 1
                ? "Start your journey with us"
                : "Tell us about your business"}
            </p>
          </div>

          {renderStepIndicator()}

          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {step === 1 ? renderStep1() : renderStep2()}

            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {step === 2 && (
                <motion.button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border border-green-500 text-sm font-medium rounded-xl text-green-500 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
              )}
              <motion.button
                type="submit"
                className="flex-1 group relative py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {step === 1 ? "Next" : "Create Account"}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500 transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
