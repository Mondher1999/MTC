"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, BookOpen, Plus } from "lucide-react"

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (message: string) => void
}

export function UserModal({ isOpen, onClose, onSuccess }: UserModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    role: "",
    specialization: "", // For teachers
    studentId: "", // For students
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] User form submitted:", formData)

    const userName = `${formData.firstName} ${formData.lastName}`
    const roleText = formData.role === "student" ? "étudiant" : "enseignant"

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      birthDate: "",
      role: "",
      specialization: "",
      studentId: "",
      notes: "",
    })

    onClose()
    onSuccess(`L'${roleText} "${userName}" a été ajouté avec succès !`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700 text-2xl">
            <Plus className="h-6 w-6" />
            Ajouter un Nouvel Utilisateur
          </DialogTitle>
          <DialogDescription>Créez un compte pour un nouvel étudiant ou enseignant</DialogDescription>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="role" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Rôle de l'utilisateur
            </Label>
            <Select value={formData.role} onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Étudiant
                  </div>
                </SelectItem>
                <SelectItem value="teacher">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Enseignant
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                placeholder="Prénom"
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nom de famille</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                placeholder="Nom de famille"
                className="rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="email@exemple.com"
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+33 1 23 45 67 89"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date de naissance
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
                className="rounded-xl"
              />
            </div>

            {formData.role === "student" && (
              <div className="space-y-2">
                <Label htmlFor="studentId">Numéro d'étudiant</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, studentId: e.target.value }))}
                  placeholder="Ex: ETU2024001"
                  className="rounded-xl"
                />
              </div>
            )}

            {formData.role === "teacher" && (
              <div className="space-y-2">
                <Label htmlFor="specialization">Spécialisation</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData((prev) => ({ ...prev, specialization: e.target.value }))}
                  placeholder="Ex: Acupuncture, Phytothérapie"
                  className="rounded-xl"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Adresse
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="Adresse complète"
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes additionnelles</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Informations supplémentaires..."
              className="rounded-xl min-h-[80px]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="rounded-2xl bg-blue-600 hover:bg-blue-700 flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Créer l'Utilisateur
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
