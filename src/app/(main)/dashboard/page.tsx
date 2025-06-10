'use client'

import { useState, useEffect } from 'react'
import { GuildSelector } from '@/components/discord/GuildSelector'
import { StatsOverview } from '@/components/discord/StatsOverview'
import { ChannelList } from '@/components/discord/ChannelList'
import { MessageList } from '@/components/discord/MessageList'
import { Settings, Home, Users, MessageSquare, ChevronDown } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Skeleton } from '@/components/ui/skeleton'
import { DiscordGuild, DiscordGuildDetails, DiscordChannel, DiscordMessage } from '@/lib/discord/types'


const mockGuilds: DiscordGuild[] = [
  {
    id: '1',
    name: 'Serveur de Développement',
    icon: '/images/OpenNumeric.png',
    owner: true,
    permissions: '0',
    features: []
  },
  {
    id: '2',
    name: 'Gaming Community',
    icon: '/images/OpenNumeric.png',
    owner: false,
    permissions: '0',
    features: []
  },
  {
    id: '3',
    name: 'Étudiants Informatique',
    icon: '/images/OpenNumeric.png',
    owner: true,
    permissions: '0',
    features: []
  }
];

const mockGuildDetails: DiscordGuildDetails = {
  id: '1',
  name: 'Serveur de Développement',
  icon: '/images/OpenNumeric.png',
  owner: true,
  permissions: '0',
  features: [],
  description: 'Communauté de développeurs passionnés',
  member_count: 1250,
  premium_subscription_count: 15,
  approximate_presence_count: 342
};

const mockChannels: DiscordChannel[] = [
  { id: '101', name: 'général', type: 0, position: 1 },
  { id: '102', name: 'annonces', type: 0, position: 2 },
  { id: '103', name: 'bienvenue', type: 0, position: 3 },
];

const mockMessages: DiscordMessage[] = [
  {
    id: '1001',
    content: 'Bonjour à tous ! Bienvenue sur le serveur 🎉',
    author: {
      id: 'user1',
      username: 'Admin',
      avatar: '/images/OpenNumeric.png',
      discriminator: '0001'
    },
    timestamp: '2023-05-15T10:00:00Z',
    edited_timestamp: null,
    channel_id: '101',
    attachments: [],
    embeds: [],
    mentions: [],
    pinned: false,
    type: 0
  },
  {
    id: '1002',
    content: 'Nouvelle mise à jour disponible!',
    author: {
      id: 'user2',
      username: 'Modo',
      avatar: '/images/OpenNumeric.png',
      discriminator: '0002'
    },
    timestamp: '2023-05-15T11:30:00Z',
    edited_timestamp: null,
    channel_id: '101',
    attachments: [],
    embeds: [],
    mentions: [],
    pinned: true,
    type: 0
  },
];

export default function DashboardPage() {
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [showMobileGuildSelector, setShowMobileGuildSelector] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !selectedGuildId && mockGuilds.length > 0) {
      setSelectedGuildId(mockGuilds[0].id);
    }
  }, [isLoading, selectedGuildId]);

  const handleRefetchMessages = () => {
    console.log('Simulation de rafraîchissement des messages');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white">
      {/* Header */}
      <header className="p-4 flex items-center justify-between fixed w-full md:relative z-30">
        <h1 className="text-xl font-bold flex items-center">
          <Home className="w-5 h-5 mr-2 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Discord Dashboard
          </span>
        </h1>
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-800 transition-colors bg-gray-800"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-400 hover:text-indigo-400 transition-colors" />
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row pt-4 md:pt-0">
        {/* Sidebar (mobile version) */}
        {isMobile && (
          <div className="px-4 border-b border-gray-800">
            <button 
              onClick={() => setShowMobileGuildSelector(!showMobileGuildSelector)}
              className="w-full py-3 flex items-center justify-between hover:bg-gray-800 px-2 rounded transition-colors"
            >
              <span className="font-medium text-gray-200">
                {isLoading ? 'Chargement...' : (mockGuildDetails?.name || 'Select a server')}
              </span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform text-gray-400 ${showMobileGuildSelector ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {showMobileGuildSelector && (
              <div className="pb-4">
                <GuildSelector 
                  guilds={mockGuilds}
                  onSelect={(id) => {
                    setSelectedGuildId(id)
                    setShowMobileGuildSelector(false)
                  }}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        )}
        
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="hidden md:block w-64 p-4 border-r border-gray-800">
            <GuildSelector 
              guilds={mockGuilds}
              onSelect={setSelectedGuildId}
              isLoading={isLoading}
            />
          </div>
        )}
        
        {/* Main Area */}
        <div className="flex-1 p-4 md:p-6">
          {!selectedGuildId ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Users className="w-12 h-12 text-gray-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">Select a server</h2>
              <p className="text-gray-500 max-w-md text-center">
                Choose a Discord server from the list to start managing your community.
              </p>
            </div>
          ) : (
            <>
              {/* Guild Header */}
              <div className="flex items-center mb-6">
                {isLoading ? (
                  <>
                    <Skeleton className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <Skeleton className="w-48 h-6 mb-2" />
                      <Skeleton className="w-64 h-4" />
                    </div>
                  </>
                ) : (
                  <>
                    {mockGuildDetails.icon ? (
                      <img
                        src={mockGuildDetails.icon}
                        alt={mockGuildDetails.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {mockGuildDetails.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-100">{mockGuildDetails.name}</h2>
                      <p className="text-gray-400">{mockGuildDetails.description}</p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Stats */}
              <StatsOverview 
                guild={mockGuildDetails} 
                className="mb-6"
                isLoading={isLoading}
              />
              
              {/* Content Area */}
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
                {/* Channels Column */}
                <div className="xl:col-span-1">
                  <ChannelList
                    channels={mockChannels}
                    onSelect={setSelectedChannelId}
                    isLoading={isLoading}
                  />
                </div>
                
                {/* Main Content Column */}
                <div className="xl:col-span-3">
                  {selectedChannelId ? (
                    <MessageList
                      messages={mockMessages}
                      channelId={selectedChannelId}
                      onNewMessage={handleRefetchMessages}
                      isLoading={isLoading}
                    />
                  ) : (
                    <div className="rounded-lg p-8 flex flex-col items-center justify-center h-64 border border-gray-800">
                      <MessageSquare className="w-12 h-12 text-gray-600 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a channel</h3>
                      <p className="text-gray-500 text-center">
                        Choose a text channel to view messages and interact.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}