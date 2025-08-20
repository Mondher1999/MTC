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
import { createUser } from "@/services/Service"
import {  Loader2 } from "lucide-react"

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (message: string) => void
}

export function UserModal({ isOpen, onClose, onSuccess }: UserModalProps) {
  const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telNumber: "",
    role: "",
    
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)        // Réinitialiser l'erreur
    setLoading(true)      // Activer le loading
  
    try {
      const userPayload = {
        id:'',
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: formData.role,
        telNumber: formData.telNumber,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }
  
      const created = await createUser(userPayload)
  
      // Reset form
      const userName = `${formData.firstName} ${formData.lastName}`
      let roleText
      if (formData.role === "etudiant") roleText = "étudiant"
      else if (formData.role === "enseignant") roleText = "enseignant"
      else if (formData.role === "admin") roleText = "administrateur"
  
      setFormData({
        firstName: "",
        lastName: "",
        telNumber: "",
        email: "",
        role: "",
      })
  
      onClose()
      onSuccess(`L'${roleText} "${userName}" a été ajouté avec succès !`)
    } catch (err: any) {
      console.error("Error creating user:", err)
      setError(err.message || "Une erreur est survenue lors de la création de l'utilisateur.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700 text-2xl">
            <Plus className="h-6 w-6" />
            Ajouter un Nouvel Utilisateur
          </DialogTitle>
          <DialogDescription>Créez un compte pour un nouvel étudiant ou enseignant ou administrateur</DialogDescription>
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
                <SelectItem value="etudiant">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Étudiant
                  </div>
                </SelectItem>
                <SelectItem value="enseignant">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Enseignant
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Administrateur
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
              <Label htmlFor="telNumber" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Téléphone
              </Label>
              <Input
                id="telNumber"
                type="tel"
                value={formData.telNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, telNumber: e.target.value }))}
                placeholder="+33 1 23 45 67 89"
                className="rounded-xl"
              />
            </div>
          </div>
    {/*
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
*/}
          <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-blue-600 hover:bg-blue-700 flex-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {loading ? "Création en cours..." : "Créer l'Utilisateur"}
          </Button>
          
            <Button type="button" variant="outline" onClick={onClose} className="rounded-2xl bg-transparent">
              Annuler
            </Button>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-center">
              {error}
            </div>
          )}
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
