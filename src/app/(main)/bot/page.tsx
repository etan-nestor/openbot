'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Bot, RefreshCw, Settings, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BotPage = () => {
  const [guilds, setGuilds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGuild, setSelectedGuild] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/discord/guilds')
        const data = await response.json()
        setGuilds(data)
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
      const response = await fetch(`/api/discord/guild/${guildId}`)
      const data = await response.json()
      setSelectedGuild(data)
    } catch (error) {
      console.error('Failed to fetch guild details:', error)
    }
  }

  return (
    <div className="min-h-screen flex">
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6 overflow-y-auto ml-20 md:ml-64 transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary-500" />
            Bot Management
          </h1>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/bot/settings')}
            className="bg-dark-700 hover:bg-dark-600 p-3 rounded-lg flex items-center gap-2 transition-all"
          >
            <Settings className="w-5 h-5 text-gray-300" />
            <span className="hidden md:inline">Bot Settings</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Guilds List */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-800 rounded-xl p-6 border border-dark-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Your Servers</h2>
              <motion.button
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.location.reload()}
                className="p-2 rounded-lg hover:bg-dark-700 transition-all"
                disabled={loading}
              >
                <RefreshCw className={`w-5 h-5 text-gray-300 ${loading ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-pulse text-gray-400">Loading servers...</div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {guilds.map(guild => (
                  <motion.div
                    key={guild.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fetchGuildDetails(guild.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedGuild?.id === guild.id 
                        ? 'bg-primary-900/30 border border-primary-500/50' 
                        : 'bg-dark-700 hover:bg-dark-600 border border-dark-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {guild.icon ? (
                        <img 
                          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} 
                          alt={guild.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center">
                          <span className="text-lg font-bold">{guild.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-white">{guild.name}</h3>
                        <p className="text-xs text-gray-400">{guild.owner ? 'Owner' : 'Administrator'}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Guild Details */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-dark-800 rounded-xl p-6 border border-dark-700"
          >
            {selectedGuild ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  {selectedGuild.icon ? (
                    <img 
                      src={`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png`} 
                      alt={selectedGuild.name}
                      className="w-16 h-16 rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-dark-600 flex items-center justify-center">
                      <span className="text-2xl font-bold">{selectedGuild.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedGuild.name}</h2>
                    <p className="text-gray-400">{selectedGuild.member_count} members</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Bot Configuration</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Prefix</label>
                        <input 
                          type="text" 
                          defaultValue="!"
                          className="w-full bg-dark-600 border border-dark-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Moderation</label>
                        <select className="w-full bg-dark-600 border border-dark-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary-500">
                          <option>Enabled</option>
                          <option>Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-primary-600 hover:bg-primary-500 text-white py-2 px-3 rounded text-sm transition-all"
                      >
                        Save Settings
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-orangered-600 hover:bg-orangered-500 text-white py-2 px-3 rounded text-sm transition-all"
                      >
                        Leave Server
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Modules</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Moderation', 'Music', 'Levels', 'Logging', 'Welcome', 'AutoMod'].map(module => (
                      <motion.div
                        key={module}
                        whileHover={{ y: -2 }}
                        className="bg-dark-700 p-3 rounded-lg border border-dark-600 cursor-pointer hover:border-primary-500/30 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{module}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-9 h-5 bg-dark-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Bot className="w-12 h-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-400 mb-2">No server selected</h3>
                <p className="text-gray-500 max-w-md">
                  Select a server from the list to view and manage bot settings for that server.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.main>
    </div>
  )
}

export default BotPage