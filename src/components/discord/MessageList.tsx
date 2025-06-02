import { DiscordMessage } from '@/lib/discord';
import Image from 'next/image';
import { useDiscordMutation } from '@/hooks/useDiscordMutate';
import { useState } from 'react';

interface MessageListProps {
  messages: DiscordMessage[];
  channelId: string;
  className?: string;
  onNewMessage?: () => void;
}

export function MessageList({ messages, channelId, className, onNewMessage }: MessageListProps) {
  const [messageContent, setMessageContent] = useState('');
  const { mutate: sendMessage, loading: sending } = useDiscordMutation();

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return;
    
    try {
      await sendMessage({
        type: 'sendMessage',
        channelId,
        content: messageContent
      });
      setMessageContent('');
      onNewMessage?.();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className="bg-dark-700 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                {message.author.avatar ? (
                  <Image
                    src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=80`}
                    alt={message.author.username}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-600 flex items-center justify-center text-white">
                    {message.author.username.charAt(0)}
                  </div>
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
      
      <div className="bg-dark-800 p-3 rounded-lg">
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Envoyer un message..."
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          rows={3}
          disabled={sending}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSendMessage}
            disabled={sending || !messageContent.trim()}
            className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {sending ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}