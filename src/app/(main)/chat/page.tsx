'use client'

import { MessageSquare, Send, Smile, Plus, Menu, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      name: 'Support',
      text: 'Hello! How can I help you today?',
      time: '10:00 AM',
      accent: 'orange' // Nouveau: couleur d'accent
    },
    {
      id: 2,
      sender: 'user',
      name: 'You',
      text: 'I need help with my account',
      time: '10:02 AM',
      accent: 'indigo'
    },
    {
      id: 3,
      sender: 'bot',
      name: 'Support',
      text: 'Sure! What do you need?',
      time: '10:03 AM',
      accent: 'green' // Nouveau: couleur d'accent
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim()) {
      const accents = ['orange', 'green', 'indigo', 'purple']
      const randomAccent = accents[Math.floor(Math.random() * accents.length)]

      const newMsg = {
        id: messages.length + 1,
        sender: 'user',
        name: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        accent: 'indigo'
      }

      setMessages([...messages, newMsg])
      setNewMessage('')

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 2,
          sender: 'bot',
          name: 'Support',
          text: `Thanks for your message! We'll get back to you soon.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          accent: randomAccent // Couleur aléatoire pour le bot
        }])
      }, 1000)
    }
  }

  // Fonction pour les classes de couleur
  const getAccentColor = (accent: string, type: 'bg' | 'text' | 'border') => {
    switch (accent) {
      case 'orange': return `${type}-orange-500 ${type}-opacity-20`
      case 'green': return `${type}-emerald-500 ${type}-opacity-20`
      case 'purple': return `${type}-purple-500 ${type}-opacity-20`
      default: return `${type}-indigo-500 ${type}-opacity-20`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white">
      {/* Header transparent avec bordure subtile */}
      <header className="p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-indigo-400" />
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Chat
          </h1>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-800/50 transition-colors">
          <Menu className="w-5 h-5 text-gray-400" />
        </button>
      </header>

      {/* Zone de chat principale */}
      <main className="max-w-4xl mx-auto p-4 md:p-6 h-[calc(100vh-120px)] flex flex-col">
        <div className="flex-1 rounded-lg overflow-y-auto custom-scrollbar space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs md:max-w-md relative overflow-hidden ${message.sender === 'user'
                    ? 'bg-gray-800/60 border-l-4 border-indigo-500/50'
                    : `bg-gray-800/40 ${getAccentColor(message.accent, 'border')} border-l-4`
                    }`}
                >
                  {/* Barre d'accent colorée */}
                  <div className={`absolute left-0 top-0 h-full w-1 ${getAccentColor(message.accent, 'bg')}`} />

                  <div className="relative z-10">
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === 'bot' ? (
                        <Bot className={`w-4 h-4 ${getAccentColor(message.accent, 'text')}`} />
                      ) : (
                        <User className="w-4 h-4 text-indigo-400" />
                      )}
                      <span className="text-xs font-medium text-gray-300">{message.name}</span>
                    </div>
                    <p className="text-white/90">{message.text}</p>
                    <p className="text-xs text-gray-400 mt-1 text-right">{message.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie avec touches de couleur */}
        <div className="mt-4 bg-gray-800/30 rounded-lg p-2 border border-gray-700/30 backdrop-blur-sm">
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-orange-500/20 transition-colors">
              <Plus className="w-5 h-5 text-orange-400/80" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="w-full bg-gray-700/20 border border-gray-600/30 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-green-500/30 placeholder-gray-400/60 transition-all"
              />
              <button className="absolute right-3 top-3 text-gray-400 hover:text-purple-400/80 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className={`p-2 rounded-lg bg-indigo-500/30 hover:bg-indigo-500/40 transition-all ${!newMessage.trim() ? 'opacity-50' : ''}`}
            >
              <Send className="w-5 h-5 text-indigo-300" />
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

export default ChatPage