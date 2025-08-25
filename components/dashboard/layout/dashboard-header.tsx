"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  PanelLeft,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  Monitor,
  MessageCircle,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useLoading } from "@/contexts/LoadingContext"
import { useAuth } from "@/contexts/AuthContext"

interface DashboardHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
}

export function DashboardHeader({ sidebarOpen, setSidebarOpen, setMobileMenuOpen }: DashboardHeaderProps) {
  const notifications = 3
  const router = useRouter()
  const { startLoading, stopLoading } = useLoading()
  const { user, logout: authLogout } = useAuth()

  // Language state
  const [currentLang, setCurrentLang] = useState('en')

  // Translation object
  const translations = {
    en: {
      appTitle: 'Formation MTC ',
      logout: 'Sign Out'
    },
    fr: {
      appTitle: 'Formation MTC',
      logout: 'Se déconnecter'
    },
    zh: {
      appTitle: 'MTC培训',
      logout: '登出'
    }
  }

  // Translation function
  const t = (key: string, options?: { defaultValue?: string }) => {
    const langTranslations = translations[currentLang as keyof typeof translations] || translations.en
    const value = langTranslations[key as keyof typeof langTranslations]
    return value || options?.defaultValue || key
  }

  // Get display title based on user role
  const getDisplayTitle = () => {
    if (user?.role === "enseignant" || user?.role === "admin") {
      return t("appTitle")
    }
    return t("appTitle")
  }

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

  // Auto-set Chinese for enseignant role
  useEffect(() => {
    if (user?.role === "enseignant") {
      setCurrentLang('zh')
    }
  }, [user?.role])

  const handleSignOut = async () => {
    try {
      startLoading();
      await authLogout();
      stopLoading();
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      stopLoading();
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
        <Menu className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <PanelLeft className="h-5 w-5" />
      </Button>
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl font-semibold">{getDisplayTitle()}</h1>
        <div className="flex items-center gap-3">

          {/*
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-2xl">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Messages</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-2xl relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {notifications}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
         */ }

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-2xl px-3 py-2 h-auto hover:bg-muted/50 transition-all duration-200"
              >
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Dupont" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-sm font-semibold">
                    DD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">
                        {user?.role === "enseignant" ? "教师" : user?.role}
                      </span>

                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 rounded-2xl border-0 bg-card shadow-2xl animate-in slide-in-from-top-2 duration-200"
            >
              {/* Profile Section */}
              <div className="p-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt={user?.name || "Avatar"} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground break-words whitespace-pre-line">
                          {user?.name}
                        </p>
                        <p className="text-sm text-muted-foreground break-words whitespace-pre-line">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

              {/* Menu Items */}
              <div className="p-2">

                {/*
                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Settings className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Paramètres & confidentialité</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-blue-500/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <HelpCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Aide & support</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-green-500/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Monitor className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Affichage & accessibilité</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-orange-500/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <MessageCircle className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p className="font-medium">Donner un avis</p>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">CTRL B</span>
                    </div>
                  </div>
                </DropdownMenuItem>

              */  }

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="rounded-xl p-3 cursor-pointer hover:bg-red-500/10 transition-colors duration-200 text-red-600 focus:text-red-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/20">
                      <LogOut className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">{t("logout")}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}