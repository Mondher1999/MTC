"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Link, Lock, User, BookOpen, Users, Plus } from "lucide-react"
import {  createLiveCourse } from "@/services/liveCourse-service"

interface LiveCourseModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (message: string) => void
}

export function LiveCourseModal({ isOpen, onClose, onSuccess }: LiveCourseModalProps) {
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    meetingLink: "",
    instructorName: "",
    date: "",
    time: "",
    selectedStudents: [] as string[],
  })

  const instructors = [
    { id: "1", name: "Dr. Zhang Ming" },
    { id: "2", name: "Dr. Wang Hua" },
    { id: "3", name: "Dr. Li Wei" },
    { id: "4", name: "Dr. Chen Lu" },
  ]

  const students = [
    { id: "1", name: "Marie Dubois" },
    { id: "2", name: "Jean Martin" },
    { id: "3", name: "Sophie Laurent" },
    { id: "4", name: "Pierre Moreau" },
    { id: "5", name: "Emma Bernard" },
  ]

  function extractFirstLink(text: string): string {
    const regex = /(https?:\/\/[^\s]+)/;
    const match = text.match(regex);
    return match ? match[0] : text; // fallback: keep raw text if no link found
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const created = await createLiveCourse(formData);
  
      // Reset form
      setFormData({
        courseName: "",
        description: "",
        meetingLink: "",
        instructorName  : "",
        date: "",
        time: "",
        selectedStudents: [],
      });
  
      onClose();
      onSuccess(`Le cours en direct "${created.courseName}" a été créé avec succès !`);
    } catch (error: any) {
      console.error("Error creating course:", error);
      onSuccess(`❌ Erreur: ${error.message}`);
    }
  };
  

  const handleStudentSelection = (studentId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      selectedStudents: checked
        ? [...prev.selectedStudents, studentId]
        : prev.selectedStudents.filter((id) => id !== studentId),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-700 text-2xl">
            <Plus className="h-6 w-6" />
            Créer un Cours en Direct
          </DialogTitle>
          <DialogDescription>Configurez un nouveau cours en direct avec tous les détails nécessaires</DialogDescription>
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
                placeholder="Ex: Acupuncture Avancée"
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
                        value={formData.instructorName}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, instructorName: value }))
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Sélectionner un enseignant" />
                        </SelectTrigger>
                        <SelectContent>
                          {instructors.map((instructor) => (
                            <SelectItem key={instructor.id} value={instructor.name}>
                              {instructor.name}
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
              placeholder="Décrivez le contenu et les objectifs du cours..."
              className="rounded-xl min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meetingLink" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                Lien de réunion
              </Label>
              <Input
                id="meetingLink"
                type="url"
                value={formData.meetingLink}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    meetingLink: extractFirstLink(e.target.value),
                  }))
                }
                
                placeholder="https://zoom.us/j/..."
                className="rounded-xl"
                required
              />
            </div>

           
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Heure
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                className="rounded-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
  <Label className="flex items-center gap-2">
    <Users className="h-4 w-4" />
    Étudiants ayant accès
  </Label>

  {/* Bouton Select All / Unselect All */}
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => {
                  if (formData.selectedStudents.length === students.length) {
                    // 🔹 Si tous sont déjà sélectionnés → on vide
                    setFormData((prev) => ({ ...prev, selectedStudents: [] }));
                  } else {
                    // 🔹 Sinon → on sélectionne tous
                    setFormData((prev) => ({
                      ...prev,
                      selectedStudents: students.map((s) => s.id),
                    }));
                  }
                }}
                className="px-3 py-1 text-sm rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
              >
                {formData.selectedStudents.length === students.length
                  ? "Tout désélectionner"
                  : "Sélectionner tous"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-red-50/50 rounded-xl border border-red-200">
              {students.map((student) => (
                <div key={student.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={student.id}
                    checked={formData.selectedStudents.includes(student.id)}
                    onCheckedChange={(checked) =>
                      handleStudentSelection(student.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={student.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {student.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>


          <div className="flex gap-3 pt-4">
            <Button type="submit" className="rounded-2xl bg-red-600 hover:bg-red-700 flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Créer le Cours en Direct
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="rounded-2xl bg-transparent">
              Annuler
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
