"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, BookOpen, Brain, Target, Heart, Search, Lock, Plus } from "lucide-react"

import { courses } from "../data/courses-data"
import { RecordedCourseModal } from "../modals/recorded-course-modal"
import { SuccessAnimation } from "@/components/ui/success-animation"
import { useAuth } from "@/contexts/AuthContext"

export function CoursesTab() {
  const [showRecordedCourseModal, setShowRecordedCourseModal] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const { role,name } = useAuth();

  const handleCourseAdded = () => {
    setShowRecordedCourseModal(false)
    setShowSuccessAnimation(true)
    setTimeout(() => setShowSuccessAnimation(false), 3000)
  }

  return (
    <>
     <SuccessAnimation
        isVisible={showSuccessAnimation}
        message="Cours enregistré ajouté avec succès !"
        type="course"
      />
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-8 text-white"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Vos Cours en MTC</h2>
              <p className="max-w-[600px] text-white/80">
                Approfondissez vos connaissances et compétences en Médecine Traditionnelle Chinoise.
              </p>
            </div>
            <div className="flex gap-2">
            {role === "admin" && (
              <Button
                onClick={() => setShowRecordedCourseModal(true)}
                className="w-fit rounded-2xl g-gradient-to-r from-red-600 text-white hover:bg-white/20 border border-white/20"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau Cours Enregistré
              </Button>
              )}
            </div>

            
          </div>
        </motion.div>
      </section>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button variant="outline" className="rounded-2xl bg-transparent">
          <BookOpen className="mr-2 h-4 w-4" />
          Tous les Cours
        </Button>
        <Button variant="outline" className="rounded-2xl bg-transparent">
          <Brain className="mr-2 h-4 w-4" />
          Théorie
        </Button>
        <Button variant="outline" className="rounded-2xl bg-transparent">
          <Target className="mr-2 h-4 w-4" />
          Pratique
        </Button>
        <Button variant="outline" className="rounded-2xl bg-transparent">
          <Heart className="mr-2 h-4 w-4" />
          Favoris
        </Button>
        <div className="flex-1"></div>
        <div className="relative w-full md:w-auto mt-3 md:mt-0">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Rechercher un cours..." className="w-full rounded-2xl pl-9 md:w-[200px]" />
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cours Disponibles</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {courses.map((course) => (
            <motion.div key={course.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
              <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
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
                  <CardDescription>{course.description}</CardDescription>
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

      <RecordedCourseModal
        isOpen={showRecordedCourseModal}
        onClose={() => setShowRecordedCourseModal(false)}
        onSuccess={handleCourseAdded}
      />

     
    </>
  )
}
