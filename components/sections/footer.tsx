"use client"

import { GraduationCap, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

// Objet de traductions
const translations = {
  en: {
    brandName: "TCM Training",
    brandSubtitle: "China-Tunisia Collaboration",
    description: "Bridging ancient wisdom with modern medicine through professional TCM education.",
    quickLinks: {
      title: "Quick Links",
      links: {
        home: "Home",
        program: "Program Details",
        faq: "FAQ",
        registration: "Registration"
      }
    },
    partners: {
      title: "Partners",
      list: [
        "ATAMTC",
        "AATC",
        "Shanghai University of TCM",
        "Tunisian Ministry of Health"
      ]
    },
    contact: {
      title: "Contact Information"
    },
    footer: {
      copyright: "TCM Training Platform. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use"
    }
  },
  fr: {
    brandName: "Formation MTC",
    brandSubtitle: "Collaboration Chine-Tunisie",
    description: "Unir la sagesse ancestrale à la médecine moderne grâce à l'éducation professionnelle en MTC.",
    quickLinks: {
      title: "Liens Rapides",
      links: {
        home: "Accueil",
        program: "Détails du Programme",
        faq: "FAQ",
        registration: "Inscription"
      }
    },
    partners: {
      title: "Partenaires",
      list: [
        "ATAMTC",
        "AATC",
        "Université MTC de Shanghai",
        "Ministère de la Santé Tunisien"
      ]
    },
    contact: {
      title: "Informations de Contact"
    },
    footer: {
      copyright: "Plateforme de Formation MTC. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation"
    }
  },
  zh: {
    brandName: "中医培训",
    brandSubtitle: "中突合作",
    description: "通过专业中医教育，将古代智慧与现代医学相结合。",
    quickLinks: {
      title: "快速链接",
      links: {
        home: "首页",
        program: "课程详情",
        faq: "常见问题",
        registration: "注册"
      }
    },
    partners: {
      title: "合作伙伴",
      list: [
        "ATAMTC",
        "AATC",
        "上海中医药大学",
        "突尼斯卫生部"
      ]
    },
    contact: {
      title: "联系信息"
    },
    footer: {
      copyright: "中医培训平台。版权所有。",
      privacy: "隐私政策",
      terms: "使用条款"
    }
  }
}

export function Footer() {
  const [currentLang, setCurrentLang] = useState('fr') // Défaut en français

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

  return (
    <footer id="contact" className="bg-gray-50 text-gray-900 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t('brandName')}</h3>
                <p className="text-sm text-red-600">{t('brandSubtitle')}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-500 hover:text-red-600 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">{t('quickLinks.title')}</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#home" className="hover:text-red-600 transition-colors">
                  {t('quickLinks.links.home')}
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-red-600 transition-colors">
                  {t('quickLinks.links.program')}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-600 transition-colors">
                  {t('quickLinks.links.faq')}
                </a>
              </li>
              <li>
                <a href="#registration" className="hover:text-red-600 transition-colors">
                  {t('quickLinks.links.registration')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">{t('partners.title')}</h4>
            <ul className="space-y-2 text-gray-600">
              {translations[currentLang as keyof typeof translations].partners.list.map((partner: string, index: number) => (
                <li key={index}>{partner}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">{t('contact.title')}</h4>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-600" />
                <span>info@formation-mtc.tn</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600" />
                <span>+216 71 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Tunis, Tunisie</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8 text-center text-gray-500">
          <p>
            &copy; 2025 {t('footer.copyright')} | {t('footer.privacy')} | {t('footer.terms')}
          </p>
        </div>
      </div>
    </footer>
  )
}