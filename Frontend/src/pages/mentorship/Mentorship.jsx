import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Mentorship = () => {
  const navigate = useNavigate();
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      designation: 'Senior Software Engineer',
      company: 'Google',
      batch: '2015',
      expertise: ['Web Development', 'Cloud Computing', 'System Design'],
      experience: '8 years',
      sessions: 45,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Priya Sharma',
      designation: 'Product Manager',
      company: 'Microsoft',
      batch: '2016',
      expertise: ['Product Management', 'Agile', 'Leadership'],
      experience: '7 years',
      sessions: 38,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Amit Patel',
      designation: 'Data Scientist',
      company: 'Amazon',
      batch: '2017',
      expertise: ['Machine Learning', 'Python', 'Data Analysis'],
      experience: '6 years',
      sessions: 52,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      designation: 'Full Stack Developer',
      company: 'Flipkart',
      batch: '2018',
      expertise: ['React', 'Node.js', 'MongoDB'],
      experience: '5 years',
      sessions: 29,
      rating: 4.7
    }
  ];

  const handleRequest = (mentor) => {
    setSelectedMentor(mentor);
    alert(`Mentorship request sent to ${mentor.name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🎓 Mentorship Program</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Connect with Industry Experts</h2>
          <p className="text-gray-600">Get guidance from experienced alumni working in top companies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {mentor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                    <p className="text-indigo-600 font-semibold">{mentor.designation}</p>
                    <p className="text-gray-600 text-sm">{mentor.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-500 font-semibold">
                    ⭐ {mentor.rating}
                  </div>
                  <p className="text-gray-500 text-sm">Batch {mentor.batch}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Experience:</span> {mentor.experience}
                </p>
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold">Sessions Completed:</span> {mentor.sessions}
                </p>
                
                <div className="mb-3">
                  <p className="font-semibold text-gray-700 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRequest(mentor)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold shadow-md"
              >
                Request Mentorship
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
          <h3 className="text-xl font-bold text-gray-800 mb-3">📚 How Mentorship Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-3xl mb-2">1️⃣</div>
              <h4 className="font-bold text-gray-800 mb-1">Choose a Mentor</h4>
              <p className="text-gray-600 text-sm">Browse and select a mentor based on your career interests</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-3xl mb-2">2️⃣</div>
              <h4 className="font-bold text-gray-800 mb-1">Send Request</h4>
              <p className="text-gray-600 text-sm">Submit your mentorship request with your goals</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-3xl mb-2">3️⃣</div>
              <h4 className="font-bold text-gray-800 mb-1">Start Learning</h4>
              <p className="text-gray-600 text-sm">Connect via video call and get personalized guidance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
