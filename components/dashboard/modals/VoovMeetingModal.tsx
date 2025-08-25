// 📂 components/modals/voov-meeting-modal.tsx

"use client"

import { useState } from "react"
import { X, ExternalLink, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoovMeetingModalProps {
  isOpen: boolean
  onClose: () => void
  meetingLink: string
  courseName: string
}

export const VoovMeetingModal: React.FC<VoovMeetingModalProps> = ({
  isOpen,
  onClose,
  meetingLink,
  courseName,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!isOpen) return null

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`
          ${isFullscreen
            ? "fixed inset-4"
            : "w-[95vw] h-[90vh] max-w-6xl"}
          bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden
        `}
      >
        {/* 🔹 Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <h3 className="text-lg font-semibold">{courseName}</h3>
            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
              EN DIRECT
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              title={isFullscreen ? "Mode fenêtré" : "Plein écran"}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </Button>
            <Button
              onClick={() => window.open(meetingLink, "_blank")}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink size={20} />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              title="Fermer"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* 🔹 Content */}
        <div className="flex-1 p-2">
          <iframe
            src={meetingLink}
            className="w-full h-full rounded-lg border-0"
            title="Voov Meeting"
            allow="camera; microphone; display-capture; autoplay; clipboard-read; clipboard-write"
            allowFullScreen
          />
        </div>

        {/* 🔹 Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>🎥 Cours en direct</span>
              <span>👥 55 participants connectés</span>
            </div>
            <div className="text-xs">
              Problème de connexion ?
              <button
                onClick={() => window.open(meetingLink, "_blank")}
                className="text-red-600 hover:text-red-700 ml-1 underline"
              >
                Ouvrir dans un nouvel onglet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
