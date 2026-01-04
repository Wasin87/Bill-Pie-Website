import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import { 
  PieChart, 
  Bell, 
  Shield, 
  BarChart, 
  Smartphone, 
  Cloud, 
  Zap, 
  Users, 
  FileText, 
  CreditCard, 
  CheckCircle,
  Globe,
  Lock
} from 'lucide-react';

const Features = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const featureCategories = [
    { id: 'all', label: 'All Features' },
    { id: 'tracking', label: 'Bill Tracking' },
    { id: 'automation', label: 'Automation' },
    { id: 'security', label: 'Security' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'collaboration', label: 'Collaboration' }
  ];
  
  const features = [
    {
      id: 1,
      category: 'tracking',
      icon: <PieChart className="w-8 h-8" />,
      title: 'Smart Bill Organization',
      description: 'Automatically categorize and organize bills with AI-powered sorting. Never miss a due date with intelligent reminders.',
      color: 'from-blue-500 to-cyan-400 dark:from-blue-600 dark:to-cyan-500',
      details: [
        'Automatic bill categorization',
        'Custom payment reminders',
        'Due date tracking calendar',
        'Recurring bill management'
      ]
    },
    {
      id: 2,
      category: 'automation',
      icon: <Zap className="w-8 h-8" />,
      title: 'Auto-Pay Scheduling',
      description: 'Set up automatic payments for recurring bills. Schedule payments in advance and avoid late fees.',
      color: 'from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600',
      details: [
        'One-time & recurring auto-pay',
        'Flexible payment scheduling',
        'Payment confirmation alerts',
        'Failed payment recovery'
      ]
    },
    {
      id: 3,
      category: 'analytics',
      icon: <BarChart className="w-8 h-8" />,
      title: 'Expense Analytics',
      description: 'Visualize your spending patterns with interactive charts and detailed financial reports.',
      color: 'from-green-500 to-emerald-400 dark:from-green-600 dark:to-emerald-500',
      details: [
        'Monthly spending breakdown',
        'Year-over-year comparisons',
        'Budget vs actual analysis',
        'Custom report generation'
      ]
    },
    {
      id: 4,
      category: 'security',
      icon: <Shield className="w-8 h-8" />,
      title: 'Bank-Level Security',
      description: 'Your financial data is protected with military-grade encryption and multi-factor authentication.',
      color: 'from-red-500 to-orange-400 dark:from-red-600 dark:to-orange-500',
      details: [
        '256-bit SSL encryption',
        'Biometric authentication',
        'Secure cloud backup',
        'Privacy-focused design'
      ]
    },
    {
      id: 5,
      category: 'collaboration',
      icon: <Users className="w-8 h-8" />,
      title: 'Multi-User Accounts',
      description: 'Share bill management with family or roommates. Set permissions and track contributions.',
      color: 'from-indigo-500 to-blue-400 dark:from-indigo-600 dark:to-blue-500',
      details: [
        'Shared household accounts',
        'Individual permission levels',
        'Expense splitting',
        'Contribution tracking'
      ]
    },
    {
      id: 6,
      category: 'automation',
      icon: <FileText className="w-8 h-8" />,
      title: 'Digital Receipts',
      description: 'Store and organize digital receipts. Extract data automatically for expense tracking.',
      color: 'from-amber-500 to-yellow-400 dark:from-amber-600 dark:to-yellow-500',
      details: [
        'Receipt scanning via camera',
        'Automatic data extraction',
        'Digital receipt storage',
        'Tax-ready expense reports'
      ]
    },
    {
      id: 7,
      category: 'tracking',
      icon: <Bell className="w-8 h-8" />,
      title: 'Smart Notifications',
      description: 'Receive intelligent alerts about upcoming bills, payment confirmations, and unusual spending.',
      color: 'from-pink-500 to-rose-400 dark:from-pink-600 dark:to-rose-500',
      details: [
        'Customizable notification rules',
        'Email & mobile push alerts',
        'Spending limit warnings',
        'Bill payment confirmations'
      ]
    },
    {
      id: 8,
      category: 'analytics',
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Payment Method Management',
      description: 'Store and manage all payment methods securely. Track which cards are used for specific bills.',
      color: 'from-teal-500 to-cyan-400 dark:from-teal-600 dark:to-cyan-500',
      details: [
        'Secure payment method storage',
        'Card expiry reminders',
        'Payment method analytics',
        'Auto-pay method selection'
      ]
    },
    {
      id: 9,
      category: 'security',
      icon: <Lock className="w-8 h-8" />,
      title: 'Privacy Controls',
      description: 'Full control over your data with granular privacy settings and data export options.',
      color: 'from-gray-700 to-gray-900 dark:from-gray-800 dark:to-gray-900',
      details: [
        'Data export in multiple formats',
        'Selective data sharing',
        'Automatic data anonymization',
        'GDPR & CCPA compliance'
      ]
    },
    {
      id: 10,
      category: 'collaboration',
      icon: <Globe className="w-8 h-8" />,
      title: 'Multi-Currency Support',
      description: 'Manage bills in multiple currencies with automatic conversion and exchange rate tracking.',
      color: 'from-violet-500 to-purple-400 dark:from-violet-600 dark:to-purple-500',
      details: [
        '130+ currency support',
        'Real-time exchange rates',
        'Automatic currency conversion',
        'Multi-currency reporting'
      ]
    },
    {
      id: 11,
      category: 'automation',
      icon: <Cloud className="w-8 h-8" />,
      title: 'Cloud Sync',
      description: 'Access your bills from any device. Real-time sync across web, mobile, and tablet.',
      color: 'from-sky-500 to-blue-400 dark:from-sky-600 dark:to-blue-500',
      details: [
        'Real-time cross-device sync',
        'Offline bill viewing',
        'Automatic backup',
        'Unlimited cloud storage'
      ]
    },
    {
      id: 12,
      category: 'tracking',
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile App',
      description: 'Full-featured mobile apps for iOS and Android. Manage bills on the go with ease.',
      color: 'from-orange-500 to-amber-400 dark:from-orange-600 dark:to-amber-500',
      details: [
        'Native iOS and Android apps',
        'Mobile bill scanning',
        'Fingerprint/Face ID login',
        'Mobile payment processing'
      ]
    }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeCategory);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            
                            <img
                              src={logo}
                              alt="Bill Pie Logo"
                              className="w-20 h-20 md:w-20 md:h-20 rounded-full bg-amber-100 dark:bg-gray-700 p-1 border-2 border-amber-700 dark:border-amber-500 "
                            />
             
              <span className="text-2xl  font-bold text-gray-900 dark:text-white whitespace-nowrap ml-2">
                Bill <span className="text-amber-800 dark:text-amber-400 ">Pie</span>
              </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Smart Bill Management Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to organize, track, and pay bills effortlessly. 
            Bill Pie combines powerful automation with intuitive design to simplify your financial life.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {featureCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id 
                  ? 'bg-linear-to-r from-amber-600 to-yellow-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredFeatures.map(feature => (
            <div 
              key={feature.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className={`h-2 bg-linear-to-r ${feature.color}`}></div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className={`p-3 rounded-xl bg-linear-to-br ${feature.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{feature.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mt-4">
                  {feature.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 " />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-linear-to-r from-amber-600 to-amber-400 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Why Choose Bill Pie?</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Join thousands of users who have simplified their bill management with our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-gray-100">User Satisfaction</div>
              <p className="text-sm text-gray-700 mt-2">Based on customer feedback</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-gray-100">Active Users</div>
              <p className="text-sm text-gray-700 mt-2">Managing bills worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">$10M+</div>
              <div className="text-gray-100">Bills Managed Monthly</div>
              <p className="text-sm text-gray-700 mt-2">Across all user accounts</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Simplify Your Bill Management?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Start your free 30-day trial. No credit card required. Cancel anytime.
          </p>
 
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
            All features included in trial • No setup fees • 24/7 support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;