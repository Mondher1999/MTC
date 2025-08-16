"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { BookOpen, Stethoscope, Award, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TrainingBenefits() {
  const benefits = [
    {
      icon: BookOpen,
      title: "Fondements Théoriques",
      description:
        "Compréhension approfondie des principes, philosophie et méthodes diagnostiques de la MTC.",
      gradient: "from-red-400 to-rose-500",
    },
    {
      icon: Award,
      title: "Programme Complet",
      description:
        "Acupuncture, phytothérapie, diététique thérapeutique et approches de traitement holistique.",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Stethoscope,
      title: "Applications Pratiques",
      description:
        "Formation pratique aux techniques d'acupuncture et à l'évaluation des patients.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: MapPin,
      title: "Stage en Chine",
      description:
        "Opportunité de stage optionnel en Chine pour une expérience pratique avancée.",
      gradient: "from-yellow-400 to-orange-500",
    },
  ]

  // Parallaxe douce sur le fond
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const yOrbTop = useTransform(scrollYProgress, [0, 1], [0, 60])
  const yOrbBottom = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 sm:py-40 bg-gradient-to-b from-white via-rose-50/50 to-white"
    >
      {/* Fond dynamique : orbes en dégradé + grille subtile + parallaxe */}
      <GradientBackdrop yTop={yOrbTop} yBottom={yOrbBottom} />
      <GridBackdrop />

      <div className="max-w-7xl mx-auto  pt-18 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
            Pourquoi Choisir Notre Programme MTC ?
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Formation complète conçue pour intégrer la sagesse traditionnelle aux pratiques médicales modernes.
          </p>
        </motion.div>

        {/* Cartes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="h-full"
              >
                <Card className="group relative h-full rounded-3xl border border-white/30 bg-white/55 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_22px_55px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out hover:-translate-y-2 hover:rotate-[0.25deg] transform-gpu overflow-hidden">
                  {/* Lueur directionnelle subtile au hover */}
                  <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(244,63,94,0.18), transparent 60%)" }} />
                  <CardContent className="relative p-8 text-center">
                    {/* Icône avec effet de relief/brillance */}
                    <div
                      className={`relative w-20 h-20 rounded-[1.75rem] mx-auto mb-6 grid place-items-center bg-gradient-to-br ${benefit.gradient} shadow-lg ring-1 ring-inset ring-white/20 transition-transform duration-500 group-hover:scale-[1.03]`}
                      style={{
                        boxShadow:
                          "0 10px 22px rgba(0,0,0,0.10), inset -6px -8px 16px rgba(255,255,255,0.28), inset 6px 8px 18px rgba(0,0,0,0.06)",
                      }}
                    >
                      {/* Highlight glossy */}
                      <span className="pointer-events-none absolute inset-x-2 top-1 h-1/3 rounded-[1.25rem] bg-white/30 blur-sm opacity-70" />
                      <Icon className="w-10 h-10 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]" />
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{benefit.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>

                    {/* Liseré bas doux pour l'effet carte */}
                    <div className="mt-6 h-px w-10 mx-auto bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent" />
                  </CardContent>

                  {/* Bordure dégradée subtile */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* Dégradé animé + parallaxe (yTop/yBottom) */
function GradientBackdrop({ yTop, yBottom }: { yTop: any; yBottom: any }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div
        style={{ y: yTop }}
        className="absolute -top-32 right-[-12%] h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-rose-300/40 via-rose-400/30 to-rose-500/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]"
      />
      <motion.div
        style={{ y: yBottom }}
        className="absolute -bottom-36 left-[-14%] h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-red-300/35 via-red-400/25 to-red-500/20 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"
      />
    </div>
  )
}

/* Motif géométrique subtil */
function GridBackdrop() {
  return (
    <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-[0.045] text-neutral-800">
      <defs>
        <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M 42 0 L 0 0 0 42" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="0%" r="85%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#fade)" />
    </svg>
  )
}
