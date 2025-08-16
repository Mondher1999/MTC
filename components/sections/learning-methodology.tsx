"use client"

import React from "react"
import { motion } from "framer-motion"
import { BookOpen, Users, Award, ChevronRight } from "lucide-react"

export function LearningMethodology() {
  const steps: Step[] = [
    {
      id: 1,
      title: "Théorie à Distance",
      description:
        "Les étudiants explorent les concepts fondamentaux de la MTC à distance avant de les appliquer en sessions présentielles, favorisant une compréhension préalable.",
      Icon: BookOpen,
    },
    {
      id: 2,
      title: "Accompagnement Pratique",
      description:
        "Les sessions interactives permettent aux étudiants de travailler sur des cas pratiques avec un accompagnement personnalisé de nos experts.",
      Icon: Users,
    },
    {
      id: 3,
      title: "Maîtrise Autonome",
      description:
        "Encourager l'autonomie des étudiants, renforcer leur participation active et améliorer leur engagement grâce à du contenu ciblé et des activités pratiques.",
      Icon: Award,
    },
  ]

  return (
    <section
      aria-label="Apprentissage hybride – Formation MTC"
      className="relative overflow-hidden py-24 sm:py-28 bg-gradient-to-b from-white via-red-50 to-white"
    >
      {/* Fond animé */}
      <GradientBackdrop />
      <GridBackdrop />

      <div className="relative mx-auto pt-18   max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-red-600 shadow-sm ring-1 ring-red-500/20">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
            Formation MTC
          </span>

          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-neutral-900 sm:text-5xl">
            <span className="bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
              L'Apprentissage Hybride
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Où les étudiants découvrent les concepts théoriques à distance et les mettent en pratique lors de sessions
            présentielles avec l'accompagnement de nos experts.
          </p>
        </motion.div>

        {/* Timeline + Cartes */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[76px] hidden h-1 md:block"
          >
            <div className="mx-auto max-w-5xl">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
            </div>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {steps.map((step, idx) => (
              <StepCard key={step.id} step={step} index={idx} />
            ))}
          </div>
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          <Badge>Sessions présentielles</Badge>
          <Badge>Supports en ligne</Badge>
          <Badge>Évaluations continues</Badge>
          <Badge>Coaching expert</Badge>
        </motion.div>

        {/* Boutons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/30 ring-1 ring-red-600/20 transition duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-red-600/40"
          >
            Rejoindre la formation
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#programme"
            className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-black/5 transition hover:bg-neutral-50"
          >
            Découvrir le programme
          </a>
        </motion.div>
      </div>
    </section>
  )
}

interface Step {
  id: number
  title: string
  description: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const { Icon } = step
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative rounded-3xl border border-neutral-200/80 bg-white/70 backdrop-blur-lg shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-2 hover:rotate-[0.4deg] transition-all duration-500 ease-out transform-gpu p-6 sm:p-8 group"
    >
      {/* Halo lumineux au survol */}
      <div className="absolute -inset-px rounded-3xl opacity-0 [background:radial-gradient(50%_50%_at_50%_0%,rgba(239,68,68,0.28),transparent)] transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex flex-col items-center text-center relative">
        {/* Icône avec effet 3D */}
        <div className="relative mb-5">
          <div className="absolute inset-0 translate-y-1 rounded-full bg-red-600/40 blur-md" aria-hidden />
          <div className="grid place-items-center h-24 w-24 rounded-full bg-gradient-to-b from-red-500 to-red-600 shadow-xl ring-1 ring-inset ring-white/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-white/20 blur-sm opacity-50 animate-pulse" />
            <Icon className="h-12 w-12 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]" aria-hidden />
          </div>
          <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border border-white bg-red-600 text-xs font-bold text-white shadow-sm">
            {String(step.id).padStart(2, "0")}
          </span>
        </div>

        {/* Titre et description */}
        <h3 className="text-xl font-bold text-neutral-900">{step.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-neutral-600">{step.description}</p>
      </div>
    </motion.article>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm ring-1 ring-black/5">
      {children}
    </span>
  )
}

/* Fond dégradé animé */
function GradientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 right-[-20%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-red-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -bottom-24 left-[-20%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-rose-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
    </div>
  )
}

/* Grille subtile */
function GridBackdrop() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 h-full w-full opacity-[0.05]"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}
