"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward, 
  Settings, 
  X,
  Clock,
  User,
  Calendar,
  Target,
  BookOpen
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Course {
  _id: string
  courseName: string
  description: string
  instructorName: string
  duration: string
  category: string
  recordingDate: string
  videoFile: string
}

interface VideoPlayerModalProps {
  isOpen: boolean
  onClose: () => void
  course: Course | null
}

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/api" // production → nginx forwards to backend
    : "http://localhost:4002"; // local dev → direct backend

export function VideoPlayerModal({ isOpen, onClose, course }: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()
  const modalRef = useRef<HTMLDivElement>(null)

  // Cleanup et gestion de la fermeture
  useEffect(() => {
    const handleClose = () => {
      if (videoRef.current) {
        videoRef.current.pause()
        setIsPlaying(false)
        setCurrentTime(0)
      }
    }

    if (!isOpen) {
      handleClose()
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isOpen])

  // Gestion des contrôles auto-hide
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      setShowControls(true)
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }
    }

    resetControlsTimeout()
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  // Gestion de la lecture/pause
  const togglePlayPause = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause()
          setIsPlaying(false)
        } else {
          await videoRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.log("Erreur lecture vidéo:", error)
        setIsPlaying(false)
      }
    }
  }

  // Gestion du volume
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Gestion du plein écran
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Avancer/reculer de 10 secondes
  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  // Formatage du temps
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Gestion des événements vidéo
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * duration
    }
  }

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.code) {
        case 'Space':
          e.preventDefault()
          togglePlayPause()
          break
        case 'ArrowLeft':
          e.preventDefault()
          skipTime(-10)
          break
        case 'ArrowRight':
          e.preventDefault()
          skipTime(10)
          break
        case 'KeyM':
          e.preventDefault()
          toggleMute()
          break
        case 'KeyF':
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, isPlaying])

  if (!course) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={modalRef}
        className={cn(
          "max-w-6xl w-full h-[90vh] p-0 bg-black border-0 overflow-hidden",
          isFullscreen && "max-w-none w-screen h-screen"
        )}
      >
        {/* Titre caché pour l'accessibilité */}
        <DialogTitle className="sr-only">
          Lecture du cours : {course?.courseName}
        </DialogTitle>
        
        {/* Video Container - Prend maintenant toute la hauteur */}
        <div 
          className="relative w-full h-full bg-black group cursor-pointer"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          onClick={togglePlayPause}
        >
          {/* Video Element */}
          <video
          ref={videoRef}
          src={`${API_BASE}${(course?.videoFile ?? '').startsWith("/") 
            ? course.videoFile 
            : "/" + course.videoFile}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full"
        />



          {/* Loading State */}
          {!duration && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
                <p>Chargement de la vidéo...</p>
              </div>
            </div>
          )}

          {/* Play Button Overlay */}
          <AnimatePresence>
            {!isPlaying && duration > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Button
                  size="lg"
                  className="rounded-full w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30"
                  onClick={async (e) => {
                    e.stopPropagation()
                    await togglePlayPause()
                  }}
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6"
              >
                {/* Progress Bar */}
                <div 
                  className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer group/progress"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-orange-500 rounded-full transition-all group-hover/progress:bg-orange-400"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePlayPause()
                      }}
                      className="text-white hover:bg-white/20 rounded-full p-2"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>

                    {/* Skip Controls */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        skipTime(-10)
                      }}
                      className="text-white hover:bg-white/20 rounded-full p-2"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        skipTime(10)
                      }}
                      className="text-white hover:bg-white/20 rounded-full p-2"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>

                    {/* Time Display */}
                    <span className="text-white text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Playback Speed */}
                    <select
                      value={playbackRate}
                      onChange={(e) => {
                        const rate = parseFloat(e.target.value)
                        setPlaybackRate(rate)
                        if (videoRef.current) {
                          videoRef.current.playbackRate = rate
                        }
                      }}
                      className="bg-white/20 text-white rounded px-2 py-1 text-sm border-0 outline-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="0.5">0.5x</option>
                      <option value="0.75">0.75x</option>
                      <option value="1">1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleMute()
                        }}
                        className="text-white hover:bg-white/20 rounded-full p-2"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          const newVolume = parseFloat(e.target.value)
                          setVolume(newVolume)
                          if (videoRef.current) {
                            videoRef.current.volume = newVolume
                          }
                          setIsMuted(newVolume === 0)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-20 accent-orange-500"
                      />
                    </div>

                    {/* Fullscreen */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFullscreen()
                      }}
                      className="text-white hover:bg-white/20 rounded-full p-2"
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 z-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}