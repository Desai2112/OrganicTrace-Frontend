import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Store, Truck, Factory, Tractor, User } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'farmer' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const roleIcons = {
    farmer: <Tractor className="w-5 h-5" />,
    manufacturer: <Factory className="w-5 h-5" />,
    distributor: <Truck className="w-5 h-5" />,
    retailer: <Store className="w-5 h-5" />,
    consumer: <User className="w-5 h-5" />
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
      <div className="max-w-5xl w-full m-4 bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl flex overflow-hidden border border-white/20">
        {/* Left Section with Image */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-500 to-emerald-500 items-center justify-center p-12 relative">
          {/* Add decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32 blur-3xl" />
          
          <div className="relative text-white text-center z-10">
            <h1 className="text-4xl font-bold mb-6">Join Our Platform</h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Be part of the organic food traceability revolution.
            </p>
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">Start your journey with us</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  I am a...
                </label>
                <select
                  id="role"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-300"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  {Object.entries({
                    farmer: 'Farmer',
                    manufacturer: 'Manufacturer',
                    distributor: 'Distributor',
                    retailer: 'Retailer',
                    consumer: 'Consumer'
                  }).map(([value, label]) => (
                    <option key={value} value={value} className="py-2">
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              Create Account
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}