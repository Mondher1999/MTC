"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { AuthForm } from "./auth-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LanguageSelector from "@/components/LanguageSelector"
import { useAuth } from "../../contexts/AuthContext"

export default function AuthBasic() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState('en')

  // Simple translation object as fallback
  const translations = {
    en: {
      logoAlt: 'Logo',
      welcomeTitle: 'Sign In to MTC',
      welcomeSubtitle: 'Access your Dashboard',
      locationHint: 'Language set automatically based on your location'
    },
    fr: {
      logoAlt: 'Logo',
      welcomeTitle: 'Se Connecter à MTC',
      welcomeSubtitle: 'Accéder à votre Dashboard',
      locationHint: 'Langue définie automatiquement selon votre localisation'
    },
    zh: {
      logoAlt: '标志',
      welcomeTitle: '登录到 MTC',
      welcomeSubtitle: '访问您的仪表板',
      locationHint: '系统已根据您的位置自动设置中文'
    }
  }

  // Function to get translation with fallback - now reactive to currentLang
  const t = (key: string, options?: { defaultValue?: string }) => {
    // Use simple fallback translations based on current language state
    const langTranslations = translations[currentLang as keyof typeof translations] || translations.en
    const value = langTranslations[key as keyof typeof langTranslations]
    return value || options?.defaultValue || key
  }

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard")
    }
  }, [user, loading, router])

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event: any) => {
      if (event.detail?.language) {
        setCurrentLang(event.detail.language)
      }
    }

    window.addEventListener('languageChanged', handleLanguageChange)
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
    }
  }, [])

  // Load saved language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-4 overflow-hidden bg-zinc-950 relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black animate-gradient" />

      {/* Floating red orb */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-500/20 rounded-full blur-3xl animate-orb1" />

      {/* Floating blue orb */}
      <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-blue-500/15 rounded-full blur-3xl animate-orb2" />

      <div className="w-full max-w-md z-10 flex flex-col items-center animate-fadeIn">
        {/* Language Selector - Top Right */}
        <div className="w-full flex justify-end mb-6">
          <LanguageSelector />
        </div>

        {/* Logo */}
        <div className="w-24 h-24 relative mb-10 drop-shadow-lg animate-float">
          <Image
            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/to-the-moon-u5UJD9sRK8WkmaTY8HdEsNKjAQ9bjN.svg"
            alt={t('logoAlt')}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-tight text-gray-200">
            {t('welcomeTitle')}
          </h1>
          <p className="text-base text-gray-200 mt-2">
            {t('welcomeSubtitle')}
          </p>
        </div>

        {/* Main Card */}
        <Card className="relative w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden animated-border">
          <CardContent className="p-8">
            <AuthForm />
          </CardContent>
        </Card>

        {/* Language hint */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>{t('locationHint')}</p>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-border::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: inherit;
          background: linear-gradient(90deg, 
            rgba(239, 68, 68, 1) 0%, 
            rgba(255, 255, 255, 0) 50%, 
            rgba(239, 68, 68, 1) 100%
          );
          background-size: 200% 100%;
          animation: borderMove 4s linear infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        
        @keyframes borderMove {
          0% { background-position: 200% 0; }
          100% { background-position: 0% 0; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        @keyframes orbFloat1 {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.2;
          }
          50% { 
            transform: translate(20px, -20px) scale(1.05); 
            opacity: 0.3;
          }
        }
        
        .animate-orb1 {
          animation: orbFloat1 12s ease-in-out infinite;
        }
        
        @keyframes orbFloat2 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.15;
          }
          50% { 
            transform: translate(-20px, 20px) scale(1.05);
            opacity: 0.25;
          }
        }
        
        .animate-orb2 {
          animation: orbFloat2 16s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
          }
          25% { 
            transform: translateY(-4px) rotate(1deg); 
          }
          50% { 
            transform: translateY(-8px) rotate(0deg); 
          }
          75% { 
            transform: translateY(-4px) rotate(-1deg); 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @media (max-width: 640px) {
          .animated-border::before {
            animation-duration: 3s;
          }
          
          .animate-orb1,
          .animate-orb2 {
            animation-duration: 8s;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient,
          .animate-orb1,
          .animate-orb2,
          .animate-float,
          .animated-border::before {
            animation: none;
          }
          
          .animate-fadeIn {
            animation-duration: 0.3s;
          }
        }
      `}</style>
    </main>
  )
}