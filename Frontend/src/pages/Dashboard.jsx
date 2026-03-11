import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Users, Calendar, Briefcase, Handshake, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Alumni', value: '5,234', icon: Users, trend: '↗', trendIcon: TrendingUp, color: 'text-blue-600' },
    { label: 'Active Events', value: '12', icon: Calendar, trend: '↗', trendIcon: TrendingUp, color: 'text-orange-600' },
    { label: 'Job Openings', value: '48', icon: Briefcase, trend: '↗', trendIcon: TrendingUp, color: 'text-teal-600' },
    { label: 'Mentorships', value: '156', icon: Handshake, trend: '↗', trendIcon: TrendingUp, color: 'text-purple-600' }
  ];

  const quickAccess = [
    {
      title: 'Alumni Directory',
      description: 'Browse alumni profiles',
      icon: Users,
      path: '/alumni',
      color: 'text-blue-600'
    },
    {
      title: 'Upcoming Events',
      description: 'View & register for events',
      icon: Calendar,
      path: '/events',
      color: 'text-blue-600'
    },
    {
      title: 'Job Portal',
      description: 'Find job opportunities',
      icon: Briefcase,
      path: '/jobs',
      color: 'text-blue-600'
    }
  ];

  const recentActivity = [
    { text: 'Rahul Sharma posted a new job at Google', time: '2 hours ago' },
    { text: 'Annual Alumni Meet 2026 event created', time: '1 day ago' },
    { text: 'Priya Singh requested mentorship', time: '2 days ago' },
    { text: 'New batch 2025 students registered', time: '3 days ago' }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 md:p-8 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="opacity-80 mt-1">
                {user?.department || 'Department'} • {user?.role === 'alumni' ? `Alumni${user?.batch ? ` • Batch ${user.batch}` : ''}` : user?.role === 'student' ? `Student${user?.batch ? ` • Batch ${user.batch}` : ''}` : user?.role || 'Member'}
              </p>
            </div>
          </div>
        </motion.div>
        {/* Stats Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <stat.trendIcon className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Quick Access */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Quick Access</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {quickAccess.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="flex items-center gap-1 text-blue-600 text-sm mt-3 group-hover:gap-2 transition-all">
                    View <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-gray-800">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
