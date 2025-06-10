'use client'

import { motion } from 'framer-motion'
import { BotMessageSquare, Zap, Menu, Home, Bot, Settings, Shield, Music, MessageSquare, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SidebarLink = ({ icon, text, href, active = false, minimized }: { 
  icon: string, 
  text: string, 
  href: string, 
  active?: boolean,
  minimized?: boolean
}) => {
  const IconComponent = ({
    'Home': Home,
    'Bot': Bot,
    'Settings': Settings,
    'Shield': Shield,
    'Music': Music,
    'MessageSquare': MessageSquare,
    'Users': Users
  }[icon] || Home)

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center p-3 rounded-lg transition-colors w-full",
        active ? "bg-primary/10 text-primary" : "hover:bg-dark-700 text-gray-300"
      )}
    >
      <IconComponent className="w-5 h-5" />
      {!minimized && <span className="ml-3">{text}</span>}
    </motion.a>
  )
}

export default function Sidebar({ 
  onToggleMinimized,
  initialMinimized = false
}: { 
  onToggleMinimized?: (minimized: boolean) => void,
  initialMinimized?: boolean
}) {
  const [isMinimized, setIsMinimized] = useState(initialMinimized)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) setIsMinimized(true)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    const newState = !isMinimized
    setIsMinimized(newState)
    onToggleMinimized?.(newState)
  }

  return (
    <>
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-dark-800 text-white shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <motion.div 
        initial={{ 
          x: isMobile ? -300 : 0,
          width: isMobile ? 300 : isMinimized ? 80 : 256
        }}
        animate={{ 
          x: isMinimized && isMobile ? -300 : 0,
          width: isMobile ? 300 : isMinimized ? 80 : 256
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={cn(
          "fixed h-full bg-dark-800 border-r border-dark-700 flex flex-col py-8 z-40",
          isMobile ? "w-[300px]" : ""
        )}
      >
        <div className="flex items-center justify-between px-4 mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 overflow-hidden"
          >
            <BotMessageSquare className="text-primary w-8 h-8 min-w-[32px]" />
            {!isMinimized && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-foreground whitespace-nowrap"
              >
                OpenBot
              </motion.span>
            )}
          </motion.div>

          {!isMobile && (
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-dark-700 text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 w-full px-2 space-y-1 overflow-y-auto">
          <SidebarLink 
            icon="Home" 
            text="Dashboard" 
            href="/dashboard" 
            active={pathname === '/dashboard'}
            minimized={isMinimized}
          />
          <SidebarLink 
            icon="Bot" 
            text="Bot" 
            href="/bot" 
            active={pathname === '/bot'}
            minimized={isMinimized}
          />
          <SidebarLink 
            icon="Settings" 
            text="Settings" 
            href="/settings" 
            active={pathname === '/settings'}
            minimized={isMinimized}
          />
          <SidebarLink 
            icon="Shield" 
            text="Moderation" 
            href="/moderation" 
            active={pathname === '/moderation'}
            minimized={isMinimized}
          />
          <SidebarLink 
            icon="Music" 
            text="Music" 
            href="/music" 
            active={pathname === '/music'}
            minimized={isMinimized}
          />
          <SidebarLink 
            icon="MessageSquare" 
            text="Chat" 
            href="/chat" 
            active={pathname === '/chat'}
            minimized={isMinimized}
          />
          <SidebarLink 
            icon="Users" 
            text="Users" 
            href="/users" 
            active={pathname === '/users'}
            minimized={isMinimized}
          />
        </nav>

        <div className="w-full px-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: 'var(--orangered)' }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full bg-orangered hover:bg-orangered text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition-colors",
              isMinimized ? "justify-center" : "justify-between"
            )}
          >
            <Zap className="w-5 h-5" />
            {!isMinimized && <Link href="/upgrade"><span>Upgrade</span></Link> }
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}