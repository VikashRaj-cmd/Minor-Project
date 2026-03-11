import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import { Briefcase, GraduationCap, MapPin, Users, Clock, PartyPopper, ArrowRight } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/internships');
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleApply = async (jobId, jobTitle) => {
    try {
      await api.post(`/internships/${jobId}/apply`);
      alert(`Successfully applied for ${jobTitle}!`);
      fetchJobs();
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.type === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Job Portal</h1>
            <p className="text-gray-600">Opportunities shared by alumni</p>
          </div>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            <Briefcase className="w-4 h-4 inline mr-1" /> {jobs.length} Openings
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition text-sm ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All ({jobs.length})
          </button>
          <button
            onClick={() => setFilter('job')}
            className={`px-6 py-2 rounded-lg font-semibold transition text-sm ${
              filter === 'job'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Full-Time ({jobs.filter(j => j.type === 'job').length})
          </button>
          <button
            onClick={() => setFilter('internship')}
            className={`px-6 py-2 rounded-lg font-semibold transition text-sm ${
              filter === 'internship'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Internships ({jobs.filter(j => j.type === 'internship').length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-5 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
                    <p className="text-lg text-orange-600 font-semibold">{job.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    job.type === 'job'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {job.type === 'job' ? <><Briefcase className="w-3 h-3 inline mr-1" /> FULL-TIME</> : <><GraduationCap className="w-3 h-3 inline mr-1" /> INTERNSHIP</>}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">{job.description}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gray-600 text-xs">{job.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-semibold">Applicants</p>
                      <p className="text-gray-600 text-xs">{job.applicants?.length || 0} candidates applied</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-semibold">Posted</p>
                      <p className="text-gray-600 text-xs">{new Date(job.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job._id, job.title)}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg hover:from-orange-700 hover:to-red-700 hover:shadow-lg transition font-semibold shadow-md flex items-center justify-center text-sm"
                >
                  <span className="mr-2">Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
