import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Users, Calendar, Briefcase, Handshake, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ alumniCount: 0, eventsCount: 0, jobsCount: 0, mentorCount: 0 });

  useEffect(() => {
    api.get('/users/stats').then(({ data }) => setCounts(data)).catch(() => {});
  }, []);

  const stats = [
    { label: 'Total Alumni', value: counts.alumniCount, icon: Users, color: 'text-blue-600', trend: '+12%' },
    { label: 'Active Events', value: counts.eventsCount, icon: Calendar, color: 'text-orange-600', trend: '+12%' },
    { label: 'Job Openings', value: counts.jobsCount, icon: Briefcase, color: 'text-teal-600', trend: '+12%' },
    { label: 'Mentorships', value: counts.mentorCount, icon: Handshake, color: 'text-purple-600', trend: '+12%' },
  ];

  const quickAccess = user?.role === 'alumni' ? [
    { title: 'Mentorship Requests', description: 'Guide fellow students', icon: Handshake, path: '/mentorship', color: 'text-purple-600' },
    { title: 'Job Portal', description: 'Post or find jobs', icon: Briefcase, path: '/jobs', color: 'text-blue-600' },
    { title: 'Upcoming Events', description: 'View & host events', icon: Calendar, path: '/events', color: 'text-orange-600' },
  ] : [
    { title: 'Alumni Directory', description: 'Connect with seniors', icon: Users, path: '/alumni', color: 'text-blue-600' },
    { title: 'Find a Mentor', description: 'Get career guidance', icon: Handshake, path: '/mentorship', color: 'text-purple-600' },
    { title: 'Job Portal', description: 'Apply for internships', icon: Briefcase, path: '/jobs', color: 'text-green-600' }
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
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color.replace('text', 'bg').replace('600', '50')} group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <TrendingUp className="h-3 w-3 mr-1" /> {stat.trend}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500">{stat.label}</div>
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
              <div className="space-y-5">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="relative flex gap-4 items-start">
                    {index !== recentActivity.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-[-20px] w-0.5 bg-gray-100"></div>
                    )}
                    <div className="relative z-10 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                    </div>
                    <div className="pt-1.5">
                      <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
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
