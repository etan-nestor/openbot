import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ParticlesBackground from '@/components/ui/ParticlesBackground'
import Loading from '@/components/Loading'
import { Toaster } from '@/components/ui/Sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenBot | Discord Bot Dashboard',
  description: 'Advanced dashboard for OpenBot Discord Bot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-900 text-gray-100`}>
        <div className="fixed inset-0 -z-10 opacity-20">
          <ParticlesBackground />
        </div>
        <Loading />
        <main>
          {children}
          <Toaster  />
        </main>
      </body>
    </html>
  )
}