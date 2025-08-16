"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

export function IntroductionSection() {
  const cards = [
    {
      icon: Users,
      title: "Partenariat ATAMTC",
      description:
        "Association tunisienne leader dédiée à la promotion de la Médecine Traditionnelle Chinoise et des pratiques d'acupuncture en Tunisie.",
      gradient: "from-red-400 to-rose-500",
    },
    {
      icon: Globe,
      title: "Collaboration AATC",
      description:
        "Association d'Amitié Tuniso-Chinoise favorisant les échanges culturels et éducatifs entre nos nations.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: GraduationCap,
      title: "Université de Shanghai",
      description:
        "L'Université de Médecine Traditionnelle Chinoise de Shanghai, mondialement reconnue, fournit l'expertise pédagogique et le programme d'études.",
      gradient: "from-yellow-400 to-orange-500",
    },
  ]

  return (
<section className="relative overflow-hidden  mt-28 py-32 sm:py-40 bg-gradient-to-b from-white via-rose-50 to-white">
{/* Fond animé + grille subtile */}
      <GradientBackdrop />
      <GridBackdrop />

      <div className="max-w-7xl mx-auto px-4 pt-18 pb-20  sm:px-6 lg:px-70 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
            Unir la Sagesse Ancestrale à la Médecine Moderne
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Une collaboration révolutionnaire entre l'Association Tunisienne d'Acupuncture et de Médecine Traditionnelle
            Chinoise (ATAMTC), l'Association d'Amitié Tuniso-Chinoise (AATC), et l'Université de Médecine Traditionnelle
            Chinoise de Shanghai.
          </p>
        </motion.div>

        {/* Cartes */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <Card className="rounded-3xl backdrop-blur-lg bg-white/40 shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-3 hover:rotate-[0.5deg] transition-all duration-500 ease-out transform-gpu">
                  <CardContent className="p-8 text-center">
                    {/* Icône avec effet 3D */}
                    <div
                      className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br ${card.gradient} shadow-lg shadow-current/30 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/20 blur-sm opacity-50 animate-pulse" />
                      <Icon className="w-10 h-10 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">{card.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* Dégradé animé */
function GradientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 right-[-10%] h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-red-300/40 via-rose-400/30 to-red-500/20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -bottom-40 left-[-10%] h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-blue-300/40 via-cyan-400/30 to-blue-500/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
    </div>
  )
}

/* Grille subtile */
function GridBackdrop() {
  return (
    <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-[0.04] text-neutral-800">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}
