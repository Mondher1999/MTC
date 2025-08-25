"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Radio, Plus, CreditCard, Users } from "lucide-react"

import { DashboardLayout } from "./layout/dashboard-layout"
import { DashboardOverview } from "./tabs/dashboard-overview"
import { CoursesTab } from "./tabs/courses-tab"
import { LiveCoursesTab } from "./tabs/live-courses-tab"
import { UserManagementTab } from "./tabs/user-management-tab"
import { useAuth } from "@/contexts/AuthContext"
import { fetchCourses } from "@/services/liveCourse-service"
import { NewRecordedCourse } from "@/types/Courses"

export function Dashboard() {
  const { user } = useAuth()
  
  // Determine initial tab based on user role
  const getInitialTab = () => {
    if (user?.role === "enseignant") {
      return "coursesDirect"
    }
    return "dashboard"
  }

  // State management
  const [currentLang, setCurrentLang] = useState('en')
  const [activeTab, setActiveTab] = useState(getInitialTab())
  const [courses, setCourses] = useState([])

  // Update active tab when user changes
  useEffect(() => {
    if (user?.role === "enseignant" && activeTab === "dashboard") {
      setActiveTab("coursesDirect")
    }
  }, [user?.role, activeTab])

  // Translation object
  const translations = {
    en: {
      dashboard: 'Dashboard',
      liveCourses: 'Live Courses',
      recordedCourses: 'Recorded Courses',
      administration: 'Administration',
      liveLabel: 'LIVE'
    },
    fr: {
      dashboard: 'Tableau de Bord',
      liveCourses: 'Cours en Direct',
      recordedCourses: 'Cours Enregistrés',
      administration: 'Administration',
      liveLabel: 'LIVE'
    },
    zh: {
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

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses()
        setCourses(data as any)
      } catch (error) {
        console.error("Error loading courses:", error)
      }
    }
    loadCourses()
  }, [])

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue)
  }
  
  return (
    <DashboardLayout onTabChange={handleTabChange} activeTab={activeTab}>
      <main className="flex-1 p-4 md:p-6">
        <Tabs defaultValue={getInitialTab()} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TabsList
              className={`grid w-full max-w-[800px] rounded-3xl p-1 ${
                user?.role === "enseignant"
                  ? "grid-cols-1"
                  : user?.role === "etudiant"
                  ? "grid-cols-3"
                  : "grid-cols-4"
              }`}
            >
              {user?.role !== "enseignant" && (
                <TabsTrigger
                  value="dashboard"
                  className="flex items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
                >
                  <Home className="h-4 w-4" />
                  {t("dashboard")}
                </TabsTrigger>
              )}
              
              <TabsTrigger
                value="coursesDirect"
                className="flex w-full items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
              >
                <Radio className="h-4 w-4 text-red-500" />
                <span>{t("liveCourses")}</span>
                <Badge variant="destructive" className="ml-auto animate-pulse">
                  {t("liveLabel")}
                </Badge>
              </TabsTrigger>
               
              {user?.role !== "enseignant" && (
                <TabsTrigger
                  value="courses"
                  className="flex w-full items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>{t("recordedCourses")}</span>
                  {courses.length > 0 && (
                    <Badge className="ml-auto">12</Badge>
                  )}
                </TabsTrigger>
              )}

              {user?.role !== "etudiant" && user?.role !== "enseignant" && (
                <TabsTrigger
                  value="users"
                  className="flex w-full items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
                >
                  <Users className="h-4 w-4" />
                  <span>{t("administration")}</span>
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="dashboard" className="space-y-8 mt-0">
                <DashboardOverview onNavigateToTab={setActiveTab} />
              </TabsContent>

              <TabsContent value="coursesDirect" className="space-y-8 mt-0">
                <LiveCoursesTab />
              </TabsContent>

              <TabsContent value="courses" className="space-y-8 mt-0">
                <CoursesTab onCoursesCountChange={setCourses} />
              </TabsContent>

              <TabsContent value="users" className="space-y-8 mt-0">
                <UserManagementTab />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>
    </DashboardLayout>
  )
}