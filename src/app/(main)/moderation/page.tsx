'use client'

import { Shield, Ban, AlertTriangle, UserX, Clock, Filter } from 'lucide-react'
import { useState } from 'react'

const ModerationPage = () => {
  const [activeTab, setActiveTab] = useState('bans')
  const [cases, setCases] = useState([
    { id: 1, user: 'JohnDoe#1234', reason: 'Spamming in general chat', action: 'Ban', moderator: 'Admin#0001', date: '2023-05-15', duration: 'Permanent' },
    { id: 2, user: 'JaneDoe#5678', reason: 'Inappropriate profile picture', action: 'Kick', moderator: 'Mod#0002', date: '2023-05-14', duration: 'N/A' },
    { id: 3, user: 'BobSmith#9012', reason: 'Harassment towards members', action: 'Timeout', moderator: 'Admin#0001', date: '2023-05-13', duration: '7 days' },
    { id: 4, user: 'AliceW#3456', reason: 'Repeated rule violations', action: 'Ban', moderator: 'Mod#0003', date: '2023-05-12', duration: '30 days' },
    { id: 5, user: 'CharlieB#7890', reason: 'NSFW content in SFW channels', action: 'Warning', moderator: 'Mod#0002', date: '2023-05-11', duration: 'N/A' },
    { id: 6, user: 'DaveM#2345', reason: 'Excessive self-promotion', action: 'Timeout', moderator: 'Mod#0001', date: '2023-05-10', duration: '1 day' },
    { id: 7, user: 'EvaK#6789', reason: 'Discrimination', action: 'Ban', moderator: 'Admin#0001', date: '2023-05-09', duration: 'Permanent' }
  ])

  const filteredCases = cases.filter(caseItem => {
    switch(activeTab) {
      case 'bans': return caseItem.action === 'Ban'
      case 'kicks': return caseItem.action === 'Kick'
      case 'warnings': return caseItem.action === 'Warning'
      case 'timeouts': return caseItem.action === 'Timeout'
      default: return true
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex items-center justify-between fixed w-full md:relative z-30">
        <h1 className="text-xl font-bold flex items-center">
          <Shield className="w-5 h-5 mr-2 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Moderation
          </span>
        </h1>
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Filter"
          >
            <Filter className="w-5 h-5 text-gray-400 hover:text-indigo-400 transition-colors" />
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row pt-4 md:pt-0">
        {/* Sidebar - Tabs */}
        <div className="hidden md:block w-64 p-4 border-r border-gray-800">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">Moderation Actions</h2>
          <div className="space-y-1">
            {[
              { id: 'bans', icon: Ban, label: 'Bans' },
              { id: 'kicks', icon: UserX, label: 'Kicks' },
              { id: 'warnings', icon: AlertTriangle, label: 'Warnings' },
              { id: 'timeouts', icon: Clock, label: 'Timeouts' }
            ].map(tab => (
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
          {/* Cases Table */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="grid grid-cols-12 p-4 bg-gray-800 font-medium text-gray-300">
              <div className="col-span-2">User</div>
              <div className="col-span-4">Reason</div>
              <div className="col-span-1">Action</div>
              <div className="col-span-2">Moderator</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Duration</div>
            </div>

            {filteredCases.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No {activeTab} cases found
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {filteredCases.map(caseItem => (
                  <div key={caseItem.id} className="grid grid-cols-12 p-4 hover:bg-gray-800/50 transition-all">
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                      <span className="truncate">{caseItem.user}</span>
                    </div>
                    <div className="col-span-4 truncate" title={caseItem.reason}>{caseItem.reason}</div>
                    <div className="col-span-1">
                      <span className={`px-2 py-1 rounded text-xs ${
                        caseItem.action === 'Ban' ? 'bg-red-900/50 text-red-400' :
                        caseItem.action === 'Kick' ? 'bg-orange-900/50 text-orange-400' :
                        caseItem.action === 'Warning' ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-blue-900/50 text-blue-400'
                      }`}>
                        {caseItem.action}
                      </span>
                    </div>
                    <div className="col-span-2 truncate" title={caseItem.moderator}>{caseItem.moderator}</div>
                    <div className="col-span-2 text-sm text-gray-400">{caseItem.date}</div>
                    <div className="col-span-1 text-sm text-gray-400">{caseItem.duration}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Statistics Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-400">Total Cases</h3>
                <Shield className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-2xl font-bold mt-2">{cases.length}</p>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-400">Bans</h3>
                <Ban className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-2xl font-bold mt-2">{cases.filter(c => c.action === 'Ban').length}</p>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-400">Warnings</h3>
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold mt-2">{cases.filter(c => c.action === 'Warning').length}</p>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-400">Timeouts</h3>
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold mt-2">{cases.filter(c => c.action === 'Timeout').length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModerationPage