'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ActivityItemProps {
  icon: LucideIcon
  title: string
  description: string
  time: string
}

export default function ActivityItem({ icon: Icon, title, description, time }: ActivityItemProps) {
  return (
    <motion.div 
      whileHover={{ x: 5, backgroundColor: 'rgba(30, 30, 35, 0.7)' }}
      className="flex items-start space-x-3 p-3 hover:bg-dark-700/50 rounded-lg transition-all cursor-pointer"
    >
      <div className="mt-1">
        <Icon className="w-5 h-5 text-primary-500" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="text-gray-500 text-sm whitespace-nowrap">
        {time}
      </div>
    </motion.div>
  )
}