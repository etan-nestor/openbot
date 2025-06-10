'use client'

import { Settings, Shield, Key, Bell, Globe, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', icon: Settings, label: 'General' },
    { id: 'privacy', icon: Shield, label: 'Privacy' },
    { id: 'security', icon: Key, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'language', icon: Globe, label: 'Language' },
    { id: 'account', icon: User, label: 'Account' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex items-center justify-between fixed w-full md:relative z-30">
        <h1 className="text-xl font-bold flex items-center">
          <Settings className="w-5 h-5 mr-2 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Settings
          </span>
        </h1>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row pt-4 md:pt-0">
        {/* Sidebar */}
        <div className="hidden md:block w-64 p-4 border-r border-gray-800">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">Settings</h2>
          <div className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-900/20 text-indigo-400'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Area */}
        <div className="flex-1 p-4 md:p-6">
          {activeTab === 'general' && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">General Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Theme</label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>Dark</option>
                    <option>Light</option>
                    <option>System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Timezone</label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>UTC</option>
                    <option>Europe/Paris</option>
                    <option>America/New_York</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div>
                    <h3 className="font-medium">Developer Mode</h3>
                    <p className="text-sm text-gray-500">Enable advanced features</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Data Collection</h3>
                    <p className="text-sm text-gray-500">Allow us to collect anonymous usage data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div>
                    <h3 className="font-medium">Personalized Ads</h3>
                    <p className="text-sm text-gray-500">Show ads based on your activity</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <label className="block text-sm text-gray-400 mb-2">Profile Visibility</label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>Public</option>
                    <option>Friends only</option>
                    <option>Private</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <label className="block text-sm text-gray-400 mb-2">Password</label>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-left">
                    Change Password
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <label className="block text-sm text-gray-400 mb-2">Active Sessions</label>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Chrome, Windows</p>
                        <p className="text-sm text-gray-500">Paris, France • Just now</p>
                      </div>
                      <button className="text-red-400 hover:text-red-300 text-sm">Log out</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive important updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-500">Get instant notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <label className="block text-sm text-gray-400 mb-2">Notification Frequency</label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>Immediately</option>
                    <option>Daily digest</option>
                    <option>Weekly summary</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">Language Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Interface Language</label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date Format</label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div>
                    <h3 className="font-medium">Automatic Translation</h3>
                    <p className="text-sm text-gray-500">Translate content automatically</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      defaultValue="user@example.com" 
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                    />
                    <button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 text-white">
                      Update
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <label className="block text-sm text-gray-400 mb-2">Delete Account</label>
                  <p className="text-sm text-gray-500 mb-4">Permanently remove your account and all associated data</p>
                  <button className="bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-white">
                    Delete Account
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <label className="block text-sm text-gray-400 mb-2">Export Data</label>
                  <p className="text-sm text-gray-500 mb-4">Download a copy of all your data</p>
                  <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-4 py-2 text-white">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage