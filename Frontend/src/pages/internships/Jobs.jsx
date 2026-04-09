import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import { AuthContext } from '@/context/AuthContext';
import { Briefcase, GraduationCap, MapPin, Users, Clock, PartyPopper, ArrowRight } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/internships');
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Job Portal</h1>
            <p className="text-gray-600">Opportunities shared by alumni</p>
          </div>
          <div className="flex items-center gap-3">
            {user?.role === 'alumni' && (
              <button onClick={() => alert('Job posting feature coming soon!')} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition">
                + Post a Job
              </button>
            )}
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-sm">
              <Briefcase className="w-4 h-4 inline mr-1" /> {jobs.length} Openings
            </div>
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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Opportunities Found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any {filter !== 'all' ? filter : 'job or internship'} openings at the moment. Check back later!</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Jobs;
