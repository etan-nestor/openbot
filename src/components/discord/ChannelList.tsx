import { DiscordChannel } from '@/lib/discord';
import { Hash, Volume2, Lock } from 'lucide-react';

interface ChannelListProps {
  channels: DiscordChannel[];
  selectedChannelId: string | null;
  onSelect: (channelId: string) => void;
  className?: string;
}

export function ChannelList({ channels, selectedChannelId, onSelect, className }: ChannelListProps) {
  const textChannels = channels.filter(c => c.type === 0);
  const voiceChannels = channels.filter(c => c.type === 2);

  return (
    <div className={`bg-dark-800 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Salons</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
          <Hash className="w-4 h-4 mr-1" /> Textuels
        </h4>
        <div className="space-y-1">
          {textChannels.map(channel => (
            <div
              key={channel.id}
              onClick={() => onSelect(channel.id)}
              className={`px-3 py-2 rounded-md cursor-pointer flex items-center ${
                selectedChannelId === channel.id
                  ? 'bg-primary-500/20 text-white'
                  : 'text-gray-300 hover:bg-dark-700'
              }`}
            >
              {channel.nsfw && <Lock className="w-3 h-3 mr-1 text-red-400" />}
              <span className="truncate">#{channel.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
          <Volume2 className="w-4 h-4 mr-1" /> Vocaux
        </h4>
        <div className="space-y-1">
          {voiceChannels.map(channel => (
            <div
              key={channel.id}
              className="px-3 py-2 rounded-md text-gray-300 hover:bg-dark-700 cursor-pointer flex items-center"
            >
              <span className="truncate">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}