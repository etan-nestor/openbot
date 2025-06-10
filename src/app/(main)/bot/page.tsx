'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Bot, RefreshCw, Settings, Plus, ChevronDown, Check, X, MoreVertical, Users, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const BotPage = () => {
  const [guilds, setGuilds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGuild, setSelectedGuild] = useState<any>(null)
  const [modules, setModules] = useState([
    { name: 'Moderation', enabled: true, color: 'orange' },
    { name: 'Music', enabled: false, color: 'purple' },
    { name: 'Levels', enabled: true, color: 'green' },
    { name: 'Logging', enabled: false, color: 'blue' },
    { name: 'Welcome', enabled: true, color: 'pink' },
    { name: 'AutoMod', enabled: false, color: 'red' }
  ])
  const router = useRouter()

  useEffect(() => {
    // Simulate API fetch
    const fetchGuilds = async () => {
      try {
        setLoading(true)
        const mockGuilds = [
          {
            id: '1',
            name: 'Gaming Community',
            icon: '/images/OpenNumeric.png',
            owner: true,
            member_count: 1250,
            premium_subscription_count: 5
          },
          {
            id: '2',
            name: 'Dev Hangout',
            icon: null,
            owner: false,
            member_count: 342,
            premium_subscription_count: 2
          }
        ]
        await new Promise(resolve => setTimeout(resolve, 1000))
        setGuilds(mockGuilds)
      } catch (error) {
        console.error('Failed to fetch guilds:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGuilds()
  }, [])

  const fetchGuildDetails = async (guildId: string) => {
    try {
      const mockGuild = guilds.find(g => g.id === guildId)
      await new Promise(resolve => setTimeout(resolve, 500))
      setSelectedGuild(mockGuild)
    } catch (error) {
      console.error('Failed to fetch guild details:', error)
    }
  }

  const toggleModule = (moduleName: string) => {
    setModules(modules.map(m => 
      m.name === moduleName ? { ...m, enabled: !m.enabled } : m
    ))
  }

  // Helper function for accent colors
  const getAccentColor = (color: string, type: 'bg' | 'text' | 'border') => {
    switch(color) {
      case 'orange': return `${type}-orange-500 ${type}-opacity-20`
      case 'purple': return `${type}-purple-500 ${type}-opacity-20`
      case 'green': return `${type}-emerald-500 ${type}-opacity-20`
      case 'blue': return `${type}-blue-500 ${type}-opacity-20`
      case 'pink': return `${type}-pink-500 ${type}-opacity-20`
      case 'red': return `${type}-red-500 ${type}-opacity-20`
      default: return `${type}-indigo-500 ${type}-opacity-20`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex items-center justify-between fixed w-full md:relative z-30">
        <h1 className="text-xl font-bold flex items-center">
          <Bot className="w-5 h-5 mr-2 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Bot Configuration
          </span>
        </h1>
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Settings"
            onClick={() => router.push('/bot/settings')}
          >
            <Settings className="w-5 h-5 text-gray-400 hover:text-indigo-400 transition-colors" />
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row pt-4 md:pt-0">
        {/* Sidebar - Servers List */}
        <div className="hidden md:block w-64 p-4 border-r border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-200">Your Servers</h2>
            <button 
              onClick={() => window.location.reload()}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full h-16 rounded-lg bg-gray-800" />
              ))}
            </div>
          ) : guilds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bot className="w-10 h-10 text-gray-600 mb-3" />
              <p className="text-gray-400">No servers found</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
              {guilds.map(guild => (
                <motion.div
                  key={guild.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => fetchGuildDetails(guild.id)}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-all border",
                    selectedGuild?.id === guild.id
                      ? 'bg-indigo-900/20 border-indigo-500/50'
                      : 'bg-gray-800/50 hover:bg-gray-800 border-gray-700'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {guild.icon ? (
                      <img 
                        src={guild.icon} 
                        alt={guild.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold">
                        {guild.name.charAt(0)}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{guild.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                          {guild.member_count} members
                        </span>
                        {guild.owner && (
                          <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">
                            Owner
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {selectedGuild?.id === guild.id && (
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* Main Area */}
        <div className="flex-1 p-4 md:p-6 ">
          {!selectedGuild ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Bot className="w-12 h-12 text-gray-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">Select a server</h2>
              <p className="text-gray-500 max-w-md text-center">
                Choose a server from the list to configure bot settings
              </p>
            </div>
          ) : (
            <>
              {/* Server Header */}
              <div className="flex items-center mb-6">
                {selectedGuild.icon ? (
                  <img
                    src={selectedGuild.icon}
                    alt={selectedGuild.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mr-4">
                    {selectedGuild.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-100">{selectedGuild.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full">
                      {selectedGuild.member_count} members
                    </span>
                    {selectedGuild.owner && (
                      <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">
                        Owner
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Configuration Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* Basic Settings */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Basic Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Command Prefix</label>
                      <input 
                        type="text" 
                        defaultValue="!"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Language</label>
                      <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                        <option>English</option>
                        <option>French</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Actions</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-indigo-600 hover:bg-indigo-500 py-2 px-3 rounded-lg text-sm transition-all flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-red-900/50 hover:bg-red-900 border border-red-800 text-red-400 py-2 px-3 rounded-lg text-sm transition-all flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Leave
                    </motion.button>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" />
                      Reset to defaults
                    </button>
                  </div>
                </div>
              </div>

              {/* Modules Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-3">Modules</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Enable or disable specific bot functionalities for this server
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {modules.map((module) => (
                    <motion.div
                      key={module.name}
                      whileHover={{ y: -3 }}
                      className={cn(
                        "bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-indigo-500/30 transition-all cursor-pointer",
                        getAccentColor(module.color, 'border')
                      )}
                      onClick={() => toggleModule(module.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">{module.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {module.enabled ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                        
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={module.enabled}
                            onChange={() => {}}
                          />
                          <div className={cn(
                            "w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
                            module.enabled ? getAccentColor(module.color, 'bg') : ''
                          )}></div>
                        </label>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

export default BotPage