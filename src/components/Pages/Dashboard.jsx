import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../../assets/logo.png";
import {
  FiHome,
  FiFileText,
  FiUser,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiBarChart2,
  FiPieChart,
  FiCalendar,
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiEye,
  FiCreditCard,
  FiMenu,
  FiLogOut,
  FiSettings,
  FiChevronRight,
  FiDownload,
  FiBell,
  FiHelpCircle
} from 'react-icons/fi';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    summary: {},
    recentBills: [],
    charts: {
      monthlyExpenses: [],
      categoryDistribution: [],
      paymentTrends: []
    }
  });
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    joinDate: ''
  });
  
  // Bills state
  const [myBills, setMyBills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Chart data
  const monthlyData = [
    { month: 'Jan', amount: 4200 },
    { month: 'Feb', amount: 3800 },
    { month: 'Mar', amount: 5100 },
    { month: 'Apr', amount: 4900 },
    { month: 'May', amount: 5500 },
    { month: 'Jun', amount: 4800 }
  ];
  
  const categoryData = [
    { name: 'Electricity', value: 35, color: '#3B82F6' },
    { name: 'Gas', value: 25, color: '#EF4444' },
    { name: 'Internet', value: 20, color: '#8B5CF6' },
    { name: 'Water', value: 15, color: '#06B6D4' },
    { name: 'Others', value: 5, color: '#F59E0B' }
  ];
  
  const paymentStatusData = [
    { name: 'Paid', value: 65, color: '#10B981' },
    { name: 'Unpaid', value: 25, color: '#EF4444' },
    { name: 'Pending', value: 10, color: '#F59E0B' }
  ];

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user's bills
        const billsRes = await fetch(`https://bill-management-db-api.vercel.app/bills`);
        const billsData = await billsRes.json();
        
        // Fetch user's payment history
        const paymentsRes = await fetch(`https://bill-management-db-api.vercel.app/payBill/user/${user.email}`);
        const paymentsData = await paymentsRes.json();
        
        // Calculate summary
        const totalBills = billsData.length;
        const paidBills = paymentsData.length;
        const unpaidBills = totalBills - paidBills;
        const totalAmount = billsData.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
        
        // Prepare recent bills (last 5)
        const recentBills = billsData
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        
        setDashboardData({
          summary: {
            totalBills,
            paidBills,
            unpaidBills,
            totalAmount
          },
          recentBills,
          charts: {
            monthlyExpenses: monthlyData,
            categoryDistribution: categoryData,
            paymentTrends: paymentStatusData
          }
        });
        
        setMyBills(billsData);
        
        // Set profile data
        if (user) {
          const userRes = await fetch(`https://bill-management-db-api.vercel.app/users/${user.email}`);
          const userData = await userRes.json();
          
          setProfileData({
            name: userData.name || user.displayName || 'User',
            email: user.email,
            phone: userData.phone || '',
            address: userData.address || '',
            joinDate: userData.createdAt || new Date().toISOString().split('T')[0]
          });
        }
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchDashboardData();
    }
  }, [user]);
  
  // Handle bill actions
  const handleViewBill = (bill) => {
    navigate('/details', { state: { bill } });
  };
  
  const handlePayBill = (bill) => {
    navigate('/allBills', { state: { bill } });
  };
  
  const handleDeleteBill = async (billId) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      try {
        const res = await fetch(`https://bill-management-db-api.vercel.app/bills/${billId}`, {
          method: 'DELETE'
        });
        
        if (res.ok) {
          toast.success('Bill deleted successfully');
          setMyBills(myBills.filter(bill => bill._id !== billId));
        }
      } catch (error) {
        toast.error('Failed to delete bill');
      }
    }
  };
  
  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://bill-management-db-api.vercel.app/users/${user.email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      
      if (res.ok) {
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };
  
  // Filter bills based on search and filters
  const filteredBills = myBills.filter(bill => {
    const matchesSearch = bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bill.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'paid' && bill.paid) ||
                         (filterStatus === 'unpaid' && !bill.paid);
    const matchesCategory = filterCategory === 'all' || bill.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Summary cards data
  const summaryCards = [
    {
      title: 'Total Bills',
      value: dashboardData.summary.totalBills || 0,
      icon: <FiFileText className="text-2xl" />,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Paid Bills',
      value: dashboardData.summary.paidBills || 0,
      icon: <FiCheckCircle className="text-2xl" />,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      title: 'Unpaid Bills',
      value: dashboardData.summary.unpaidBills || 0,
      icon: <FiXCircle className="text-2xl" />,
      color: 'bg-red-500',
      trend: '-5%'
    },
    {
      title: 'Total Amount',
      value: `৳${dashboardData.summary.totalAmount?.toLocaleString() || '0'}`,
      icon: <FiDollarSign className="text-2xl" />,
      color: 'bg-purple-500',
      trend: '+15%'
    }
  ];
  
  // Menu items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <FiHome /> },
    { id: 'myBills', label: 'My Bills', icon: <FiFileText /> },
    { id: 'profile', label: 'Profile', icon: <FiUser /> }
  ];
  
  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 shadow animate-pulse">
          <div className="flex items-center justify-between p-4">
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow animate-pulse">
                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow animate-pulse">
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow animate-pulse">
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Title */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 dark:text-gray-300"
              >
                <FiMenu className="text-2xl" />
              </button>




              
          <div className="items-center ">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Bill Pie Logo"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-100 dark:bg-gray-700 p-1 border-2 border-amber-700 dark:border-amber-500 "
              />
              <span className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                Bill <span className="text-amber-800 dark:text-amber-400">Pie</span>
              </span>
            </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 ml-12">
                    Dashboard
                  </p>            
          </div>
            </div>
            
            {/* Right side - User profile */}
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <FiBell className="text-xl" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="relative group">
                <div className="flex items-center space-x-3 cursor-pointer">
                  
                  <img
                    src={user.photoURL || "https://via.placeholder.com/150"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-amber-600 dark:border-amber-500 "
                    referrerPolicy="no-referrer"
                  />
                   
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {profileData.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {profileData.email}
                    </p>
                  </div>
                  <FiChevronRight className="text-gray-400 transform group-hover:rotate-90 transition-transform" />
                </div>
                
                {/* Profile Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <a href="profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FiUser className="inline mr-2" />
                      Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FiSettings className="inline mr-2" />
                      Settings
                    </a>
                    <a href="help" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FiHelpCircle className="inline mr-2" />
                      Help & Support
                    </a>
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-xl lg:shadow-none
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 z-40
          w-64
        `}>
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Navigation
              </h2>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                      ${activeTab === item.id 
                        ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    {activeTab === item.id && (
                      <FiChevronRight className="ml-auto" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Paid Bills</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {dashboardData.summary.paidBills}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Due Bills</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    {dashboardData.summary.unpaidBills}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Overview Tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Welcome Message */}
                <div className="bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {profileData.name}!
                  </h2>
                  <p className="text-amber-100">
                    Here's what's happening with your bills today.
                  </p>
                </div>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {summaryCards.map((card, index) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${card.color} text-white`}>
                          {card.icon}
                        </div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {card.trend}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {card.value}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {card.title}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Monthly Expenses Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Monthly Expenses
                      </h3>
                      <button className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                        <FiDownload className="mr-1" />
                        Export
                      </button>
                    </div>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="month" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="amount" 
                            stroke="#F59E0B" 
                            fill="url(#colorUv)" 
                            strokeWidth={2}
                          />
                          <defs>
                            <linearlinear id="colorUv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                            </linearlinear>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Category Distribution */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                      Category Distribution
                    </h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Recent Bills
                      </h3>
                      <button 
                        onClick={() => setActiveTab('myBills')}
                        className="text-sm text-amber-600 dark:text-amber-400 flex items-center"
                      >
                        View All
                        <FiChevronRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Bill Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {dashboardData.recentBills.map((bill) => (
                          <tr key={bill._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {bill.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-gray-900 dark:text-white">
                                ৳{bill.amount}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                bill.category === 'Electricity' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                bill.category === 'Gas' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                bill.category === 'Internet' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                                'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300'
                              }`}>
                                {bill.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                bill.paid 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                              }`}>
                                {bill.paid ? 'Paid' : 'Unpaid'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {new Date(bill.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewBill(bill)}
                                  className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                                  title="View"
                                >
                                  <FiEye />
                                </button>
                                <button
                                  onClick={() => handlePayBill(bill)}
                                  className="p-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded"
                                  title="Pay"
                                >
                                  <FiCreditCard />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* My Bills Tab */}
            {activeTab === 'myBills' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      My Bills
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Manage all your utility bills in one place
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate('/allBills')}
                    className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    + Add New Bill
                  </button>
                </div>
                
                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Search Bills
                      </label>
                      <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by title or category..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      >
                        <option value="all">All Categories</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Gas">Gas</option>
                        <option value="Internet">Internet</option>
                        <option value="Water">Water</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        &nbsp;
                      </label>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setFilterStatus('all');
                          setFilterCategory('all');
                        }}
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Bills Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Bill Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredBills.length > 0 ? (
                          filteredBills.map((bill) => (
                            <tr key={bill._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-6 py-4">
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {bill.title}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {bill.location}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  bill.category === 'Electricity' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                  bill.category === 'Gas' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                  bill.category === 'Internet' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                                  'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300'
                                }`}>
                                  {bill.category}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-bold text-gray-900 dark:text-white">
                                  ৳{bill.amount}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  bill.paid 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                }`}>
                                  {bill.paid ? 'Paid' : 'Unpaid'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {new Date(bill.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleViewBill(bill)}
                                    className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                                    title="View"
                                  >
                                    <FiEye />
                                  </button>
                                  <button
                                    onClick={() => handlePayBill(bill)}
                                    className="p-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded"
                                    title="Pay"
                                  >
                                    <FiCreditCard />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBill(bill._id)}
                                    className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                                    title="Delete"
                                  >
                                    <FiTrash2 />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-6 py-12 text-center">
                              <div className="text-gray-500 dark:text-gray-400">
                                <FiFileText className="mx-auto text-4xl mb-4 text-gray-300" />
                                <p className="text-lg font-medium mb-2">No bills found</p>
                                <p className="text-sm">Try adjusting your search or filters</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    My Profile
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your account information and preferences
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Information */}
                  <div className="lg:col-span-2">
                    <form onSubmit={handleProfileUpdate} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={profileData.email}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            placeholder="01XXXXXXXXX"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Address
                          </label>
                          <input
                            type="text"
                            value={profileData.address}
                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            placeholder="Your complete address"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Account Created
                        </label>
                        <input
                          type="text"
                          value={new Date(profileData.joinDate).toLocaleDateString()}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          type="button"
                          onClick={() => setProfileData({
                            name: user.displayName || 'User',
                            email: user.email,
                            phone: '',
                            address: '',
                            joinDate: profileData.joinDate
                          })}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-shadow"
                        >
                          Update Profile
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Profile Stats */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                      <div className="flex flex-col items-center">
                        <div className="h-32 w-32   rounded-full flex items-center justify-center mb-4">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/150"}
                    alt={user.displayName || "User"}
                    className="w-30 h-30 rounded-full border-2 border-amber-600 dark:border-amber-500 "
                    referrerPolicy="no-referrer"
                  />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {profileData.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {profileData.email}
                        </p>
                        <div className="text-center text-sm">
                          <p className="text-gray-500 dark:text-gray-400">
                            Member since {new Date(profileData.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Account Stats
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Total Bills</span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {dashboardData.summary.totalBills}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Paid Bills</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {dashboardData.summary.paidBills}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Due Bills</span>
                          <span className="font-bold text-red-600 dark:text-red-400">
                            {dashboardData.summary.unpaidBills}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                          <span className="font-bold text-gray-900 dark:text-white">Total Spent</span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">
                            ৳{dashboardData.summary.totalAmount?.toLocaleString() || '0'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      
      {/* Mobile bottom navigation for small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around py-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 ${
                activeTab === item.id 
                  ? 'text-amber-500' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;