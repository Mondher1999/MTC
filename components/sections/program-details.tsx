"use client"

import { Clock, BookOpen, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ProgramDetails() {
  const [currentLang, setCurrentLang] = useState('fr') // Défaut en français

  // Objet de traductions
  const translations = {
    en: {
      title: "Program Structure and Details",
      subtitle: "Our hybrid format combines the flexibility of virtual learning with hands-on sessions, specifically designed for active healthcare professionals.",
      features: {
        duration: {
          title: "Duration and Format",
          description: "12-month hybrid program with weekly virtual sessions and monthly practical workshops"
        },
        subjects: {
          title: "Main Subjects",
          description: "TCM Theory, Acupuncture, Chinese Phytotherapy, Therapeutic Dietetics, Diagnostic Methods"
        },
        internship: {
          title: "China Internship Option",
          description: "2-week intensive training program at Shanghai University facilities (optional)"
        }
      },
      highlightsTitle: "Program Highlights",
      highlights: [
        "Expert instructors from Shanghai University",
        "Interactive virtual learning platform",
        "Hands-on workshops in person",
        "International certification"
      ],
      imageAlt: "TCM Training Program"
    },
    fr: {
      title: "Structure et Détails du Programme",
      subtitle: "Notre format hybride combine la flexibilité de l'apprentissage virtuel avec des sessions pratiques, conçu spécifiquement pour les professionnels de santé en activité.",
      features: {
        duration: {
          title: "Durée et Format",
          description: "Programme hybride de 12 mois avec sessions virtuelles hebdomadaires et ateliers pratiques mensuels"
        },
        subjects: {
          title: "Matières Principales",
          description: "Théorie MTC, Acupuncture, Phytothérapie Chinoise, Diététique Thérapeutique, Méthodes de Diagnostic"
        },
        internship: {
          title: "Option Stage en Chine",
          description: "Programme de formation intensive de 2 semaines dans les installations de l'Université de Shanghai (optionnel)"
        }
      },
      highlightsTitle: "Points Forts du Programme",
      highlights: [
        "Instructeurs experts de l'Université de Shanghai",
        "Plateforme d'apprentissage virtuel interactive",
        "Ateliers pratiques en présentiel",
        "Certification internationale"
      ],
      imageAlt: "Programme de Formation MTC"
    },
    zh: {
      title: "课程结构与详情",
      subtitle: "我们的混合式学习模式将虚拟学习的灵活性与实践课程相结合，专为在职医疗专业人士设计。",
      features: {
        duration: {
          title: "学制与形式",
          description: "12个月混合式课程，每周虚拟课程和每月实践工作坊"
        },
        subjects: {
          title: "主要科目",
          description: "中医理论、针灸、中药治疗、食疗、诊断方法"
        },
        internship: {
          title: "中国实习选项",
          description: "在上海大学设施进行为期2周的强化培训项目（可选）"
        }
      },
      highlightsTitle: "课程亮点",
      highlights: [
        "上海大学专家导师",
        "互动虚拟学习平台",
        "面授实践工作坊",
        "国际认证"
      ],
      imageAlt: "中医培训项目"
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

  const features = [
    {
      icon: Clock,
      color: "from-red-400 to-rose-500",
      titleKey: "features.duration.title",
      descriptionKey: "features.duration.description",
    },
    {
      icon: BookOpen,
      color: "from-blue-400 to-cyan-500",
      titleKey: "features.subjects.title",
      descriptionKey: "features.subjects.description",
    },
    {
      icon: MapPin,
      color: "from-green-400 to-emerald-500",
      titleKey: "features.internship.title",
      descriptionKey: "features.internship.description",
    },
  ]

  return (
    <section id="programme" className="relative overflow-hidden py-32 sm:py-36 bg-gradient-to-b from-white via-red-50 to-white">
      <GradientBackdrop />
      <GridBackdrop />

      <div className="max-w-7xl mx-auto px-4 pt-18 pb-20 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Texte et icônes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
              {t('subtitle')}
            </p>

            <div className="space-y-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.titleKey}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="flex items-start space-x-4"
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${feature.color} shadow-lg shadow-black/20 ring-1 ring-white/40 transform transition-transform duration-300 hover:rotate-3 hover:scale-105`}
                      style={{
                        boxShadow: "4px 6px 16px rgba(0,0,0,0.15), inset -2px -2px 6px rgba(255,255,255,0.3)",
                      }}
                    >
                      <Icon className="w-7 h-7 text-white drop-shadow-md" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-1">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-neutral-600">
                        {t(feature.descriptionKey)}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Image + points forts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/20 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="relative group">
              <Image
                src="/tcm-acupuncture-classroom.png"
                alt={t('imageAlt')}
                width={600}
                height={400}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>
            <div className="p-8">
              <h4 className="font-bold text-neutral-900 mb-4">
                {t('highlightsTitle')}
              </h4>
              <ul className="space-y-3 text-neutral-700">
                {translations[currentLang as keyof typeof translations].highlights.map((point: string, i: number) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <Star className="w-5 h-5 text-yellow-400 drop-shadow-sm flex-shrink-0" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* Dégradé animé */
function GradientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 right-[-10%] h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-red-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 left-[-10%] h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-rose-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-pulse-slow" />
    </div>
  )
}

/* Grille subtile */
function GridBackdrop() {
  return (
    <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-[0.04]">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}