'use client'

import { motion } from 'framer-motion'
import { BotMessageSquare, Zap } from 'lucide-react'
import SidebarLink from './ui/SidebarLink'

export default function Sidebar() {
  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed h-full w-20 md:w-64 bg-dark-800 border-r border-dark-700 flex flex-col items-center py-8 z-40"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center space-x-3 mb-12 px-4"
      >
        <BotMessageSquare className="text-primary w-8 h-8" />
        <span className="hidden md:block text-xl font-bold text-foreground">
          OpenBot
        </span>
      </motion.div>

      <nav className="w-full flex flex-col items-center md:items-start space-y-2 px-4">
        <SidebarLink icon="Home" text="Dashboard" href="/dashboard" active />
        <SidebarLink icon="Bot" text="Bot" href="/bot" />
        <SidebarLink icon="Settings" text="Settings" href="/settings" />
        <SidebarLink icon="Shield" text="Moderation" href="/moderation" />
        <SidebarLink icon="Music" text="Music" href="/music" />
        <SidebarLink icon="MessageSquare" text="Chat" href="/chat" />
        <SidebarLink icon="Users" text="Users" href="/users" />
      </nav>

      <div className="mt-auto w-full px-4">
        <motion.button
          whileHover={{ scale: 1.03, backgroundColor: 'var(--orangered)' }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-orangered hover:bg-orangered text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 mt-4 transition-colors"
        >
          <Zap className="w-5 h-5" />
          <span className="hidden md:block">Upgrade</span>
        </motion.button>
      </div>
    </motion.div>
  )
}