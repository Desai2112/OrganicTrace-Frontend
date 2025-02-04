import React from 'react';
import { 
  Leaf, 
  Search, 
  Shield, 
  Factory,
  BarChart3,
  ArrowRight,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {

    const navigate = useNavigate(); // Initialize navigate
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Traceability",
      description: "Track organic products from farm to table with blockchain technology",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Certification",
      description: "Automated compliance and certification management system",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Factory className="w-6 h-6" />,
      title: "Supply Chain",
      description: "Real-time monitoring of your entire supply network",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Hub",
      description: "Comprehensive insights and predictive analytics",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { value: "2.5M+", label: "Products Traced" },
    { value: "98%", label: "Compliance Rate" },
    { value: "12K+", label: "Active Users" },
    { value: "50+", label: "Countries" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Glassmorphic Header */}
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                OrganicTrace
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Solutions</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <button className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all" onClick={() => navigate('/login')}>
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Overlapping Elements */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-30"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-200 rounded-full filter blur-3xl opacity-30"></div>
              <h1 className="text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Trace Organic Products
                </span>
                <br />
                with Confidence
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your organic supply chain with our advanced traceability platform. Ensure compliance, build trust, and grow your business.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-green-200 text-gray-700 rounded-xl hover:border-green-300 transition-all">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-300 rounded-3xl transform rotate-3 blur-2xl opacity-30"></div>
              <img 
                src="/api/placeholder/800/600" 
                alt="Platform Interface" 
                className="relative rounded-2xl shadow-2xl border-8 border-white transform hover:-rotate-2 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 transform group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards with Gradient Borders */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for complete supply chain visibility</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-50 blur group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    {React.cloneElement(feature.icon, { className: "w-7 h-7 text-white" })}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section with Testimonial */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Trusted by Leading Brands</h2>
                <p className="text-gray-600 mb-8">
                  Join thousands of companies using OrganicTrace to ensure product quality and build consumer trust.
                </p>
                <div className="space-y-4">
                  {['Real-time Updates', 'Blockchain Security', 'API Integration'].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Dashboard" 
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-20"></div>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Transform your supply chain today with complete visibility and traceability
            </p>
            <button className="px-8 py-4 bg-white text-green-600 rounded-xl hover:shadow-lg transition-shadow font-semibold text-lg">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" />
              <span className="font-medium">OrganicTrace</span>
            </div>
            <div className="flex gap-8 text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 OrganicTrace. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}