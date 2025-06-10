'use client'

import { Users, Search, Crown, Shield, Mic, Volume2, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin', tag: 'Admin#0001', role: 'Owner', status: 'online' },
    { id: 2, name: 'Moderator', tag: 'Mod#0002', role: 'Moderator', status: 'online' },
    { id: 3, name: 'DJ', tag: 'DJ#1234', role: 'DJ', status: 'idle' },
    { id: 4, name: 'Streamer', tag: 'Streamer#5678', role: 'Streamer', status: 'dnd' },
    { id: 5, name: 'Member', tag: 'Member#9012', role: 'Member', status: 'offline' }
  ])

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.tag.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'idle': return 'bg-yellow-500'
      case 'dnd': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Owner': return <Crown className="w-4 h-4 text-yellow-400" />
      case 'Moderator': return <Shield className="w-4 h-4 text-blue-400" />
      case 'DJ': return <Volume2 className="w-4 h-4 text-purple-400" />
      case 'Streamer': return <Mic className="w-4 h-4 text-red-400" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex items-center justify-between fixed w-full md:relative z-30">
        <h1 className="text-xl font-bold flex items-center">
          <Users className="w-5 h-5 mr-2 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Server Members
          </span>
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 w-64"
          />
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col pt-4 md:pt-0">
        <div className="flex-1 p-4 md:p-6">
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="grid grid-cols-12 p-4 bg-gray-800 font-medium text-gray-300">
              <div className="col-span-4">User</div>
              <div className="col-span-3">Role</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2">Actions</div>
            </div>

            <div className="divide-y divide-gray-800 max-h-[calc(100vh-180px)] overflow-y-auto">
              {filteredUsers.map(user => (
                <div key={user.id} className="grid grid-cols-12 p-4 hover:bg-gray-800/50 transition-all">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-800"></div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(user.status)}`}></div>
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.tag}</div>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center gap-2">
                    {getRoleIcon(user.role)}
                    <span>{user.role}</span>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <span className="capitalize">{user.status}</span>
                  </div>

                  <div className="col-span-2 flex justify-end">
                    <button className="p-2 rounded-lg hover:bg-gray-800 transition-all">
                      <Wrench className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage