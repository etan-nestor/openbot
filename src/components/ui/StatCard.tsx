'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  title: string
  value: string
  change: string
}

export default function StatCard({ icon: Icon, title, value, change }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl p-6 border border-dark-700/50 hover:border-primary-500/30 transition-all"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1 text-white">{value}</p>
        </div>
        <motion.div 
          whileHover={{ rotate: 10 }}
          className="bg-gradient-to-br from-dark-700 to-dark-800 p-3 rounded-lg border border-dark-600/50"
        >
          <Icon className="w-5 h-5 text-primary-400" />
        </motion.div>
      </div>
      <motion.p 
        animate={{ 
          opacity: [0.8, 1],
          x: [5, 0]
        }}
        transition={{ delay: 0.3 }}
        className={`mt-4 text-sm font-medium ${
          change.startsWith('+') 
            ? 'text-green-400' 
            : 'text-orangered-400'
        }`}
      >
        {change} from last week
      </motion.p>
    </motion.div>
  )
}