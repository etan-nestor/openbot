import { useState } from 'react';
import { DiscordAPI } from '@/lib/discord';

type MutationType = 
  | { type: 'sendMessage', channelId: string, content: string }
  | { type: 'createChannel', guildId: string, channelData: any };

export function useDiscordMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const mutate = async (mutation: MutationType) => {
    try {
      setLoading(true);
      setError(null);
      
      let result: any;
      
      switch (mutation.type) {
        case 'sendMessage':
          result = await DiscordAPI.sendMessage(mutation.channelId, mutation.content);
          break;
        case 'createChannel':
          result = await DiscordAPI.createChannel(mutation.guildId, mutation.channelData);
          break;
        default:
          throw new Error('Unknown mutation type');
      }
      
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, data };
}