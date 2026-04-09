import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import api from '@/services/api';
import { GraduationCap, Star, BookOpen, Search, Send, Video, ArrowLeft } from 'lucide-react';

const Mentorship = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/mentors')
      .then(({ data }) => setMentors(data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleRequest = (mentor) => {
    alert(`Mentorship request sent to ${mentor.name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4 px-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-blue-600" /> Mentors
            </h1>
          </div>
          <div className="flex gap-3 items-center">
            {user?.role === 'alumni' && (
              <button onClick={() => alert('Mentorship Application Portal opens next month!')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold text-sm shadow-sm">
                Become a Mentor
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Connect with Industry Experts</h2>
          <p className="text-gray-600 text-lg">Browse curated alumni who have volunteered to mentor the next generation.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor._id} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 flex flex-col h-full hover:border-blue-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mr-4 border border-blue-100">
                    {mentor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                    <p className="text-blue-600 font-medium">{mentor.designation}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{mentor.company}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-sm font-semibold mb-1 border border-yellow-200">
                    <Star className="fill-current w-4 h-4 mr-1" /> {mentor.rating}
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Batch {mentor.batch}</p>
                </div>
              </div>

              <div className="mb-6 flex-grow">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Experience</p>
                    <p className="text-gray-800 font-medium">{mentor.experience}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Sessions</p>
                    <p className="text-gray-800 font-medium">{mentor.sessions} Completed</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Areas of Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRequest(mentor)}
                className="w-full mt-auto bg-white border-2 border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-50 transition font-semibold"
              >
                Request Mentorship
              </button>
            </div>
          ))}
        </div>
        )}

        <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" /> How Mentorship Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col relative overflow-hidden group hover:-translate-y-1 hover:shadow-md hover:bg-white hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">1. Choose a Mentor</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Browse curated profiles and select an industry expert aligned with your career goals and interests.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col relative overflow-hidden group hover:-translate-y-1 hover:shadow-md hover:bg-white hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Send className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">2. Send Request</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Submit a formal request directly to them, outlining what specific guidance you are seeking.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col relative overflow-hidden group hover:-translate-y-1 hover:shadow-md hover:bg-white hover:border-blue-100 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">3. Start Learning</h4>
              <p className="text-gray-600 text-sm leading-relaxed">Connect via structured video calls to receive actionable feedback and personalized advice.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
