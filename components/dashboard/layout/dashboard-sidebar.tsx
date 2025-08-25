"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Radio, Settings, Search, ChevronDown, X, Stethoscope, Clock, CheckCircle } from "lucide-react"
import { sidebarItems } from "../data/sidebar-data"
import { useAuth } from "@/contexts/AuthContext"

interface DashboardSidebarProps {
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  onTabChange: (tabValue: string) => void
  activeTab: string
}

export function DashboardSidebar({ 
  sidebarOpen, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  onTabChange,
  activeTab
}: DashboardSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const { user } = useAuth()

  // Language state
  const [currentLang, setCurrentLang] = useState('en')

  // Translation object
  const translations = {
    en: {
      appTitle: 'ATAMTC',
      appSubtitle: 'Formation MTC',
      search: 'Search...',
      dashboard: 'Dashboard',
      liveCourses: 'Live Courses',
      recordedCourses: 'Recorded Courses',
      administration: 'Administration',
      liveLabel: 'LIVE'
    },
    fr: {
      appTitle: 'ATAMTC',
      appSubtitle: 'Formation MTC',
      search: 'Rechercher...',
      dashboard: 'Tableau de Bord',
      liveCourses: 'Cours en Direct',
      recordedCourses: 'Cours Enregistrés',
      administration: 'Administration',
      liveLabel: 'LIVE'
    },
    zh: {
      appTitle: 'ATAMTC',
      appSubtitle: 'MTC培训',
      search: '搜索...',
      dashboard: '仪表板',
      liveCourses: '直播课程',
      recordedCourses: '录制课程',
      administration: '管理',
      liveLabel: '直播'
    }
  }

  // Translation function
  const t = (key: string, options?: { defaultValue?: string }) => {
    const langTranslations = translations[currentLang as keyof typeof translations] || translations.en
    const value = langTranslations[key as keyof typeof langTranslations]
    return value || options?.defaultValue || key
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

  // Get translated title for sidebar items
  const getTranslatedTitle = (item: any) => {
    switch (item.tabValue) {
      case 'dashboard':
        return t('dashboard')
      case 'coursesDirect':
        return t('liveCourses')
      case 'courses':
        return t('recordedCourses')
      case 'users':
        return t('administration')
      default:
        return item.title
    }
  }

  // Get translated badge
  const getTranslatedBadge = (badge: string) => {
    if (badge === 'LIVE') {
      return t('liveLabel')
    }
    return badge
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleItemClick = (tabValue: string) => {
    if (typeof onTabChange === 'function') {
      onTabChange(tabValue)
    } else {
      console.error("onTabChange is not a function:", onTabChange)
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col border-r">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
            <Stethoscope className="size-5" />
          </div>
          <div>
            <h2 className="font-semibold">{t('appTitle')}</h2>
            <p className="text-xs text-muted-foreground">{t('appSubtitle')}</p>
          </div>
        </div>
        {mobileMenuOpen && (
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder={t('search')} className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
        {sidebarItems
          .filter(item => {
            // Hide items based on role restrictions
            if (item.roleRestriction && user?.role === item.roleRestriction) {
              return false
            }
            // Additional filter: hide administration for enseignant
            if (item.tabValue === 'users' && user?.role === 'enseignant') {
              return false
            }
            return true
          })
          .map((item) => (
            <div key={item.title} className="mb-1">
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
                  activeTab === item.tabValue
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted",
                )}
                onClick={() => handleItemClick(item.tabValue)}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{getTranslatedTitle(item)}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant={item.badgeVariant || "outline"}
                    className={cn(
                      "ml-auto rounded-full px-2 py-0.5 text-xs",
                      item.badge === "LIVE" && "animate-pulse bg-red-500 text-white border-red-500",
                    )}
                  >
                    {getTranslatedBadge(item.badge)}
                  </Badge>
                )}
                {item.items && (
                  <ChevronDown
                    className={cn("ml-2 h-4 w-4 transition-transform", expandedItems[item.title] ? "rotate-180" : "")}
                  />
                )}
              </button>

              {item.items && expandedItems[item.title] && (
                <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                  {item.items.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.url}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted",
                        subItem.isLive && "bg-red-50 border border-red-200 hover:bg-red-100",
                        subItem.completed && "text-green-600",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {subItem.isLive && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <Radio className="w-3 h-3 text-red-500" />
                          </div>
                        )}
                        {subItem.isUpcoming && <Clock className="w-3 h-3 text-orange-500" />}
                        {subItem.completed && <CheckCircle className="w-3 h-3 text-green-500" />}
                        <span
                          className={cn(
                            subItem.isLive && "font-medium text-red-700",
                            subItem.completed && "line-through",
                          )}
                        >
                          {subItem.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {subItem.progress !== undefined && (
                          <div className="flex items-center gap-1">
                            <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full transition-all duration-300",
                                  subItem.completed ? "bg-green-500" : "bg-primary",
                                )}
                                style={{ width: `${subItem.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">{subItem.progress}%</span>
                          </div>
                        )}
                        {subItem.badge && (
                          <Badge
                            variant={subItem.isLive ? "destructive" : subItem.isUpcoming ? "secondary" : "outline"}
                            className={cn(
                              "ml-auto rounded-full px-2 py-0.5 text-xs",
                              subItem.isLive && "animate-pulse bg-red-500 text-white",
                              subItem.time && "bg-orange-100 text-orange-700",
                            )}
                          >
                            {subItem.badge}
                          </Badge>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <div className="space-y-1">
          <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
            <div className="flex items-center gap-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
            </div>
            <Badge variant="outline" className="ml-auto">
             {user?.role}
            </Badge>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </div>
    </>
  )
}