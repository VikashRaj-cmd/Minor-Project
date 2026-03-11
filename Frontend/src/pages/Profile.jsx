import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { getProfile, updateProfile } from '@/services/userService';
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  Briefcase,
  Linkedin,
  Github,
  Globe,
  Link2,
  Camera,
  FileText,
  LayoutDashboard,
  ClipboardList
} from 'lucide-react';

const tabs = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'resume', name: 'Resume', icon: FileText },
  { id: 'jobs', name: 'Jobs', icon: Briefcase },
  { id: 'activity', name: 'Activity', icon: ClipboardList }
];

const emptyResume = {
  careerObjective: '',
  education: '',
  projects: '',
  technicalSkills: '',
  softSkills: ''
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingResume, setEditingResume] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      const resumeData = data?.resume || {};
      setProfile(data);
      setFormData({
        ...data,
        resume: {
          ...emptyResume,
          ...resumeData
        }
      });
      setPhotoPreview(data?.profileImage || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const initials = useMemo(() => {
    if (!profile?.name) return 'U';
    return profile.name
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [profile?.name]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeChange = (e) => {
    setFormData({
      ...formData,
      resume: {
        ...formData.resume,
        [e.target.name]: e.target.value
      }
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setPhotoPreview(result);
      setFormData({ ...formData, profileImage: result });
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditingProfile(false);
      fetchProfile();
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditingResume(false);
      fetchProfile();
      alert('Resume updated successfully!');
    } catch (error) {
      console.error('Error updating resume:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Profile Overview</h2>
                      <p className="text-sm text-gray-500">Keep your information up to date for better visibility.</p>
                    </div>
                    {!editingProfile && (
                      <button
                        onClick={() => setEditingProfile(true)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {!editingProfile ? (
                    <div className="p-6 space-y-6">
                      <div className="flex items-center gap-6">
                        {photoPreview ? (
                          <img
                            src={photoPreview}
                            alt={profile.name}
                            className="w-24 h-24 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {initials}
                          </div>
                        )}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
                          <p className="text-gray-600 flex items-center gap-2 mt-1">
                            <Mail className="h-4 w-4" />
                            {profile.email}
                          </p>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            {profile.role === 'alumni' ? (
                              <>
                                <GraduationCap className="h-4 w-4" /> Alumni
                              </>
                            ) : (
                              <>
                                <User className="h-4 w-4" /> Student
                              </>
                            )}
                            <span className="text-gray-300">|</span>
                            Batch {profile.batch}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Academic Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">Course</p>
                            <p className="font-semibold text-gray-800">{profile.course || 'Not provided'}</p>
                          </div>
                          <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">Department</p>
                            <p className="font-semibold text-gray-800">{profile.department}</p>
                          </div>
                        </div>
                      </div>

                      {profile.role === 'alumni' && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">Professional Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border border-gray-200 p-4">
                              <p className="text-sm text-gray-500">Company</p>
                              <p className="font-semibold text-gray-800">{profile.company || 'Not provided'}</p>
                            </div>
                            <div className="rounded-lg border border-gray-200 p-4">
                              <p className="text-sm text-gray-500">Designation</p>
                              <p className="font-semibold text-gray-800">{profile.designation || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Contact & Social</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <Phone className="h-4 w-4" /> Phone
                            </p>
                            <p className="font-semibold text-gray-800">{profile.phone || 'Not provided'}</p>
                          </div>
                          <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <Linkedin className="h-4 w-4" /> LinkedIn
                            </p>
                            {profile.linkedin ? (
                              <a className="font-semibold text-blue-600 hover:underline" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                                {profile.linkedin}
                              </a>
                            ) : (
                              <p className="font-semibold text-gray-800">Not provided</p>
                            )}
                          </div>
                          <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <Github className="h-4 w-4" /> GitHub
                            </p>
                            {profile.github ? (
                              <a className="font-semibold text-blue-600 hover:underline" href={profile.github} target="_blank" rel="noopener noreferrer">
                                {profile.github}
                              </a>
                            ) : (
                              <p className="font-semibold text-gray-800">Not provided</p>
                            )}
                          </div>
                          <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <Globe className="h-4 w-4" /> Portfolio
                            </p>
                            {profile.portfolio ? (
                              <a className="font-semibold text-blue-600 hover:underline" href={profile.portfolio} target="_blank" rel="noopener noreferrer">
                                {profile.portfolio}
                              </a>
                            ) : (
                              <p className="font-semibold text-gray-800">Not provided</p>
                            )}
                          </div>
                          <div className="rounded-lg border border-gray-200 p-4 col-span-2">
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <Link2 className="h-4 w-4" /> Social Link
                            </p>
                            {profile.socialMedia ? (
                              <a className="font-semibold text-blue-600 hover:underline" href={profile.socialMedia} target="_blank" rel="noopener noreferrer">
                                {profile.socialMedia}
                              </a>
                            ) : (
                              <p className="font-semibold text-gray-800">Not provided</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Profile Photo</h3>
                        <div className="flex items-center gap-4">
                          {photoPreview ? (
                            <img
                              src={photoPreview}
                              alt="Profile"
                              className="w-20 h-20 rounded-full object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                              {initials}
                            </div>
                          )}
                          <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                            <Camera className="h-4 w-4" />
                            <span className="text-sm font-medium text-gray-700">Upload Photo</span>
                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            disabled
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            disabled
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                          <input
                            type="text"
                            name="course"
                            value={formData.course || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Batch</label>
                          <input
                            type="text"
                            name="batch"
                            value={formData.batch || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                          <input
                            type="text"
                            name="department"
                            value={formData.department || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {profile.role === 'alumni' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company || ''}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                            <input
                              type="text"
                              name="designation"
                              value={formData.designation || ''}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
                          <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub</label>
                          <input
                            type="url"
                            name="github"
                            value={formData.github || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Portfolio</label>
                          <input
                            type="url"
                            name="portfolio"
                            value={formData.portfolio || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Social Link</label>
                          <input
                            type="url"
                            name="socialMedia"
                            value={formData.socialMedia || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProfile(false)}
                          className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
              {activeTab === 'resume' && (
                <div>
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {profile.role === 'alumni' ? 'Professional Resume' : 'Student Resume'}
                      </h2>
                      <p className="text-sm text-gray-500">Fill in details to generate a resume-ready profile.</p>
                    </div>
                    {!editingResume && (
                      <button
                        onClick={() => setEditingResume(true)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        Edit Resume
                      </button>
                    )}
                  </div>

                  {!editingResume ? (
                    <div className="p-6 space-y-6">
                      <div className="rounded-lg border border-gray-200 p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Career Objective</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {formData.resume?.careerObjective || 'Add a brief career objective to highlight your goals.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="text-sm text-gray-500">Mail</p>
                          <p className="font-semibold text-gray-800 flex items-center gap-2"><Mail className="h-4 w-4" /> {profile.email}</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-semibold text-gray-800 flex items-center gap-2"><Phone className="h-4 w-4" /> {profile.phone || 'Not provided'}</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="text-sm text-gray-500">LinkedIn</p>
                          <p className="font-semibold text-gray-800">{profile.linkedin || 'Not provided'}</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4">
                          <p className="text-sm text-gray-500">GitHub</p>
                          <p className="font-semibold text-gray-800">{profile.github || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="rounded-lg border border-gray-200 p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Education</h3>
                        <p className="text-gray-700 whitespace-pre-line">
                          {formData.resume?.education || 'Add education details including course, institute, and year.'}
                        </p>
                      </div>

                      <div className="rounded-lg border border-gray-200 p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Projects</h3>
                        <p className="text-gray-700 whitespace-pre-line">
                          {formData.resume?.projects || 'List relevant academic or personal projects.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border border-gray-200 p-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Technical Skills</h3>
                          <p className="text-gray-700 whitespace-pre-line">
                            {formData.resume?.technicalSkills || 'Add your technical skills (comma-separated).'}
                          </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Soft Skills</h3>
                          <p className="text-gray-700 whitespace-pre-line">
                            {formData.resume?.softSkills || 'Add soft skills (comma-separated).'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleResumeSubmit} className="p-6 space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Career Objective</label>
                        <textarea
                          name="careerObjective"
                          value={formData.resume?.careerObjective || ''}
                          onChange={handleResumeChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
                        <textarea
                          name="education"
                          value={formData.resume?.education || ''}
                          onChange={handleResumeChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Projects</label>
                        <textarea
                          name="projects"
                          value={formData.resume?.projects || ''}
                          onChange={handleResumeChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Technical Skills</label>
                          <textarea
                            name="technicalSkills"
                            value={formData.resume?.technicalSkills || ''}
                            onChange={handleResumeChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Soft Skills</label>
                          <textarea
                            name="softSkills"
                            value={formData.resume?.softSkills || ''}
                            onChange={handleResumeChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                        >
                          Save Resume
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingResume(false)}
                          className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-800">Jobs & Opportunities</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Saved Jobs</h3>
                      <p className="text-sm text-gray-600">Track internships and placements you want to apply for.</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Applications</h3>
                      <p className="text-sm text-gray-600">Monitor your submitted applications and statuses.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-800">Activity & Presence</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Profile Views</h3>
                      <p className="text-sm text-gray-600">See who visited your profile recently.</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Connections</h3>
                      <p className="text-sm text-gray-600">Manage your alumni connections and requests.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
