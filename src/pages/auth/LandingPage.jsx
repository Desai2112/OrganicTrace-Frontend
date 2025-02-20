import React from "react";
import { Link } from "react-router-dom";
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
  Activity,
  FileText,
  TrendingUp,
  Truck,
  Scale,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      title: "Secure Certification",
      description:
        "Blockchain-powered certification system ensuring tamper-proof records and complete transparency.",
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: "Organic Tracking",
      description:
        "End-to-end tracking of organic products from farm to table with real-time updates.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: "Analytics & Insights",
      description:
        "Comprehensive analytics dashboard for monitoring compliance and performance metrics.",
    },
    {
      icon: <Globe className="w-6 h-6 text-green-500" />,
      title: "Global Standards",
      description:
        "Adherence to international organic certification standards and compliance requirements.",
    },
  ];

  const benefits = [
    {
      icon: <Activity className="w-5 h-5" />,
      text: "Real-time certification tracking",
    },
    {
      icon: <Box className="w-5 h-5" />,
      text: "Automated compliance monitoring",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      text: "Secure document management",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Instant verification system",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: "Supply chain transparency",
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      text: "Environmental impact tracking",
    },
  ];

  const solutions = [
    {
      icon: <Building2 className="w-12 h-12 text-green-600" />,
      title: "For Certifying Agencies",
      description:
        "Streamline certification processes, manage audits, and ensure compliance with our comprehensive platform.",
      features: [
        "Automated certification workflow",
        "Compliance monitoring",
        "Analytics dashboard",
      ],
      link: "/register?role=certifier",
    },
    {
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      title: "For Farmers",
      description:
        "Easily manage organic certifications, track products, and maintain compliance records.",
      features: [
        "Product tracking",
        "Certification management",
        "Compliance tools",
      ],
      link: "/register?role=farmer",
    },
    {
      icon: <Truck className="w-12 h-12 text-green-600" />,
      title: "For Distributors",
      description:
        "Track and verify organic products throughout the supply chain with blockchain technology.",
      features: [
        "Supply chain tracking",
        "Verification system",
        "Distribution management",
      ],
      link: "/register?role=distributor",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header/Navigation */}
      <motion.header
        className="bg-white/80 backdrop-blur-md border-b border-green-100 fixed w-full z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
              <a
                href="#features"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#solutions"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Solutions
              </a>
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
              >
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
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              Secure Organic Certification
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Powered by Blockchain
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Transform your organic certification process with transparent,
              tamper-proof blockchain technology.
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4"
              variants={fadeInUp}
            >
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-50 transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Organic Certification
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage and track organic certifications
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="bg-green-50 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Benefits List */}
            <motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Why Choose OrganicChain?
              </h2>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 bg-white/80 backdrop-blur-md p-4 rounded-lg border border-green-100 hover:border-green-300 mb-4"
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className="bg-green-50 rounded-lg p-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <span className="text-gray-700">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Image/Illustration */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/organic-farming.jpg"
                alt="Organic Farming"
                className="rounded-2xl shadow-2xl"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-sm font-medium">Certified Organic</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section
        id="solutions"
        className="py-20 bg-gradient-to-br from-green-50 to-emerald-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Solutions for Every Stakeholder
            </h2>
            <p className="text-xl text-gray-600">
              Tailored solutions for different parts of the organic supply chain
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Link
                key={index}
                to={solution.link}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-green-50 rounded-xl p-4 w-20 h-20 flex items-center justify-center mb-6">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-3 mb-6">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-green-600 group-hover:text-green-700">
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Transform Your Organic Certification Process?
          </h2>
          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-50 transition-all inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-green-100">
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
                Secure and transparent organic certification management powered
                by blockchain.
              </p>
            </div>
            {["Solutions", "Company", "Legal"].map((section, index) => (
              <div key={index}>
                <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                  {section}
                </h4>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-green-600 transition-colors inline-flex items-center group"
                      >
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
