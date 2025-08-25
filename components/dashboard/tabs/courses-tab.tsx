"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, BookOpen, Brain, Target, Heart, Search, Lock, Plus, Leaf, Book, Play } from "lucide-react"

import { RecordedCourseModal } from "../modals/recorded-course-modal"
import { SuccessAnimation } from "@/components/ui/success-animation"
import { useAuth } from "@/contexts/AuthContext"
import {  NewRecordedCourse } from "@/types/Courses"
import { fetchCourses } from "@/services/liveCourse-service"
import { VideoPlayerModal } from "../modals/VideoPlayerModal" // Ajuster le chemin d'import


export function CoursesTab() {
  const [showRecordedCourseModal, setShowRecordedCourseModal] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const { user } = useAuth()
  const [courses, setCourses] = useState<NewRecordedCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("all")
const [searchTerm, setSearchTerm] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<NewRecordedCourse | null>(null)


  const handleCourseAdded = (message: string, newCourse: NewRecordedCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse])
    setSuccessMessage(message)
    setShowRecordedCourseModal(false)
    setShowSuccessAnimation(true)
    setTimeout(() => setShowSuccessAnimation(false), 3000)
  }

  const filteredCourses = useMemo(() => {
    let filtered = courses
  
    if (activeFilter !== "all") {
      filtered = filtered.filter(course => {
        const category = String(course.category).toLowerCase()
        switch (activeFilter) {
          case "theory":
            return category === "theory" || category === "théorie"
          case "practice":
            return category === "practice" || category === "pratique"
          case "mixed":
            return category === "mixed" || category === "théorie & pratique"
          default:
            return true
        }
      })
    }
  
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(course => 
        course.courseName.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.instructorName.toLowerCase().includes(term)
      )
    }
  
    return filtered
  }, [courses, activeFilter, searchTerm])
  
  const getCategoryCount = (category: string) => {
    if (category === "all") return courses.length
    
    return courses.filter(course => {
      const courseCategory = String(course.category).toLowerCase()
      switch (category) {
        case "theory":
          return courseCategory === "theory" || courseCategory === "théorie"
        case "practice":
          return courseCategory === "practice" || courseCategory === "pratique"
        case "mixed":
          return courseCategory === "mixed" || courseCategory === "théorie & pratique"
        default:
          return false
      }
    }).length
  }

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchCourses()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching students:", error)
        setError("Erreur lors du chargement des apprenants. Veuillez réessayer.")
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
    <SuccessAnimation
  isVisible={showSuccessAnimation}
  message={successMessage || "Cours enregistré ajouté avec succès !"}
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
            {user?.role === "admin" && (
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
  <Button 
    variant={activeFilter === "all" ? "default" : "outline"}
    className="rounded-2xl"
    onClick={() => setActiveFilter("all")}
  >
    <BookOpen className="mr-2 h-4 w-4" />
    Tous les Cours ({getCategoryCount("all")})
  </Button>
  
  <Button 
    variant={activeFilter === "theory" ? "default" : "outline"}
    className="rounded-2xl"
    onClick={() => setActiveFilter("theory")}
  >
    <Brain className="mr-2 h-4 w-4" />
    Théorie ({getCategoryCount("theory")})
  </Button>
  
  <Button 
    variant={activeFilter === "practice" ? "default" : "outline"}
    className="rounded-2xl"
    onClick={() => setActiveFilter("practice")}
  >
    <Target className="mr-2 h-4 w-4" />
    Pratique ({getCategoryCount("practice")})
  </Button>
  
  <Button 
    variant={activeFilter === "mixed" ? "default" : "outline"}
    className="rounded-2xl"
    onClick={() => setActiveFilter("mixed")}
  >
    <BookOpen className="mr-2 h-4 w-4" />
    Théorie & Pratique ({getCategoryCount("mixed")})
  </Button>
  
  <div className="flex-1"></div>
  
  <div className="relative w-full md:w-auto mt-3 md:mt-0">
    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input 
      type="search" 
      placeholder="Rechercher un cours..." 
      className="w-full rounded-2xl pl-9 md:w-[200px]"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>

<section className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-semibold">
      {activeFilter === "all" ? "Cours Disponibles" : 
       activeFilter === "theory" ? "Cours de Théorie" :
       activeFilter === "practice" ? "Cours Pratiques" :
       "Cours Mixtes"}
    </h2>
    {(activeFilter !== "all" || searchTerm) && (
      <Badge variant="secondary">
        {filteredCourses.length} résultat{filteredCourses.length > 1 ? 's' : ''}
      </Badge>
    )}
  </div>

  {filteredCourses.length === 0 ? (
    <div className="text-center py-12">
      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium text-muted-foreground">
        {searchTerm ? "Aucun cours trouvé" : "Aucun cours dans cette catégorie"}
      </h3>
      <p className="text-sm text-muted-foreground mt-2">
        {searchTerm 
          ? `Aucun résultat pour "${searchTerm}"`
          : "Essayez une autre catégorie ou ajoutez des cours."}
      </p>
      {(activeFilter !== "all" || searchTerm) && (
        <Button 
          variant="outline" 
          onClick={() => {
            setActiveFilter("all")
            setSearchTerm("")
          }}
          className="mt-4"
        >
          Effacer les filtres
        </Button>
      )}
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredCourses.map((course) => (
        <motion.div
          key={course._id}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
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
            onClick={() => {
              setSelectedCourse(course) // Set the specific course
              setIsVideoModalOpen(true)
            }}
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
  )}
</section>

      <RecordedCourseModal
        isOpen={showRecordedCourseModal}
        onClose={() => setShowRecordedCourseModal(false)}
        onSuccess={handleCourseAdded}
      />
<VideoPlayerModal
  isOpen={isVideoModalOpen}
  onClose={() => {
    setIsVideoModalOpen(false)
    setSelectedCourse(null)
  }}
  course={selectedCourse} // Pass the selected course, not the entire array
/>
     
    </>
  )
}