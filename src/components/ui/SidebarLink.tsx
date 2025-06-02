'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Home, Bot, Settings, Shield, Music, MessageSquare, Users } from 'lucide-react'
import Link from 'next/link'

interface SidebarLinkProps {
  icon: string
  text: string
  href: string
  active?: boolean
}

const iconComponents: Record<string, LucideIcon> = {
  Home,
  Bot,
  Settings,
  Shield,
  Music,
  MessageSquare,
  Users
}

export default function SidebarLink({ icon, text, href, active = false }: SidebarLinkProps) {
  const IconComponent = iconComponents[icon]
  
  return (
    <motion.div
      whileHover={{ 
        x: 5,
        background: active 
          ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 100%)' 
          : 'linear-gradient(90deg, rgba(31, 41, 55, 0.8) 0%, rgba(31, 41, 55, 0.4) 100%)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={`flex items-center space-x-3 w-full py-3 px-4 rounded-lg transition-all duration-300 ${
          active 
            ? 'bg-gradient-to-r from-primary-700/80 to-primary-900/50 text-white shadow-lg' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <span className="w-6 h-6 flex items-center justify-center">
          {IconComponent && <IconComponent className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400'}`} />}
        </span>
        <span className="hidden md:block font-medium">{text}</span>
        {active && (
          <motion.span 
            layoutId="sidebar-active"
            className="absolute right-4 w-2 h-2 bg-orangered-500 rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  )
}