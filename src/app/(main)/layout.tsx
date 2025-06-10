'use client'

import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar 
        onToggleMinimized={setIsSidebarMinimized} 
        initialMinimized={isSidebarMinimized}
      />
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isSidebarMinimized ? "md:ml-20" : "md:ml-64"
      )}>
        {children}
      </main>
    </div>
  )
}