import { DiscordGuild } from '@/lib/discord';
import Image from 'next/image';

interface GuildSelectorProps {
  guilds: DiscordGuild[];
  selectedGuildId: string | null;
  onSelect: (guildId: string) => void;
  className?: string;
}

export function GuildSelector({ guilds, selectedGuildId, onSelect, className }: GuildSelectorProps) {
  return (
    <div className={`bg-dark-800 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Serveurs Discord</h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {guilds.map(guild => (
          <div
            key={guild.id}
            onClick={() => onSelect(guild.id)}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              selectedGuildId === guild.id
                ? 'bg-primary-500/20 border border-primary-500'
                : 'bg-dark-700 hover:bg-dark-600'
            }`}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              {guild.icon ? (
                <Image
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=80`}
                  alt={guild.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-dark-600 flex items-center justify-center text-white">
                  {guild.name.charAt(0)}
                </div>
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