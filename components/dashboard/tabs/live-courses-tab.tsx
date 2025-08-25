"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio, Clock, Users, Play, Video } from "lucide-react"
import { LiveCourseModal } from "../modals/live-course-modal"
import { VoovMeetingModal } from "../modals/VoovMeetingModal" // AJOUT: Import de la modal Voov
import { SuccessAnimation } from "@/components/ui/success-animation"
import { useAuth } from "@/contexts/AuthContext"
import { LiveCourses } from "@/types/Courses"
import { fetchLiveCourses } from "@/services/liveCourse-service"
import { CalendarDays } from "lucide-react"

type LiveCourse = {
  _id: string
  courseName: string
  date: string
  description: string
  startTime: string
  endTime: string
  startTimeChina?: string
  endTimeChina?: string
  instructorName: string
  meetingLink: string
}

export function LiveCoursesTab() {
  // State management
  const [currentLang, setCurrentLang] = useState('en')
  const [showLiveCourseModal, setShowLiveCourseModal] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [liveCourses, setLiveCourses] = useState<LiveCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [showVoovModal, setShowVoovModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<LiveCourse | null>(null)
  const { user } = useAuth()

  // Translation object
  const translations = {
    en: {
      liveLabel: 'LIVE',
      liveCoursesTitle: 'Live Courses',
      liveCoursesDescription: 'Join real-time courses with our MTC experts.',
      createLiveCourse: 'Create Live Course',
      joinCourse: 'Join Course',
      availableCoursesToday: 'Available Courses Today',
      loadingCourses: 'Loading courses...',
      errorLoadingCourses: 'Error loading courses. Please try again.',
      upcomingLabel: 'UPCOMING',
      instructor: 'Instructor',
      date: 'Date',
      joinInPlatform: 'Join in Platform',
      upcoming: 'Upcoming',
      participantCount: '55' // Could be dynamic
    },
    fr: {
      liveLabel: 'EN DIRECT',
      liveCoursesTitle: 'Cours en Direct',
      liveCoursesDescription: 'Participez aux cours en temps réel avec nos experts en MTC.',
      createLiveCourse: 'Créer un Cours en Direct',
      joinCourse: 'Rejoindre le Cours',
      availableCoursesToday: 'Cours Disponibles Aujourd\'hui',
      loadingCourses: 'Chargement des cours...',
      errorLoadingCourses: 'Erreur lors du chargement des cours. Veuillez réessayer.',
      upcomingLabel: 'À VENIR',
      instructor: 'Instructeur',
      date: 'Date',
      joinInPlatform: 'Rejoindre dans la Plateforme',
      upcoming: 'À venir',
      participantCount: '55'
    },
    zh: {
      liveLabel: '直播中',
      liveCoursesTitle: '直播课程',
      liveCoursesDescription: '与我们的中医专家实时参与课程。',
      createLiveCourse: '创建直播课程',
      joinCourse: '加入课程',
      availableCoursesToday: '今日可用课程',
      loadingCourses: '加载课程中...',
      errorLoadingCourses: '加载课程时出错。请重试。',
      upcomingLabel: '即将开始',
      instructor: '讲师',
      date: '日期',
      joinInPlatform: '在平台中加入',
      upcoming: '即将开始',
      participantCount: '55'
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

  const handleJoinMeeting = (course: LiveCourse) => {
    setSelectedCourse(course)
    setShowVoovModal(true)
  }

  const handleSuccess = (message: string, newCourse: any) => {
    setLiveCourses((prevCourses) => [...prevCourses, newCourse])
    setSuccessMessage(message)
    setShowLiveCourseModal(false)
    setShowSuccessAnimation(true)
    setTimeout(() => setShowSuccessAnimation(false), 3000)
  }

  // Convert "HH:mm" into today's Date object
  const parseCourseDateTime = (dateStr: string, timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const d = new Date(dateStr); // UTC from DB
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hours, minutes, 0, 0);
  };

  // Helper to get date without time
  const stripTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  // Get course status
  const getCourseStatus = (
    courseDateStr: string,
    startTime: string,
    endTime: string
  ): "upcoming" | "live" | "ended" | "past" => {
    const now = new Date();
    const today = stripTime(now);
    const courseDate = stripTime(new Date(courseDateStr));

    if (courseDate.getTime() < today.getTime()) return "past";
    if (courseDate.getTime() > today.getTime()) return "upcoming";

    const start = parseCourseDateTime(courseDateStr, startTime);
    let end = parseCourseDateTime(courseDateStr, endTime);

    if (end.getTime() <= start.getTime()) {
      end.setDate(end.getDate() + 1);
    }

    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "live";
    return "ended";
  };

  // Format date based on language
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const locale = currentLang === 'zh' ? 'zh-CN' : currentLang === 'fr' ? 'fr-FR' : 'en-US'
    
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  useEffect(() => {
    const fetchLiveCourse = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchLiveCourses()
        setLiveCourses(data)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setError(t("errorLoadingCourses"))
      } finally {
        setLoading(false)
      }
    }
    fetchLiveCourse()
  }, [currentLang])

  return (
    <>
      <SuccessAnimation
        isVisible={showSuccessAnimation}
        onComplete={() => setShowSuccessAnimation(false)}
        message={successMessage}
      />

      {/* Header Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 p-8 text-white"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl animate-pulse">
                <Radio className="mr-1 h-3 w-3" />
                {t("liveLabel")}
              </Badge>
              <h2 className="text-3xl font-bold">{t("liveCoursesTitle")}</h2>
              <p className="max-w-[600px] text-white/80">
                {t("liveCoursesDescription")}
              </p>
            </div>

            <div className="flex gap-2">
              {user?.role === "admin" ? (
                <Button
                  onClick={() => setShowLiveCourseModal(true)}
                  className="rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Video className="mr-2 h-5 w-5" />
                  {t("createLiveCourse")}
                </Button>
              ) : (
                <Button className="w-fit rounded-2xl bg-white text-red-700 hover:bg-white/90">
                  <Play className="mr-2 h-4 w-4" />
                  {t("joinCourse")}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Courses Section */}
      <section className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold">{t("availableCoursesToday")}</h2>

        {loading && <p className="text-muted-foreground">{t("loadingCourses")}</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {liveCourses
            .filter((course) => getCourseStatus(course.date, course.startTime, course.endTime) !== "past")
            .sort((a, b) => {
              const statusOrder: Record<"live" | "upcoming" | "ended", number> = {
                live: 0,
                upcoming: 1,
                ended: 2,
              };

              const statusA = getCourseStatus(a.date, a.startTime, a.endTime);
              const statusB = getCourseStatus(b.date, b.startTime, b.endTime);

              return statusOrder[statusA as "live" | "upcoming" | "ended"] 
                   - statusOrder[statusB as "live" | "upcoming" | "ended"];
            })
            .map((course) => {
              const status = getCourseStatus(course.date, course.startTime, course.endTime);

              return (
                <motion.div
                  key={course._id}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`overflow-hidden rounded-3xl border-2 transition-all duration-300 ${
                      status === "live"
                        ? "border-red-200 bg-red-50/50"
                        : "border-orange-200 bg-orange-50/50 hover:border-primary/50"
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={status === "live" ? "destructive" : "secondary"}
                          className={`rounded-xl ${status === "live" ? "animate-pulse" : ""}`}
                        >
                          {status === "live" ? (
                            <>
                              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                              {t("liveLabel")}
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" /> {t("upcomingLabel")}
                            </>
                          )}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          {t("participantCount")}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <CardTitle className="text-lg">{course.courseName}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>

                      <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  {user?.role === "enseignant" 
                    ? `${course.startTimeChina} - ${course.endTimeChina}`
                    : `${course.startTime} - ${course.endTime}`
                  }
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  {t("instructor")}: {course.instructorName}
                </div>
                <div className="flex items-center text-sm">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  {t("date")}: {formatDate(course.date)}
                </div>
              </div>

                      {/* Course Action Buttons */}
                      {status === "live" ? (
                        <Button
                          className="w-full rounded-2xl bg-red-600 hover:bg-red-700 flex items-center"
                          onClick={() => handleJoinMeeting(course)}
                        >
                          <Radio className="mr-2 h-4 w-4" />
                          {t("joinInPlatform")}
                        </Button>
                      ) : (
                        <div className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white flex items-center justify-center py-2">
                          <Clock className="mr-2 h-4 w-4" />
                          {t("upcoming")}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </div>
      </section>

      {/* Modals */}
      <LiveCourseModal
        isOpen={showLiveCourseModal}
        onClose={() => setShowLiveCourseModal(false)}
        onSuccess={handleSuccess}
      />

      <VoovMeetingModal
        isOpen={showVoovModal}
        onClose={() => {
          setShowVoovModal(false)
          setSelectedCourse(null)
        }}
        meetingLink={selectedCourse?.meetingLink || ""}
        courseName={selectedCourse?.courseName || ""}
      />
    </>
  )
}