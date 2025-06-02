// hooks/useDiscordData.ts
import { useState, useEffect } from 'react';
import { DiscordAPI } from '@/lib/discord';
import { DiscordGuild, DiscordGuildDetails, DiscordChannel, DiscordMessage, DiscordMember } from '@/lib/discord/types';

type DiscordEndpoint = 
  | 'guilds'
  | `guild/${string}`
  | `channels/${string}`
  | `messages/${string}`
  | `members/${string}`
  | `roles/${string}`;

export function useDiscordData<T>(endpoint: DiscordEndpoint | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!endpoint) return;
    
    try {
      setLoading(true);
      setError(null);
      
      let result: any;
      
      switch (true) {
        case endpoint === 'guilds':
          result = await DiscordAPI.getGuilds();
          break;
        case endpoint.startsWith('guild/'):
          result = await DiscordAPI.getGuild(endpoint.split('/')[1]);
          break;
        case endpoint.startsWith('channels/'):
          result = await DiscordAPI.getChannels(endpoint.split('/')[1]);
          break;
        case endpoint.startsWith('messages/'):
          result = await DiscordAPI.getMessages(endpoint.split('/')[1]);
          break;
        case endpoint.startsWith('members/'):
          result = await DiscordAPI.getMembers(endpoint.split('/')[1]);
          break;
        case endpoint.startsWith('roles/'):
          result = await DiscordAPI.getRoles(endpoint.split('/')[1]);
          break;
        default:
          throw new Error(`Unknown endpoint: ${endpoint}`);
      }
      
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
}