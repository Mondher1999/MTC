"use client"

import { GraduationCap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import LanguageSelector from "@/components/LanguageSelector" // Adjust path as needed

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const { user, loading } = useAuth()

  // Translation object
  const translations = {
    en: {
      appTitle: 'Formation MTC',
      appSubtitle: 'China-Tunisia Collaboration',
      nav: {
        home: 'Home',
        program: 'Program',
        faq: 'FAQ',
        contact: 'Contact'
      },
      buttons: {
        dashboard: 'Dashboard',
        login: 'Login',
        register: 'Register'
      }
    },
    fr: {
      appTitle: 'Formation MTC',
      appSubtitle: 'Collaboration Chine-Tunisie',
      nav: {
        home: 'Accueil',
        program: 'Programme',
        faq: 'FAQ',
        contact: 'Contact'
      },
      buttons: {
        dashboard: 'Tableau de bord',
        login: 'Connexion',
        register: 'Inscription'
      }
    },
    zh: {
      appTitle: 'MTC培训',
      appSubtitle: '中突合作',
      nav: {
        home: '首页',
        program: '课程',
        faq: '常见问题',
        contact: '联系我们'
      },
      buttons: {
        dashboard: '仪表板',
        login: '登录',
        register: '注册'
      }
    }
  }

  // Translation function
  const t = (key: string, options?: { defaultValue?: string }) => {
    const keys = key.split('.')
    let value: any = translations[currentLang as keyof typeof translations] || translations.en
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || options?.defaultValue || key
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event: any) => {
      if (event.detail?.language) {
        setCurrentLang(event.detail.language)
      }
    }

    window.addEventListener('languageChanged', handleLanguageChange)
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang) {
      setCurrentLang(savedLang)
    }

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
    }
  }, [])

  // Navigation items with translation keys
  const navItems = [
    { href: "home", labelKey: "nav.home" },
    { href: "programme", labelKey: "nav.program" },
    { href: "faq", labelKey: "nav.faq" },
    { href: "contact", labelKey: "nav.contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-md shadow-lg border-b border-border"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('appTitle')}</h1>
              <p className="text-xs text-red-600">{t('appSubtitle')}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const section = document.getElementById(item.href)
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" })
                      window.history.pushState(null, "", window.location.pathname)
                    }
                  }}
                  className="text-muted-foreground hover:text-red-600 font-medium transition-colors"
                >
                  {t(item.labelKey)}
                </a>
              ))}
            </nav>

            {/* Language Selector */}
        
            {/* Boutons */}
            <div className="flex items-center space-x-4">
              {user ? (
                // Si l'utilisateur est connecté
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-br from-red-500 to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transform transition-all duration-300 shadow-lg shadow-red-500/40 hover:scale-105 hover:shadow-xl hover:shadow-red-500/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {t('buttons.dashboard')}
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className="bg-gradient-to-br from-red-500 to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transform transition-all duration-300 shadow-lg shadow-red-500/40 hover:scale-105 hover:shadow-xl hover:shadow-red-500/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    {t('buttons.login')}
                  </Link>

                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById("contact");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", window.location.pathname);
                      }
                    }}
                    href="#contact"
                    className="bg-gradient-to-br from-black to-black text-white px-5 py-2.5 rounded-lg font-semibold transform transition-all duration-300 shadow-lg shadow-red-500/40 hover:scale-105 hover:shadow-xl hover:shadow-red-500/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    {t('buttons.register')}
                  </a>
                </>
              )}
            </div>
            <LanguageSelector />

          </div>
        </div>
      </div>
      
    </header>
  )
}