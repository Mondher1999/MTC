"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function IntroductionSection() {
  const [currentLang, setCurrentLang] = useState('fr') // Défaut en français

  // Objet de traductions
  const translations = {
    en: {
      title: "Uniting Ancient Wisdom with Modern Medicine",
      subtitle: "A revolutionary collaboration between the Tunisian Association of Acupuncture and Traditional Chinese Medicine (ATAMTC), the Tunisia-China Friendship Association (AATC), and Shanghai University of Traditional Chinese Medicine.",
      cards: {
        atamtc: {
          title: "ATAMTC Partnership",
          description: "Leading Tunisian association dedicated to promoting Traditional Chinese Medicine and acupuncture practices in Tunisia."
        },
        aatc: {
          title: "AATC Collaboration",
          description: "Tunisia-China Friendship Association fostering cultural and educational exchanges between our nations."
        },
        university: {
          title: "Shanghai University",
          description: "Shanghai University of Traditional Chinese Medicine, globally recognized, provides pedagogical expertise and curriculum."
        }
      }
    },
    fr: {
      title: "Unir la Sagesse Ancestrale à la Médecine Moderne",
      subtitle: "Une collaboration révolutionnaire entre l'Association Tunisienne d'Acupuncture et de Médecine Traditionnelle Chinoise (ATAMTC), l'Association d'Amitié Tuniso-Chinoise (AATC), et l'Université de Médecine Traditionnelle Chinoise de Shanghai.",
      cards: {
        atamtc: {
          title: "Partenariat ATAMTC",
          description: "Association tunisienne leader dédiée à la promotion de la Médecine Traditionnelle Chinoise et des pratiques d'acupuncture en Tunisie."
        },
        aatc: {
          title: "Collaboration AATC",
          description: "Association d'Amitié Tuniso-Chinoise favorisant les échanges culturels et éducatifs entre nos nations."
        },
        university: {
          title: "Université de Shanghai",
          description: "L'Université de Médecine Traditionnelle Chinoise de Shanghai, mondialement reconnue, fournit l'expertise pédagogique et le programme d'études."
        }
      }
    },
    zh: {
      title: "融合古代智慧与现代医学",
      subtitle: "突尼斯针灸与中医药协会(ATAMTC)、突中友好协会(AATC)与上海中医药大学之间的革命性合作。",
      cards: {
        atamtc: {
          title: "ATAMTC 合作伙伴",
          description: "致力于在突尼斯推广中医药和针灸实践的领先突尼斯协会。"
        },
        aatc: {
          title: "AATC 合作",
          description: "突中友好协会促进我们两国之间的文化和教育交流。"
        },
        university: {
          title: "上海大学",
          description: "享誉全球的上海中医药大学提供教学专业知识和课程体系。"
        }
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

  const cards = [
    {
      icon: Users,
      titleKey: "cards.atamtc.title",
      descriptionKey: "cards.atamtc.description",
      gradient: "from-red-400 to-rose-500",
    },
    {
      icon: Globe,
      titleKey: "cards.aatc.title",
      descriptionKey: "cards.aatc.description",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: GraduationCap,
      titleKey: "cards.university.title",
      descriptionKey: "cards.university.description",
      gradient: "from-yellow-400 to-orange-500",
    },
  ]

  return (
    <section className="relative overflow-hidden mt-28 py-32 sm:py-40 bg-gradient-to-b from-white via-rose-50 to-white">
      {/* Fond animé + grille subtile */}
      <GradientBackdrop />
      <GridBackdrop />

      <div className="max-w-7xl mx-auto px-4 pt-18 pb-20 sm:px-6 lg:px-70 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cartes */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.titleKey}
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
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      {t(card.titleKey)}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {t(card.descriptionKey)}
                    </p>
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