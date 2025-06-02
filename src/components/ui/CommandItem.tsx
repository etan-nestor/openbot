'use client'

import { motion } from 'framer-motion'

interface CommandItemProps {
  name: string
  usage: string
  description: string
}

export default function CommandItem({ name, usage, description }: CommandItemProps) {
  return (
    <motion.div 
      whileHover={{ backgroundColor: 'rgba(30, 30, 35, 0.7)' }}
      className="flex justify-between items-center p-3 rounded-lg border border-dark-700 transition-all cursor-pointer"
    >
      <div>
        <h3 className="font-mono font-medium text-primary-500">{name}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="text-gray-400 text-sm">
        {usage} uses
      </div>
    </motion.div>
  )
}