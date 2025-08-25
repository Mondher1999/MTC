"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇹🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ]

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  // Try to get i18n instance if available
  useEffect(() => {
    // Check if i18n is available globally
    if (typeof window !== 'undefined' && (window as any).i18n) {
      const i18nInstance = (window as any).i18n
      setCurrentLang(i18nInstance.language || 'en')
    }

    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode)
    setIsOpen(false)

    // Store in localStorage for persistence
    localStorage.setItem('preferredLanguage', langCode)

    // Emit custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: langCode } 
    }))

    // Force a re-render by updating the document attribute
    document.documentElement.setAttribute('lang', langCode)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.language-selector')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative language-selector">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-foreground hover:text-red-600 transition-all duration-300"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">{currentLanguage.flag} {currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-background border border-border rounded-lg shadow-2xl z-50 min-w-[150px] overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                currentLang === lang.code ? 'bg-red-50 text-red-600 border-l-2 border-l-red-600' : 'text-foreground'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector