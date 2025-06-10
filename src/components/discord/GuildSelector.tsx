import { DiscordGuild } from '@/lib/discord/types';
import { Skeleton } from '@/components/ui/skeleton';

interface GuildSelectorProps {
  guilds: DiscordGuild[];
  selectedGuildId?: string;
  onSelect?: (guildId: string) => void;
  className?: string;
  isLoading?: boolean;
}

export function GuildSelector({ 
  guilds, 
  selectedGuildId, 
  onSelect, 
  className,
  isLoading 
}: GuildSelectorProps) {
  if (isLoading) {
    return (
      <div className={`rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-white mb-4">Serveurs Discord</h3>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Serveurs Discord</h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {guilds.map(guild => (
          <div
            key={guild.id}
            onClick={() => onSelect?.(guild.id)}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              selectedGuildId === guild.id
                ? 'border border-blue-500'
                : 'hover:bg-gray-600'
            }`}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-white">
              {guild.icon ? (
                <img 
                  src={guild.icon}
                  alt={guild.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                guild.name.charAt(0)
              )}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-white font-medium truncate">{guild.name}</p>
              <p className="text-gray-400 text-sm truncate">
                {guild.owner ? 'Propriétaire' : 'Membre'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}