import { Hash, Volume2, Lock } from 'lucide-react';
import { DiscordChannel } from '@/lib/discord/types';
import { Skeleton } from '../ui/skeleton';

interface ChannelListProps {
  channels: DiscordChannel[];
  selectedChannelId?: string;
  onSelect?: (channelId: string) => void;
  className?: string;
  isLoading?: boolean;
}

export function ChannelList({ 
  channels, 
  selectedChannelId, 
  onSelect, 
  className,
  isLoading 
}: ChannelListProps) {
  const textChannels = channels.filter(c => c.type === 0);
  const voiceChannels = channels.filter(c => c.type === 2);

  if (isLoading) {
    return (
      <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-white mb-4">Salons</h3>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Salons</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
          <Hash className="w-4 h-4 mr-1" /> Textuels
        </h4>
        <div className="space-y-1">
          {textChannels.map(channel => (
            <div
              key={channel.id}
              onClick={() => onSelect?.(channel.id)}
              className={`px-3 py-2 rounded-md cursor-pointer flex items-center ${
                selectedChannelId === channel.id
                  ? 'bg-blue-500/20 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
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
              className="px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 cursor-pointer flex items-center"
            >
              <span className="truncate">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}