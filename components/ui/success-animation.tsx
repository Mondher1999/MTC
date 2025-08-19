"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface SuccessAnimationProps {
  isVisible: boolean
  onComplete: () => void
  message: string
}

interface Particle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
}

export function SuccessAnimation({ isVisible, onComplete, message }: SuccessAnimationProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (isVisible) {
      const elegantParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.1,
        duration: 3 + Math.random() * 2,
      }))

      setParticles(elegantParticles)

      const timer = setTimeout(() => {
        onComplete()
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md overflow-hidden"
        >
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 4, repeat: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          />

          <motion.div
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)",
                "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)",
                "linear-gradient(225deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)",
                "linear-gradient(315deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)",
              ],
            }}
            transition={{ duration: 3, repeat: 2, ease: "easeInOut", delay: 0.5 }}
            className="absolute inset-0"
          />

          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                opacity: 0,
                scale: 0,
                x: "50vw",
                y: "50vh",
              }}
              animate={{
                opacity: [0, 0.8, 0.6, 0],
                scale: [0, 1.5, 1, 0],
                x: `${particle.x}vw`,
                y: `${particle.y}vh`,
              }}
              transition={{
                duration: particle.duration,
                ease: "easeOut",
                delay: particle.delay,
              }}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400"
              style={{
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(16, 185, 129, 0.3)",
              }}
            />
          ))}

          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`float-${i}`}
              initial={{
                opacity: 0,
                scale: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0, 2, 0],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight - 200],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                ease: "easeOut",
                delay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 rounded-full bg-white/60"
              style={{
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
              }}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: -20, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.3,
              }}
              className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl max-w-md mx-4 border border-white/20"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.6,
                  }}
                  className="mx-auto relative"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: 1,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center relative overflow-hidden"
                  >
                    <Check className="w-8 h-8 text-white z-10" strokeWidth={3} />

                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 0.8,
                    }}
                    className="absolute inset-0 border-2 border-emerald-400 rounded-full"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="space-y-3"
                >
                  <h3 className="text-2xl font-semibold text-gray-900">Opération réussie</h3>
                  <p className="text-gray-600 leading-relaxed">{message}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="flex justify-center"
                >
                  <div className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-full border border-emerald-200/50">
                    <span className="text-sm font-medium text-emerald-700">Terminé avec succès</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
