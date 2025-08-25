"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, CheckCircle, Play, Lock, Globe, GraduationCap, Target, Brain, Leaf, Heart, BookOpen } from "lucide-react"

import { courses, recentLessons, upcomingEvents } from "../data/courses-data"
import { NewRecordedCourse } from "@/types/Courses"
import { useEffect, useState } from "react"
import { fetchCourses } from "@/services/liveCourse-service"
import { VideoPlayerModal } from "../modals/VideoPlayerModal"

interface DashboardOverviewProps {
  onNavigateToTab: (tab: string) => void
}

export function DashboardOverview({ onNavigateToTab }: DashboardOverviewProps) {

  const [courses, setCourses] = useState<NewRecordedCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchCourses()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching students:", error)
        setError("Erreur lors du chargement des étudiants. Veuillez réessayer.")
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [])

  function getCategoryIcon(category: string) {
    switch (category) {
      case "Pratique":
        return <Target className="text-secondary h-6 w-6" />
      case "Théorie":
        return <Brain className="text-primary h-6 w-6" />
      case "Pharmacologie":
        return <Leaf className="text-accent h-6 w-6" />
      case "Nutrition":
        return <Heart className="text-chart-4 h-6 w-6" />
      default:
        return <BookOpen className="text-muted-foreground h-6 w-6" /> // fallback
    }
  }


  return (
    <>
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-8 text-white relative"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-6xl">☯</div>
            <div className="absolute bottom-4 left-4 text-4xl">🏮</div>
            <div className="absolute top-1/2 right-1/4 text-3xl">🌸</div>
          </div>
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">Formation Exclusive</Badge>
              <h2 className="text-3xl font-bold">Bienvenue dans votre Formation MTC</h2>
              <p className="max-w-[600px] text-white/90">
                Découvrez les secrets millénaires de la Médecine Traditionnelle Chinoise avec nos experts de
                l'Université de Shanghai.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button  className="rounded-2xl bg-white text-primary hover:bg-white/90" onClick={() => onNavigateToTab("courses")}>Continuer la Formation</Button>
                <Button
                  variant="outline"
                  className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                >
                  Programme Détaillé
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="relative h-40 w-40"
              >
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-6xl">
                  ☯
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Mes Cours Actuels</h2>
          <Button variant="ghost" className="rounded-2xl" onClick={() => onNavigateToTab("courses")}>
            Voir Tous
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <motion.div key={course._id} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
             <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
          
          {/* Header avec icône + catégorie */}
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                {getCategoryIcon(String(course.category))}
              </div>
              <Badge variant="outline" className="rounded-xl">
                {course.category}
              </Badge>
            </div>
          </CardHeader>

          {/* Contenu du cours */}
          <CardContent className="space-y-2 pb-2">
                        <CardTitle className="text-lg">{course.courseName}</CardTitle>
                        
                        <CardDescription className="whitespace-pre-line break-words">
                          {course.description}
                        </CardDescription>

                        <div className="text-sm text-muted-foreground space-y-1">
                          <p><span className="font-medium">Instructeur :</span> {course.instructorName}</p>
                          <p><span className="font-medium">Durée :</span> {course.duration} min</p>
                          <p>
                            <span className="font-medium">Date :</span>{" "}
                            {new Date(String(course.recordingDate)).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </CardContent>

          {/* Footer (actions) */}
          <CardFooter>
  <Button
    onClick={() => setIsVideoModalOpen(true)}
    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl py-2.5 font-medium shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
  >
    <Play className="h-4 w-4" />
    Regarder le cours
  </Button>
</CardFooter>
        </Card>
            </motion.div>
          ))}
        </div>
      </section>
 {/*
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Leçons Récentes</h2>
            <Button variant="ghost" className="rounded-2xl">
              Voir Toutes
            </Button>
          </div>
          <div className="rounded-3xl border">
            <div className="grid grid-cols-1 divide-y">
              {recentLessons.map((lesson) => (
                <motion.div
                  key={lesson.title}
                  whileHover={{ backgroundColor: "rgba(190, 18, 60, 0.02)" }}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <Play className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {lesson.course} • {lesson.duration} • {lesson.date}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-xl">
                    {lesson.completed ? "Revoir" : "Commencer"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Événements à Venir</h2>
            <Button variant="ghost" className="rounded-2xl">
              Calendrier
            </Button>
          </div>
          <div className="rounded-3xl border">
            <div className="grid grid-cols-1 divide-y">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.title}
                  whileHover={{ backgroundColor: "rgba(190, 18, 60, 0.02)" }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge variant="outline" className="rounded-xl">
                      {event.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {event.time} • Instructeur: {event.instructor}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      {event.participants} participants
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                      S'inscrire
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
*/}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Informations Importantes</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="rounded-3xl border-secondary/20 bg-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-8 w-8 text-secondary" />
                <h3 className="font-semibold">Stage en Chine</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Opportunité de stage pratique pendant la formation</p>
              <Button variant="secondary" className="w-full rounded-2xl">
                En Savoir Plus
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="h-8 w-8 text-accent" />
                <h3 className="font-semibold">Certification</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Certificat reconnu par l'Université de Shanghai</p>
              <Button variant="outline" className="w-full rounded-2xl bg-transparent">
                Voir Critères
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <VideoPlayerModal
  isOpen={isVideoModalOpen}
  onClose={() => setIsVideoModalOpen(false)}
  course={courses} // Votre objet cours
/>
    </>
  )
}
