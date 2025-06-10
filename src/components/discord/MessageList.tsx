import { useState } from 'react';
import { DiscordMessage } from '@/lib/discord/types';
import { Skeleton } from '@/components/ui/skeleton';

interface MessageListProps {
  messages: DiscordMessage[];
  channelId?: string;
  onNewMessage?: () => void;
  className?: string;
  isLoading?: boolean;
}

export function MessageList({ 
  messages, 
  channelId, 
  onNewMessage, 
  className,
  isLoading 
}: MessageListProps) {
  const [messageContent, setMessageContent] = useState('');

  if (isLoading) {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {channelId && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-300">Salon: {channelId}</h3>
          {onNewMessage && (
            <button 
              onClick={onNewMessage}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Actualiser
            </button>
          )}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-700 flex items-center justify-center text-white">
                {message.author.avatar ? (
                  <img
                    src={message.author.avatar}
                    alt={message.author.username}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  message.author.username.charAt(0)
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-semibold text-white mr-2">
                    {message.author.username}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-100 mt-1 whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-800 p-3 rounded-lg">
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Envoyer un message..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={!messageContent.trim()}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}