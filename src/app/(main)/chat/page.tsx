'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MessageSquare, Send, RefreshCw } from 'lucide-react'


const ChatPage = () => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
    avatar: string;
  }>>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')

  useEffect(() => {
    // Simuler le chargement des messages
    const fetchMessages = async () => {
      setLoading(true)
      try {
        // En production, vous utiliseriez une vraie API
        // const response = await fetch('/api/chat/messages')
        // const data = await response.json()
        
        // Simulation
        await new Promise(resolve => setTimeout(resolve, 1000))
        const mockMessages = [
          {
            id: '1',
            author: 'OpenBot',
            content: 'Hello! How can I help you today?',
            timestamp: '2023-05-15T14:30:00Z',
            avatar: 'https://i.imgur.com/abcdefg.png'
          },
          {
            id: '2',
            author: 'User123',
            content: 'I need help with the music commands',
            timestamp: '2023-05-15T14:32:00Z',
            avatar: 'https://i.imgur.com/hijklmn.png'
          }
        ]
        setMessages(mockMessages)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        author: 'You',
        content: input,
        timestamp: new Date().toISOString(),
        avatar: 'https://i.imgur.com/opqrstu.png'
      }
      setMessages([...messages, newMessage])
      setInput('')
      
      // Simuler une réponse du bot
      setTimeout(() => {
        const botReply = {
          id: (Date.now() + 1).toString(),
          author: 'OpenBot',
          content: `I received: "${input}"`,
          timestamp: new Date().toISOString(),
          avatar: 'https://i.imgur.com/abcdefg.png'
        }
        setMessages(prev => [...prev, botReply])
      }, 1000)
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen flex">
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6 overflow-y-auto ml-20 md:ml-64 transition-all duration-300 flex flex-col"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-primary-500" />
            Chat with OpenBot
          </h1>
          
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.location.reload()}
            className="p-2 rounded-lg hover:bg-dark-700 transition-all"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 text-gray-300 ${loading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        <div className="flex-1 bg-dark-800 rounded-xl p-6 border border-dark-700 mb-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse text-gray-400">Loading messages...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageSquare className="w-12 h-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">No messages yet</h3>
              <p className="text-gray-500 max-w-md">
                Start a conversation with OpenBot by sending a message below.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.author === 'You' || message.author === 'User123' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`flex max-w-[80%] md:max-w-[70%] ${message.author === 'You' || message.author === 'User123' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}
                  >
                    <img 
                      src={message.avatar} 
                      alt={message.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div 
                      className={`p-3 rounded-lg ${message.author === 'You' || message.author === 'User123' ? 'bg-primary-900/30 border border-primary-500/50' : 'bg-dark-700 border border-dark-600'}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{message.author}</span>
                        <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-gray-200">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-800 rounded-xl p-4 border border-dark-700"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-primary-600 hover:bg-primary-500 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}

export default ChatPage