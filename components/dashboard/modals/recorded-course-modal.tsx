"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Video, Clock, User, BookOpen, Users, Plus, Calendar, Target, Play, Pause, Upload, X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { createRecordedCourse } from "@/services/liveCourse-service"
import { Loader2 } from "lucide-react"
import { Userss } from "@/types/Clients"
import { fetchStudentsVerified, fetchTeachers } from "@/services/Service"
import { NewRecordedCourse } from "@/types/Courses"

interface RecordedCourseModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (message: string, newCourse: NewRecordedCourse) => void
}

interface VideoMetadata {
  duration: number
  width: number
  height: number
  size: number
  type: string
}

export function RecordedCourseModal({ isOpen, onClose, onSuccess }: RecordedCourseModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [students, setStudents] = useState<Userss[]>([])
  const [teachers, setTeachers] = useState<Userss[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const videoPreviewRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Maximum file size (10GB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024
  
  // Supported video formats
  const SUPPORTED_FORMATS = [
    'video/mp4',
    'video/avi', 
    'video/quicktime', // .mov
    'video/x-msvideo', // .avi
    'video/webm',
    'video/ogg',
    'video/3gpp',
    'video/x-ms-wmv'
  ]

  const [formData, setFormData] = useState({
    _id: "",
    courseName: "",
    description: "",
    videoFile: null as File | null,
    instructorName: "",
    duration: "",
    instructorId: "",
    category: "",
    recordingDate: "",
    selectedStudents: [] as string[],
  })

  // Fetch verified students when modal opens
  useEffect(() => {
    if (isOpen) {
      const loadStudents = async () => {
        try {
          const verified = await fetchStudentsVerified()
          setStudents(verified)
        } catch (err) {
          console.error("Erreur lors du chargement des étudiants:", err)
          setError("Impossible de charger les étudiants vérifiés.")
        }
      }
      loadStudents()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      const loadTeachers = async () => {
        try {
          const verified = await fetchTeachers()
          setTeachers(verified)
        } catch (err) {
          console.error("Erreur lors du chargement des enseignants:", err)
          setError("Impossible de charger les enseignants.")
        }
      }
      loadTeachers()
    }
  }, [isOpen])

  // Clean up preview URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const categories = [
    { id: "Théorie", name: "Théorie" },
    { id: "Pratique", name: "Pratique" },
    { id: "Théorie & Pratique", name: "Théorie & Pratique" },
  ]

  // Enhanced file validation
  const validateVideoFile = (file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `Le fichier est trop volumineux. Taille maximale : ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)}MB`
    }

    // Check file type
    if (!SUPPORTED_FORMATS.includes(file.type) && !file.name.toLowerCase().match(/\.(mp4|avi|mov|webm|ogg|3gp|wmv)$/)) {
      return "Format de fichier non supporté. Utilisez MP4, AVI, MOV, WebM, OGG, 3GP ou WMV"
    }

    return null
  }

  // Extract video metadata
  const extractVideoMetadata = (file: File): Promise<VideoMetadata> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      const url = URL.createObjectURL(file)
      
      video.onloadedmetadata = () => {
        const metadata: VideoMetadata = {
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          size: file.size,
          type: file.type
        }
        URL.revokeObjectURL(url)
        resolve(metadata)
      }
      
      video.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Impossible de lire les métadonnées de la vidéo'))
      }
      
      video.src = url
    })
  }

  // Handle file selection
  const handleFileSelect = async (file: File) => {
    const validationError = validateVideoFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setFormData((prev) => ({ ...prev, videoFile: file }))

    try {
      const metadata = await extractVideoMetadata(file)
      setVideoMetadata(metadata)
      
      // Auto-fill duration if not already set
      if (!formData.duration && metadata.duration) {
        const durationInMinutes = Math.ceil(metadata.duration / 60)
        setFormData((prev) => ({ ...prev, duration: durationInMinutes.toString() }))
      }

      // Create preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const newPreviewUrl = URL.createObjectURL(file)
      setPreviewUrl(newPreviewUrl)
    } catch (err) {
      console.error('Error extracting metadata:', err)
      setError('Impossible de lire les métadonnées de la vidéo')
    }
  }

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
  
    if (!formData.videoFile) {
      setError("Veuillez sélectionner un fichier vidéo.")
      return
    }
  
    setLoading(true)
    setIsUploading(true)
  
    try {
      // Créer FormData pour l'upload
      const uploadFormData = new FormData()
      uploadFormData.append('videoFile', formData.videoFile)
      uploadFormData.append('courseName', formData.courseName)
      uploadFormData.append('description', formData.description)
      uploadFormData.append('instructorName', formData.instructorName)
      uploadFormData.append('instructorId', formData.instructorId)
      uploadFormData.append('duration', formData.duration)
      uploadFormData.append('category', formData.category)
      uploadFormData.append('recordingDate', formData.recordingDate)
      uploadFormData.append('selectedStudents', JSON.stringify(formData.selectedStudents))
  
      // Utiliser ton service pour créer le cours
      const createdCourse = await createRecordedCourse(uploadFormData)
  
      // Réinitialiser le formulaire
      setFormData({
        _id: "",
        courseName: "",
        description: "",
        instructorId: "",
        videoFile: null,
        instructorName: "",
        duration: "",
        category: "",
        recordingDate: "",
        selectedStudents: [],
      })
  
      setVideoMetadata(null)
      setUploadProgress(0)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
  
      onClose()
      onSuccess(`Le cours enregistré "${createdCourse.courseName}" a été créé avec succès !`, createdCourse)
  
    } catch (err: any) {
      console.error("Error creating course:", err)
      setError(err.message || "Une erreur est survenue lors de la création du cours.")
    } finally {
      setLoading(false)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }
  

  const handleStudentSelection = (studentId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedStudents: checked
        ? [...prev.selectedStudents, studentId]
        : prev.selectedStudents.filter((id) => id !== studentId),
    }))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }
    return `${minutes}m ${secs}s`
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-700 text-2xl">
              <Plus className="h-6 w-6" />
              Ajouter un Cours Enregistré
            </DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau cours enregistré à votre bibliothèque de formation
            </DialogDescription>
          </DialogHeader>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseName" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Nom du cours
                </Label>
                <Input
                  id="courseName"
                  value={formData.courseName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, courseName: e.target.value }))}
                  placeholder="Ex: Acupuncture Fondamentale"
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Enseignant
                </Label>
                <Select
                  value={formData.instructorId}
                  onValueChange={(value) => {
                    const selected = teachers.find((t) => t.id === value)
                    setFormData((prev) => ({
                      ...prev,
                      instructorId: value,
                      instructorName: selected
                        ? `${selected.firstName} ${selected.lastName}`
                        : "",
                    }))
                  }}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Sélectionner un enseignant" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.slice(0, 10).map((instructor) => (
                      <SelectItem key={instructor.id} value={instructor.id}>
                        {instructor.firstName} {instructor.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description du cours</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Décrivez le contenu et les objectifs du cours enregistré..."
                className="rounded-xl min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="videoFile" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Fichier vidéo
                </Label>
                
                {/* Enhanced Upload Zone */}
                <div
                  className={`rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
                    isDragOver
                      ? 'border-orange-400 bg-orange-50 scale-105'
                      : formData.videoFile 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    id="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileSelect(file)
                    }}
                    className="hidden"
                  />
                  
                  {isUploading && (
                    <div className="space-y-3">
                      <Upload className="mx-auto h-8 w-8 text-orange-600 animate-bounce" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-orange-700">
                          Téléchargement en cours...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600">
                          {uploadProgress.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {!isUploading && formData.videoFile ? (
                    <div className="space-y-3">
                      <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-green-700">
                          {formData.videoFile.name}
                        </p>
                        <p className="text-xs text-green-600">
                          Taille: {formatFileSize(formData.videoFile.size)}
                        </p>
                        
                        {/* Video Metadata */}
                        {videoMetadata && (
                          <div className="text-xs text-gray-600 space-y-1">
                            <p>Durée: {formatDuration(videoMetadata.duration)}</p>
                            <p>Résolution: {videoMetadata.width}x{videoMetadata.height}</p>
                          </div>
                        )}
                        
                        <div className="flex gap-2 justify-center">
                          {previewUrl && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setIsPreviewOpen(true)}
                              className="flex items-center gap-1"
                            >
                              <Play className="h-3 w-3" />
                              Aperçu
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Changer
                          </Button>
                          <Button
                            type="button"
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, videoFile: null }))
                              setVideoMetadata(null)
                              setUploadProgress(0)
                              if (previewUrl) {
                                URL.revokeObjectURL(previewUrl)
                                setPreviewUrl(null)
                              }
                            }}
                          >
                            <X className="h-3 w-3" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : !isUploading && (
                    <div className="space-y-3">
                      <Video className="mx-auto h-8 w-8 text-gray-400" />
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="mb-2"
                        >
                          Choisir une vidéo
                        </Button>
                        <p className="text-xs text-gray-500">
                          ou glissez-déposez votre fichier ici
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Formats: MP4, AVI, MOV, WebM (max 10GB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Durée (en minutes)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="Ex: 90"
                  className="rounded-xl"
                  min="1"
                  required
                />
                {videoMetadata && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Info className="h-3 w-3" />
                    Durée détectée: {Math.ceil(videoMetadata.duration / 60)} minutes
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Catégorie
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recordingDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date d'enregistrement
                </Label>
                <Input
                  id="recordingDate"
                  type="date"
                  value={formData.recordingDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, recordingDate: e.target.value }))}
                  className="rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                apprenants ayant accès (maximum 10)
              </Label>

              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => {
                    const maxStudents = Math.min(students.length, 10)
                    if (formData.selectedStudents.length === maxStudents) {
                      setFormData((prev) => ({ ...prev, selectedStudents: [] }))
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        selectedStudents: students.slice(0, 10).map((s) => s.id),
                      }))
                    }
                  }}
                  className="px-3 py-1 text-sm rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                >
                  {formData.selectedStudents.length === Math.min(students.length, 10)
                    ? "Tout désélectionner"
                    : "Sélectionner tous (10 max)"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-red-50/50 rounded-xl border border-red-200">
                {students.slice(0, 10).map((student) => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={student.id}
                      checked={formData.selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) =>
                        handleStudentSelection(student.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={student.id} className="text-sm font-medium cursor-pointer">
                      {student.firstName} {student.lastName}  
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading || isUploading || !formData.videoFile}
                className="rounded-2xl bg-orange-600 hover:bg-orange-700 flex-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading || isUploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                {isUploading ? `Téléchargement... ${uploadProgress.toFixed(1)}%` 
                  : loading ? "Création en cours..." 
                  : "Ajouter le Cours Enregistré"}
              </Button>

              <Button type="button" variant="outline" onClick={onClose} className="rounded-2xl bg-transparent">
                Annuler
              </Button>
            </div>
          </motion.form>
        </DialogContent>
      </Dialog>

      {/* Video Preview Modal */}
      {previewUrl && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Aperçu de la vidéo
              </DialogTitle>
              <DialogDescription>
                {formData.videoFile?.name} - {videoMetadata && formatFileSize(videoMetadata.size)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <video
                ref={videoPreviewRef}
                src={previewUrl}
                controls
                className="w-full rounded-lg"
                style={{ maxHeight: '60vh' }}
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
              
              {videoMetadata && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Durée:</span>
                    <br />
                    {formatDuration(videoMetadata.duration)}
                  </div>
                  <div>
                    <span className="font-medium">Résolution:</span>
                    <br />
                    {videoMetadata.width}x{videoMetadata.height}
                  </div>
                  <div>
                    <span className="font-medium">Taille:</span>
                    <br />
                    {formatFileSize(videoMetadata.size)}
                  </div>
                  <div>
                    <span className="font-medium">Format:</span>
                    <br />
                    {videoMetadata.type.split('/')[1].toUpperCase()}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setIsPreviewOpen(false)}>
                Fermer l'aperçu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}