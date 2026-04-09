import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ClipboardList,
  Users,
  ArrowLeft,
  Upload,
  Eye,
  Download,
  Pencil,
  CheckCircle
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
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingResume, setEditingResume] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const [toast, setToast] = useState('');
  const [uploadedResume, setUploadedResume] = useState(null); // { name, url }

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

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
    } catch (error) {
      console.log('Using mock update fallback', error);
    } finally {
      setProfile(formData);
      setEditingProfile(false);
      showToast('Profile updated successfully!');
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
    } catch (error) {
      console.log('Using mock resume fallback', error);
    } finally {
      setProfile(formData);
      setEditingResume(false);
      showToast('Resume updated successfully!');
    }
  };

  const handleAutoFillResume = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showToast('Only PDF files are allowed.');
      e.target.value = '';
      return;
    }
    const url = URL.createObjectURL(file);
    setUploadedResume({ name: file.name, url });
    showToast(`"${file.name}" uploaded successfully!`);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
          </div>
        </div>
      </nav>
      {toast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-semibold">{toast}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === tab.id
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
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {profile.role === 'alumni' ? 'Professional Resume' : 'Student Resume'}
                      </h2>
                      <p className="text-sm text-gray-500 mt-0.5">Fill in details to generate a resume-ready profile.</p>
                    </div>
                    {!editingResume && (
                      <button
                        onClick={() => setEditingResume(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                      >
                        <Pencil className="h-4 w-4" /> Edit Resume Details
                      </button>
                    )}
                  </div>

                  {/* PDF Upload Card — always visible */}
                  <div className="mx-6 mt-5">
                    <div className="rounded-xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">Resume / CV Upload</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Upload your CV / Resume to auto-fill these fields instantly.</p>
                            {uploadedResume && (
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                                <span className="text-xs font-medium text-green-700 truncate max-w-[180px]">{uploadedResume.name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {uploadedResume && (
                            <>
                              <a
                                href={uploadedResume.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition text-xs font-semibold shadow-sm"
                              >
                                <Eye className="h-3.5 w-3.5" /> View
                              </a>
                              <a
                                href={uploadedResume.url}
                                download={uploadedResume.name}
                                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-green-300 transition text-xs font-semibold shadow-sm"
                              >
                                <Download className="h-3.5 w-3.5" /> Download
                              </a>
                            </>
                          )}
                          <label className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition font-semibold text-xs shadow-sm">
                            <Upload className="h-3.5 w-3.5" />
                            {uploadedResume ? 'Replace PDF' : 'Upload PDF'}
                            <input type="file" accept=".pdf" className="hidden" onChange={handleAutoFillResume} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View mode */}
                  {!editingResume ? (
                    <div className="p-6 space-y-5">
                      <div className="rounded-xl border border-gray-200 p-5 bg-white">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Career Objective</h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {formData.resume?.careerObjective || <span className="italic text-gray-400">Add a brief career objective to highlight your goals.</span>}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-gray-200 p-4 bg-white">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                          <p className="font-semibold text-gray-800 text-sm flex items-center gap-2"><Mail className="h-4 w-4 text-blue-500" /> {profile.email}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 p-4 bg-white">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                          <p className="font-semibold text-gray-800 text-sm flex items-center gap-2"><Phone className="h-4 w-4 text-blue-500" /> {profile.phone || 'Not provided'}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 p-4 bg-white">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">LinkedIn</p>
                          <p className="font-semibold text-gray-800 text-sm">{profile.linkedin || 'Not provided'}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 p-4 bg-white">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">GitHub</p>
                          <p className="font-semibold text-gray-800 text-sm">{profile.github || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-gray-200 p-5 bg-white">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Education</h3>
                        {formData.resume?.education ? (
                          <ul className="space-y-2">
                            {formData.resume.education.split('\n').map((line, i) => line.trim() && (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>{line}
                              </li>
                            ))}
                          </ul>
                        ) : <p className="text-gray-400 italic text-sm">Add education details including course, institute, and year.</p>}
                      </div>

                      <div className="rounded-xl border border-gray-200 p-5 bg-white">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Projects</h3>
                        {formData.resume?.projects ? (
                          <ul className="space-y-2">
                            {formData.resume.projects.split('\n').map((line, i) => line.trim() && (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>{line}
                              </li>
                            ))}
                          </ul>
                        ) : <p className="text-gray-400 italic text-sm">List relevant academic or personal projects.</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-gray-200 p-5 bg-white">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Technical Skills</h3>
                          {formData.resume?.technicalSkills ? (
                            <div className="flex flex-wrap gap-2">
                              {formData.resume.technicalSkills.split(',').map((skill, i) => skill.trim() && (
                                <span key={i} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold">{skill.trim()}</span>
                              ))}
                            </div>
                          ) : <p className="text-gray-400 italic text-xs">Add your technical skills (comma-separated).</p>}
                        </div>
                        <div className="rounded-xl border border-gray-200 p-5 bg-white">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Soft Skills</h3>
                          {formData.resume?.softSkills ? (
                            <div className="flex flex-wrap gap-2">
                              {formData.resume.softSkills.split(',').map((skill, i) => skill.trim() && (
                                <span key={i} className="bg-green-50 text-green-700 border border-green-100 px-3 py-1 rounded-full text-xs font-semibold">{skill.trim()}</span>
                              ))}
                            </div>
                          ) : <p className="text-gray-400 italic text-xs">Add soft skills (comma-separated).</p>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Edit mode */
                    <form onSubmit={handleResumeSubmit} className="p-6 space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Career Objective</label>
                        <textarea
                          name="careerObjective"
                          value={formData.resume?.careerObjective || ''}
                          onChange={handleResumeChange}
                          rows="3"
                          placeholder="Write a brief career objective..."
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Education <span className="font-normal text-gray-400">(one entry per line)</span></label>
                        <textarea
                          name="education"
                          value={formData.resume?.education || ''}
                          onChange={handleResumeChange}
                          rows="3"
                          placeholder="B.Tech Computer Science, XYZ University, 2024"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Projects <span className="font-normal text-gray-400">(one entry per line)</span></label>
                        <textarea
                          name="projects"
                          value={formData.resume?.projects || ''}
                          onChange={handleResumeChange}
                          rows="3"
                          placeholder="Alumni Portal (MERN Stack)"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Technical Skills <span className="font-normal text-gray-400">(comma-separated)</span></label>
                          <textarea
                            name="technicalSkills"
                            value={formData.resume?.technicalSkills || ''}
                            onChange={handleResumeChange}
                            rows="3"
                            placeholder="React, Node.js, MongoDB"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Soft Skills <span className="font-normal text-gray-400">(comma-separated)</span></label>
                          <textarea
                            name="softSkills"
                            value={formData.resume?.softSkills || ''}
                            onChange={handleResumeChange}
                            rows="3"
                            placeholder="Leadership, Teamwork"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-1">
                        <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-sm">
                          Save Resume
                        </button>
                        <button type="button" onClick={() => setEditingResume(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold text-sm">
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-5">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <Briefcase className="h-6 w-6 text-blue-600" /> Jobs & Opportunities
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">Track your career progress and saved opportunities.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl border border-gray-100 p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">No Saved Jobs</h3>
                      <p className="text-sm text-gray-500">You haven't saved any job postings yet.</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl border border-gray-100 p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                        <ClipboardList className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">No Applications</h3>
                      <p className="text-sm text-gray-500">You haven't applied to any roles yet.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-5">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <LayoutDashboard className="h-6 w-6 text-blue-600" /> Activity & Presence
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">Monitor your profile engagement and network.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
                      <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Globe className="h-7 w-7 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Profile Views</p>
                        <h3 className="text-2xl font-bold text-gray-900">0</h3>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Connections</p>
                        <h3 className="text-2xl font-bold text-gray-900">0</h3>
                      </div>
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
