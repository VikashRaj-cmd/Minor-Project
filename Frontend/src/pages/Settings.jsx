import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { User, Lock, Bell, Settings as SettingsIcon, ArrowLeft } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const { user } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Settings updated successfully!');
    }, 800);
  };

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };



  const tabs = [
    { id: 'account', name: 'Account', icon: <User className="w-5 h-5" /> },
    { id: 'privacy', name: 'Privacy', icon: <Lock className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'preferences', name: 'Preferences', icon: <SettingsIcon className="w-5 h-5" /> }
  ];

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
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
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
          {/* Sidebar */}
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
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {activeTab === 'account' && (
                <form onSubmit={handleSave}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Change Password</h3>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Current Password"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <button disabled={isSaving} type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-70">
                          {isSaving ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </div>

                    <hr />

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Email Preferences</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-gray-700">Receive email notifications to {user?.email}</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-gray-700">Weekly alumni newsletter</span>
                        </label>
                      </div>
                      <button disabled={isSaving} type="button" onClick={handleSave} className="mt-4 bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition font-semibold disabled:opacity-70">
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                      </button>
                    </div>

                    <hr />

                    <div>
                      <h3 className="font-semibold text-red-600 mb-3">Danger Zone</h3>
                      <button type="button" onClick={() => showToast('Account deletion is disabled for safety.')} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {activeTab === 'privacy' && (
                <form onSubmit={handleSave}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy Settings</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <h3 className="font-semibold text-gray-800">Profile Visibility</h3>
                        <p className="text-sm text-gray-600">Control who can see your profile</p>
                      </div>
                      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Everyone</option>
                        <option>Alumni Only</option>
                        <option>Private</option>
                      </select>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <h3 className="font-semibold text-gray-800">Show Email</h3>
                        <p className="text-sm text-gray-600">Display email on your profile</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <h3 className="font-semibold text-gray-800">Show LinkedIn</h3>
                        <p className="text-sm text-gray-600">Display LinkedIn profile link</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <button disabled={isSaving} type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-70">
                    {isSaving ? 'Saving...' : 'Save Privacy Changes'}
                  </button>
                </form>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    {[
                      { title: 'New Job Postings', desc: 'Get notified when alumni post new jobs' },
                      { title: 'Event Reminders', desc: 'Receive reminders for registered events' },
                      { title: 'Mentorship Requests', desc: 'Notifications for mentorship requests' },
                      { title: 'Profile Views', desc: 'Know when someone views your profile' },
                      { title: 'Connection Requests', desc: 'Get notified of new connection requests' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b">
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <form onSubmit={handleSave}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Preferences</h2>

                  <div className="space-y-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Language</h3>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Theme</h3>
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => toggleTheme('light')}
                          className={`flex-1 py-3 border-2 rounded-lg font-semibold transition ${theme === 'light' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                          Light
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleTheme('dark')}
                          className={`flex-1 py-3 border-2 rounded-lg font-semibold transition ${theme === 'dark' ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                          Dark
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Time Zone</h3>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>IST (UTC+5:30)</option>
                        <option>EST (UTC-5:00)</option>
                        <option>PST (UTC-8:00)</option>
                      </select>
                    </div>
                  </div>
                  <button disabled={isSaving} type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-70">
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
