"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Sparkles } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SharedGradientBackdrop, SharedGridBackdrop } from "@/components/SharedBackdrop"
import Link from "next/link"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentLang, setCurrentLang] = useState('fr') // Défaut en français

  // Objet de traductions
  const translations = {
    en: {
      badge: 'China-Tunisia Partnership Platform',
      title: {
        part1: 'Master Traditional Chinese Medicine on our',
        part2: 'Global Excellence Platform'
      },
      description: 'Join our revolutionary hybrid training platform designed for Tunisian healthcare professionals. Learn from Shanghai University experts and develop your practical skills in acupuncture, phytotherapy and therapeutic dietetics.',
      buttons: {
        access: 'Access Platform',
        discover: 'Discover Platform'
      },
      imageAlt: 'TCM Training Platform - Interactive Interface'
    },
    fr: {
      badge: 'Plateforme Partenariat Chine-Tunisie',
      title: {
        part1: 'Maîtrisez la Médecine Traditionnelle Chinoise sur notre',
        part2: 'Plateforme d\'Excellence Mondiale'
      },
      description: 'Rejoignez notre plateforme de formation hybride révolutionnaire conçue pour les professionnels de santé tunisiens. Apprenez auprès d\'experts de l\'Université de Shanghai et développez vos compétences pratiques en acupuncture, phytothérapie et diététique thérapeutique.',
      buttons: {
        access: 'Accéder à la Plateforme',
        discover: 'Découvrir la Plateforme'
      },
      imageAlt: 'Plateforme de Formation MTC - Interface Interactive'
    },
    zh: {
      badge: '中突合作平台',
      title: {
        part1: '在我们的',
        part2: '全球卓越平台上掌握中医药'
      },
      description: '加入我们为突尼斯医疗专业人士设计的革命性混合培训平台。向上海大学专家学习，发展您在针灸、中药治疗和食疗方面的实践技能。',
      buttons: {
        access: '访问平台',
        discover: '探索平台'
      },
      imageAlt: '中医培训平台 - 互动界面'
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

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-30 sm:pt-44 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <Badge className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 mb-4 animate-pulse-glow">
              <Sparkles className="w-4 h-4 mr-2 text-red-500" />
              {t('badge')}
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-6 leading-tight">
              {t('title.part1')}
              <span className="text-red-600">
                {" "}{t('title.part2')}
              </span>
            </h1>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              {t('description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 shadow-lg shadow-red-600/30 rounded-lg transition">
                  {t('buttons.access')}
                </button>
              </Link>
              
              <Button
                size="lg"
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                {t('buttons.discover')}
              </Button>
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-gradient-to-br from-red-100/50 to-red-200/30 rounded-2xl p-8 relative overflow-hidden hover:scale-[1.02] transition">
              <Image
                src="/tcm-china-tunisia.png"
                alt={t('imageAlt')}
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
                priority
              />
              <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg">
                <Globe className="w-6 h-6 text-red-600" />
              </div>
              {/* Effets de lumière */}
              <div className="absolute -top-2 -left-2 w-20 h-20 bg-red-300/20 rounded-full blur-xl"></div>
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-400/20 rounded-full blur-xl"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}