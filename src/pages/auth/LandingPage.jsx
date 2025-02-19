import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Leaf, 
  BarChart3, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Globe,
  Building2,
  ChevronRight,
  Box,
  Zap,
  Activity
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      title: "Secure Certification",
      description: "Blockchain-powered certification system ensuring tamper-proof records and complete transparency."
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: "Organic Tracking",
      description: "End-to-end tracking of organic products from farm to table with real-time updates."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: "Analytics & Insights",
      description: "Comprehensive analytics dashboard for monitoring compliance and performance metrics."
    },
    {
      icon: <Globe className="w-6 h-6 text-green-500" />,
      title: "Global Standards",
      description: "Adherence to international organic certification standards and compliance requirements."
    }
  ];

  const stats = [
    { value: '100+', label: 'Certified Entities' },
    { value: '50K+', label: 'Products Tracked' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ];

  const benefits = [
    {
      icon: <Activity className="w-5 h-5" />,
      text: "Real-time certification tracking"
    },
    {
      icon: <Box className="w-5 h-5" />,
      text: "Automated compliance monitoring"
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      text: "Secure document management"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Instant verification system"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: "Supply chain transparency"
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      text: "Environmental impact tracking"
    }
  ];

  const roles = [
    {
      icon: <Building2 className="w-8 h-8 text-green-600" />,
      title: "Certifying Agencies",
      description: "Manage and issue organic certifications with blockchain-backed security.",
      link: "/register?role=certifier"
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Farmers",
      description: "Track and manage organic certification for your agricultural products.",
      link: "/register?role=farmer"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Manufacturers",
      description: "Ensure compliance and traceability in organic product manufacturing.",
      link: "/register?role=manufacturer"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header/Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 fixed w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg transform hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-4 text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                OrganicChain
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-green-600 transition-colors">Benefits</a>
              <a href="#roles" className="text-gray-600 hover:text-green-600 transition-colors">Solutions</a>
              <Link to="/login" className="text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-200/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Blockchain-Powered
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Organic Certification
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Secure, transparent, and efficient organic certification management system 
              for the entire supply chain.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/register" 
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Start Certification
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-50 transition-all border-2 border-green-600 transform hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Organic Certification
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage and track organic certifications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300 transform hover:-translate-y-1"
              >
                <div className="bg-green-50 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Benefits of Using OrganicChain
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 bg-white/80 backdrop-blur-md p-4 rounded-lg border border-green-100 hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="bg-green-50 rounded-lg p-2">
                      {benefit.icon}
                    </div>
                    <span className="text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {roles.map((role, index) => (
                <Link 
                  key={index}
                  to={role.link}
                  className="group bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-green-100 hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-50 rounded-lg p-3 group-hover:bg-green-100 transition-colors">
                      {role.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                        {role.title}
                        <ChevronRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-gray-600">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Transform Your Organic Certification Process?
          </h2>
          <Link 
            to="/register" 
            className="group bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-50 transition-all transform hover:scale-105 inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-green-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  OrganicChain
                </span>
              </div>
              <p className="mt-4 text-gray-600">
                Secure and transparent organic certification management powered by blockchain.
              </p>
            </div>
            {['Solutions', 'Company', 'Legal'].map((section, index) => (
              <div key={index}>
                <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">{section}</h4>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 hover:text-green-600 transition-colors inline-flex items-center group">
                        <span>Link {item}</span>
                        <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-green-100 text-center text-gray-600">
            <p>&copy; 2024 OrganicChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}