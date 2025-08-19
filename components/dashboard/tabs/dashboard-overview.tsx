"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, CheckCircle, Play, Lock, Globe, GraduationCap } from "lucide-react"

import { courses, recentLessons, upcomingEvents } from "../data/courses-data"

interface DashboardOverviewProps {
  onNavigateToTab: (tab: string) => void
}

export function DashboardOverview({ onNavigateToTab }: DashboardOverviewProps) {
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
                <Button className="rounded-2xl bg-white text-primary hover:bg-white/90">Continuer la Formation</Button>
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
            <motion.div key={course.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
              <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">{course.icon}</div>
                    <Badge variant="outline" className="rounded-xl">
                      {course.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription className="mb-3">{course.description}</CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progrès</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 rounded-xl" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {course.students}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full rounded-2xl" disabled>
                    <Lock className="mr-2 h-4 w-4" />
                    Contenu verrouillé
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
    </>
  )
}
