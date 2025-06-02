// app/dashboard/page.tsx
'use client'

import { useState } from 'react';
import { useDiscordData } from '@/hooks/useDiscordData';
import { GuildSelector } from '@/components/discord/GuildSelector';
import { StatsOverview } from '@/components/discord/StatsOverview';
import { ChannelList } from '@/components/discord/ChannelList';
import { MessageList } from '@/components/discord/MessageList';
import { DiscordGuild, DiscordGuildDetails, DiscordChannel, DiscordMessage } from '@/lib/discord/types';
import { Settings, Home, Users, MessageSquare } from 'lucide-react';

export default function DashboardPage() {
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  
  // Fetch guilds
  const { data: guilds, loading: guildsLoading } = useDiscordData<DiscordGuild[]>('guilds');
  
  // Fetch selected guild details
  const { data: guildDetails } = useDiscordData<DiscordGuildDetails>(
    selectedGuildId ? `guild/${selectedGuildId}` : null
  );
  
  // Fetch channels for selected guild
  const { data: channels } = useDiscordData<DiscordChannel[]>(
    selectedGuildId ? `channels/${selectedGuildId}` : null
  );
  
  // Fetch messages for selected channel
  const { data: messages, refetch: refetchMessages } = useDiscordData<DiscordMessage[]>(
    selectedChannelId ? `messages/${selectedChannelId}` : null
  );

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-700 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center">
          <Home className="w-5 h-5 mr-2" />
          Discord Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-dark-700">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 p-4 border-r border-dark-700 hidden md:block">
          <GuildSelector 
            guilds={guilds || []}
            selectedGuildId={selectedGuildId}
            onSelect={setSelectedGuildId}
          />
        </div>
        
        {/* Main Area */}
        <div className="flex-1 p-6">
          {!selectedGuildId ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Users className="w-12 h-12 text-gray-500 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">Sélectionnez un serveur</h2>
              <p className="text-gray-500 max-w-md text-center">
                Choisissez un serveur Discord dans la liste à gauche pour commencer à gérer votre communauté.
              </p>
            </div>
          ) : (
            <>
              {/* Guild Header */}
              <div className="flex items-center mb-6">
                {guildDetails?.icon && (
                  <img
                    src={`https://cdn.discordapp.com/icons/${guildDetails.id}/${guildDetails.icon}.webp?size=128`}
                    alt={guildDetails.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold">{guildDetails?.name}</h2>
                  <p className="text-gray-400">{guildDetails?.description}</p>
                </div>
              </div>
              
              {/* Stats */}
              {guildDetails && <StatsOverview guild={guildDetails} className="mb-6" />}
              
              {/* Content Area */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Channels Column */}
                <div className="lg:col-span-1">
                  <ChannelList
                    channels={channels || []}
                    selectedChannelId={selectedChannelId}
                    onSelect={setSelectedChannelId}
                  />
                </div>
                
                {/* Main Content Column */}
                <div className="lg:col-span-3">
                  {selectedChannelId ? (
                    <MessageList
                      messages={messages || []}
                      channelId={selectedChannelId}
                      onNewMessage={refetchMessages}
                    />
                  ) : (
                    <div className="bg-dark-800 rounded-lg p-8 flex flex-col items-center justify-center h-64">
                      <MessageSquare className="w-12 h-12 text-gray-500 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">Sélectionnez un salon</h3>
                      <p className="text-gray-500 text-center">
                        Choisissez un salon textuel pour voir les messages et interagir.
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