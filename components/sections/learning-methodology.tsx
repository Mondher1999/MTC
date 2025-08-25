"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Users, Award, ChevronRight } from "lucide-react"

export function LearningMethodology() {
  const [currentLang, setCurrentLang] = useState('fr') // Défaut en français

  // Objet de traductions
  const translations = {
    en: {
      badge: "TCM Training",
      title: "Hybrid Learning",
      subtitle: "Where students discover theoretical concepts remotely and put them into practice during face-to-face sessions with the support of our experts.",
      steps: {
        theory: {
          title: "Remote Theory",
          description: "Students explore fundamental TCM concepts remotely before applying them in face-to-face sessions, promoting prior understanding."
        },
        practice: {
          title: "Practical Support",
          description: "Interactive sessions allow students to work on practical cases with personalized support from our experts."
        },
        mastery: {
          title: "Autonomous Mastery",
          description: "Encourage student autonomy, strengthen their active participation and improve their engagement through targeted content and practical activities."
        }
      },
      badges: {
        sessions: "Face-to-face sessions",
        support: "Online support",
        evaluations: "Continuous assessments",
        coaching: "Expert coaching"
      },
      buttons: {
        join: "Join the training",
        discover: "Discover the program"
      }
    },
    fr: {
      badge: "Formation MTC",
      title: "L'Apprentissage Hybride",
      subtitle: "Où les apprenants découvrent les concepts théoriques à distance et les mettent en pratique lors de sessions présentielles avec l'accompagnement de nos experts.",
      steps: {
        theory: {
          title: "Théorie à Distance",
          description: "Les apprenants explorent les concepts fondamentaux de la MTC à distance avant de les appliquer en sessions présentielles, favorisant une compréhension préalable."
        },
        practice: {
          title: "Accompagnement Pratique",
          description: "Les sessions interactives permettent aux apprenants de travailler sur des cas pratiques avec un accompagnement personnalisé de nos experts."
        },
        mastery: {
          title: "Maîtrise Autonome",
          description: "Encourager l'autonomie des apprenants, renforcer leur participation active et améliorer leur engagement grâce à du contenu ciblé et des activités pratiques."
        }
      },
      badges: {
        sessions: "Sessions présentielles",
        support: "Supports en ligne",
        evaluations: "Évaluations continues",
        coaching: "Coaching expert"
      },
      buttons: {
        join: "Rejoindre la formation",
        discover: "Découvrir le programme"
      }
    },
    zh: {
      badge: "中医培训",
      title: "混合式学习",
      subtitle: "学生远程学习理论概念，然后在我们专家的支持下在面授课程中将其付诸实践。",
      steps: {
        theory: {
          title: "远程理论学习",
          description: "学生在面授课程中应用之前，先远程探索中医基础概念，促进预先理解。"
        },
        practice: {
          title: "实践指导",
          description: "互动课程允许学生在我们专家的个性化支持下处理实际案例。"
        },
        mastery: {
          title: "自主掌握",
          description: "通过有针对性的内容和实践活动，鼓励学生自主学习，加强积极参与并提高学习投入度。"
        }
      },
      badges: {
        sessions: "面授课程",
        support: "在线支持",
        evaluations: "持续评估",
        coaching: "专家指导"
      },
      buttons: {
        join: "加入培训",
        discover: "了解课程"
      }
    }
  }

  // Fonction de traduction
  const t = (key: string, options?: { defaultValue?: string }) => {
    const keys = key.split('.')
    let value: any = translations[currentLang as keyof typeof translations] || translations.fr
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || options?.defaultValue || key
  }

  // Écouter les changements de langue
  useEffect(() => {
    const handleLanguageChange = (event: any) => {
      if (event.detail?.language) {
        setCurrentLang(event.detail.language)
      }
    }

    window.addEventListener('languageChanged', handleLanguageChange)
    
    // Charger la préférence de langue sauvegardée
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang) {
      setCurrentLang(savedLang)
    }

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
    }
  }, [])

  const steps: Step[] = [
    {
      id: 1,
      titleKey: "steps.theory.title",
      descriptionKey: "steps.theory.description",
      Icon: BookOpen,
    },
    {
      id: 2,
      titleKey: "steps.practice.title",
      descriptionKey: "steps.practice.description",
      Icon: Users,
    },
    {
      id: 3,
      titleKey: "steps.mastery.title",
      descriptionKey: "steps.mastery.description",
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

      <div className="relative mx-auto pt-18 max-w-7xl px-4 sm:px-6 lg:px-8">
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
            {t('badge')}
          </span>

          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-neutral-900 sm:text-5xl">
            <span className="bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600">
            {t('subtitle')}
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
              <StepCard key={step.id} step={step} index={idx} t={t} />
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
          <Badge>{t('badges.sessions')}</Badge>
          <Badge>{t('badges.support')}</Badge>
          <Badge>{t('badges.evaluations')}</Badge>
          <Badge>{t('badges.coaching')}</Badge>
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
            {t('buttons.join')}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#programme"
            className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-black/5 transition hover:bg-neutral-50"
          >
            {t('buttons.discover')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

interface Step {
  id: number
  titleKey: string
  descriptionKey: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function StepCard({ step, index, t }: { step: Step; index: number; t: (key: string) => string }) {
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
        <h3 className="text-xl font-bold text-neutral-900">{t(step.titleKey)}</h3>
        <p className="mt-3 text-base leading-relaxed text-neutral-600">{t(step.descriptionKey)}</p>
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