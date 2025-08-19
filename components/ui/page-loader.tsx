"use client"

import { useLoading } from "@/contexts/LoadingContext"

export function PageLoader() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 backdrop-blur-sm">
      <div className="relative">
        {/* Main spinner */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-600 border-t-red-500 shadow-lg"></div>

        {/* Outer ring */}
        <div className="absolute -inset-2 h-20 w-20 animate-pulse rounded-full border-2 border-red-500/30"></div>

        {/* Inner dot */}
        <div className="absolute inset-6 h-4 w-4 animate-bounce rounded-full bg-red-500 shadow-lg"></div>

        {/* Floating particles */}
        <div className="absolute -inset-8">
          <div className="absolute top-0 left-4 h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75 delay-75"></div>
          <div className="absolute top-4 right-0 h-1.5 w-1.5 animate-ping rounded-full bg-orange-400 opacity-75 delay-150"></div>
          <div className="absolute bottom-0 right-4 h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75 delay-300"></div>
          <div className="absolute bottom-4 left-0 h-1.5 w-1.5 animate-ping rounded-full bg-orange-400 opacity-75 delay-500"></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute mt-24 text-center">
        <div className="flex items-center space-x-1">
          <span className="text-lg font-medium text-white">Chargement</span>
          <div className="flex space-x-1">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-500 delay-0"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-500 delay-75"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-500 delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
