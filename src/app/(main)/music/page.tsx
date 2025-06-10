'use client'

import { Music, Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, Shuffle, Repeat } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const MusicPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState({
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: '3:20',
    cover: '/images/OpenNumeric.png'
  })
  const [queue, setQueue] = useState([
    { id: 1, title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35' },
    { id: 2, title: 'Starboy', artist: 'The Weeknd, Daft Punk', duration: '3:50' },
    { id: 3, title: 'Take My Breath', artist: 'The Weeknd', duration: '3:42' }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex items-center justify-between fixed w-full md:relative z-30">
        <h1 className="text-xl font-bold flex items-center">
          <Music className="w-5 h-5 mr-2 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Music Player
          </span>
        </h1>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row pt-4 md:pt-0">
        {/* Sidebar - Queue */}
        <div className="hidden md:block w-64 p-4 border-r border-gray-800">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <ListMusic className="w-5 h-5" />
            Queue
            <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full ml-auto">
              {queue.length} songs
            </span>
          </h2>

          <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
            {queue.map(song => (
              <div key={song.id} className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{song.title}</h4>
                    <p className="text-xs text-gray-400">{song.artist}</p>
                  </div>
                  <span className="text-xs text-gray-500">{song.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Area */}
        <div className="flex-1 p-4 md:p-6">
          {/* Now Playing */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-purple-900 to-blue-900 overflow-hidden shadow-lg">
                <img 
                  src={currentSong.cover} 
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{currentSong.title}</h2>
                <p className="text-gray-500 mb-6">{currentSong.artist}</p>

                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="h-1 bg-gray-800 rounded-full mb-1">
                      <div className="h-1 bg-indigo-500 rounded-full w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>1:24</span>
                      <span>{currentSong.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-500">
                      <button className="hover:text-indigo-400 transition-colors">
                        <Shuffle className="w-5 h-5" />
                      </button>
                      <button className="hover:text-indigo-400 transition-colors">
                        <Repeat className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="p-2 hover:text-indigo-400 transition-colors">
                        <SkipBack className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 fill-current" />
                        ) : (
                          <Play className="w-6 h-6 fill-current" />
                        )}
                      </button>
                      <button className="p-2 hover:text-indigo-400 transition-colors">
                        <SkipForward className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-gray-500" />
                      <div className="w-20 h-1 bg-gray-800 rounded-full">
                        <div className="h-1 bg-gray-400 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPage