'use client'

import { Music, Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, Shuffle, Repeat, Heart, MoreHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const MusicPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('none')
  const [volume, setVolume] = useState(80)
  const [currentTime, setCurrentTime] = useState(104) // in seconds
  const [currentSong, setCurrentSong] = useState({
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    cover: '/images/OpenNumeric.png',
    isLiked: false
  })
  const [queue, setQueue] = useState([
    { id: 1, title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', isLiked: true },
    { id: 2, title: 'Starboy', artist: 'The Weeknd, Daft Punk', album: 'Starboy', duration: '3:50', isLiked: false },
    { id: 3, title: 'Take My Breath', artist: 'The Weeknd', album: 'Dawn FM', duration: '3:42', isLiked: true },
    { id: 4, title: 'Die For You', artist: 'The Weeknd', album: 'Starboy', duration: '4:20', isLiked: false },
    { id: 5, title: 'In Your Eyes', artist: 'The Weeknd', album: 'After Hours', duration: '3:58', isLiked: true }
  ])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleSkipForward = () => {
    const currentIndex = queue.findIndex(song => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % queue.length
    setCurrentSong({ ...queue[nextIndex], cover: '/images/OpenNumeric.png', isLiked: queue[nextIndex].isLiked })
  }

  const handleSkipBackward = () => {
    const currentIndex = queue.findIndex(song => song.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length
    setCurrentSong({ ...queue[prevIndex], cover: '/images/OpenNumeric.png', isLiked: queue[prevIndex].isLiked })
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value))
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value))
  }

  const toggleLike = () => {
    setCurrentSong({ ...currentSong, isLiked: !currentSong.isLiked })
  }

  const toggleRepeatMode = () => {
    setRepeatMode(prev => {
      if (prev === 'none') return 'all'
      if (prev === 'all') return 'one'
      return 'none'
    })
  }

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
              <div 
                key={song.id} 
                className={`p-3 rounded-lg hover:bg-gray-800 transition-all cursor-pointer ${currentSong.id === song.id ? 'bg-indigo-900/20' : 'bg-gray-800/50'}`}
                onClick={() => setCurrentSong({ ...song, cover: '/images/OpenNumeric.png', isLiked: song.isLiked })}
              >
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <h4 className={`font-medium truncate ${currentSong.id === song.id ? 'text-indigo-400' : 'text-white'}`}>{song.title}</h4>
                    <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {song.isLiked && (
                      <Heart className="w-3 h-3 text-red-400 fill-current" />
                    )}
                    <span className="text-xs text-gray-500">{song.duration}</span>
                  </div>
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

              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h2 className="text-2xl font-bold truncate">{currentSong.title}</h2>
                    <p className="text-gray-500 mb-2">{currentSong.artist}</p>
                    <p className="text-xs text-gray-600">{currentSong.album}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={toggleLike}
                      className={`p-2 rounded-full hover:bg-gray-800 ${currentSong.isLiked ? 'text-red-400' : 'text-gray-500'}`}
                    >
                      <Heart className="w-5 h-5" fill={currentSong.isLiked ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-800 text-gray-500">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {/* Progress Bar */}
                  <div>
                    <input
                      type="range"
                      min="0"
                      max={220} // Total duration in seconds
                      value={currentTime}
                      onChange={handleProgressChange}
                      className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{currentSong.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setIsShuffled(!isShuffled)}
                        className={`hover:text-indigo-400 transition-colors ${isShuffled ? 'text-indigo-400' : 'text-gray-500'}`}
                      >
                        <Shuffle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={toggleRepeatMode}
                        className={`hover:text-indigo-400 transition-colors ${
                          repeatMode === 'none' ? 'text-gray-500' : 
                          repeatMode === 'all' ? 'text-indigo-400' : 
                          'text-indigo-600'
                        }`}
                      >
                        <Repeat className="w-5 h-5" />
                        {repeatMode === 'one' && (
                          <span className="absolute -mt-2 ml-1 text-xs">1</span>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <button 
                        onClick={handleSkipBackward}
                        className="p-2 hover:text-indigo-400 transition-colors text-gray-300"
                      >
                        <SkipBack className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all text-white"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 fill-current" />
                        ) : (
                          <Play className="w-6 h-6 fill-current" />
                        )}
                      </button>
                      <button 
                        onClick={handleSkipForward}
                        className="p-2 hover:text-indigo-400 transition-colors text-gray-300"
                      >
                        <SkipForward className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 w-24">
                      <Volume2 className="w-5 h-5 text-gray-500" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Played Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Recently Played</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {queue.slice(0, 5).map(song => (
                <div 
                  key={song.id}
                  className="bg-gray-900 rounded-lg p-3 border border-gray-800 hover:bg-gray-800/50 transition-all cursor-pointer"
                  onClick={() => setCurrentSong({ ...song, cover: '/images/OpenNumeric.png', isLiked: song.isLiked })}
                >
                  <div className="w-full aspect-square rounded-md bg-gradient-to-br from-purple-900 to-blue-900 mb-3 overflow-hidden">
                    <img 
                      src="/images/OpenNumeric.png" 
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium truncate">{song.title}</h4>
                  <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPage