"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio, Clock, Users, Play } from "lucide-react"

export function LiveCoursesTab() {
  const liveCourses = [
    {
      title: "Acupuncture Avancée",
      instructor: "Dr. Zhang Ming",
      time: "14:30 - 16:00",
      participants: 45,
      status: "live",
      description: "Techniques avancées d'acupuncture pour les pathologies complexes",
    },
    {
      title: "Phytothérapie Chinoise",
      instructor: "Dr. Wang Hua",
      time: "15:00 - 16:30",
      participants: 32,
      status: "upcoming",
      description: "Préparation et utilisation des plantes médicinales chinoises",
    },
    {
      title: "Diagnostic Énergétique",
      instructor: "Dr. Li Wei",
      time: "17:00 - 18:30",
      participants: 28,
      status: "upcoming",
      description: "Méthodes de diagnostic selon la médecine traditionnelle chinoise",
    },
  ]

  return (
    <>
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
                EN DIRECT
              </Badge>
              <h2 className="text-3xl font-bold">Cours en Direct</h2>
              <p className="max-w-[600px] text-white/80">Participez aux cours en temps réel avec nos experts en MTC.</p>
            </div>
            <Button className="w-fit rounded-2xl bg-white text-red-700 hover:bg-white/90">
              <Play className="mr-2 h-4 w-4" />
              Rejoindre le Cours
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cours Disponibles Aujourd'hui</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {liveCourses.map((course) => (
            <motion.div key={course.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`overflow-hidden rounded-3xl border-2 transition-all duration-300 ${
                  course.status === "live"
                    ? "border-red-200 bg-red-50/50"
                    : "border-orange-200 bg-orange-50/50 hover:border-primary/50"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={course.status === "live" ? "destructive" : "secondary"}
                      className={`rounded-xl ${course.status === "live" ? "animate-pulse" : ""}`}
                    >
                      {course.status === "live" ? (
                        <>
                          <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                          LIVE
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />À VENIR
                        </>
                      )}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      {course.participants}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {course.time}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      Instructeur: {course.instructor}
                    </div>
                  </div>
                  <Button
                    className={`w-full rounded-2xl ${
                      course.status === "live" ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"
                    }`}
                  >
                    {course.status === "live" ? (
                      <>
                        <Radio className="mr-2 h-4 w-4" />
                        Rejoindre Maintenant
                      </>
                    ) : (
                      <>
                        <Clock className="mr-2 h-4 w-4" />
                        Programmer un Rappel
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
