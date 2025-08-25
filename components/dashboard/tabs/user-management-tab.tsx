"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, GraduationCap, BookOpen, Settings, Mail, Calendar } from "lucide-react"

import { StudentTable } from "./student-table"
import { TeacherTable } from "./teacher-table"
import { UserModal } from "../modals/user-modal"
import { SuccessAnimation } from "@/components/ui/success-animation"

export function UserManagementTab() {
  const [showUserModal, setShowUserModal] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [activeView, setActiveView] = useState<"overview" | "students" | "teachers">("students")

  const handleUserAdded = () => {
    setShowUserModal(false)
    setShowSuccessAnimation(true)
    setTimeout(() => setShowSuccessAnimation(false), 3000)
  }

  const handleViewReceipt = (studentId: string) => {
    console.log("[v0] view receipt:", studentId)
  }

  const handleValidateStudent = (studentId: string, action: "approve" | "reject") => {
    console.log(`[v0] ${action} student:`, studentId)
    // Here you would update the student status in your backend
    // Show success animation
    setShowSuccessAnimation(true)
    setTimeout(() => setShowSuccessAnimation(false), 2000)
  }

  type Student = {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    studentId: string
    status: "active" | "pending" | "rejected"
    joinDate: string
    coursesEnrolled: number
    lastActivity: string
    address: string
    birthDate: string
    notes: string
    paymentAmount: string
    paymentStatus: "paid" | "pending"
    paymentDate?: string
    receiptNumber?: string
  }

  const students: Student[] = [
    {
      id: "1",
      firstName: "Marie",
      lastName: "Dubois",
      email: "marie.dubois@email.com",
      phone: "+33 1 23 45 67 89",
      studentId: "ETU2024001",
      status: "pending",
      joinDate: "2024-01-15",
      coursesEnrolled: 3,
      lastActivity: "2024-01-20",
      address: "123 Rue de la Paix, Paris",
      birthDate: "1995-03-15",
      notes: "Très motivée, excellents résultats",
      paymentAmount: "€0",
      paymentStatus: "pending",
    },
    {
      id: "2",
      firstName: "Jean",
      lastName: "Martin",
      email: "jean.martin@email.com",
      phone: "+33 1 98 76 54 32",
      studentId: "ETU2024002",
      status: "active",
      joinDate: "2024-02-20",
      coursesEnrolled: 5,
      lastActivity: "2024-02-25",
      address: "456 Avenue des Champs, Lyon",
      birthDate: "1992-07-22",
      notes: "Participation active en cours",
      paymentAmount: "€250",
      paymentStatus: "paid",
      paymentDate: "2024-02-18",
      receiptNumber: "RC-2024-0001",
    },
    {
      id: "3",
      firstName: "Sophie",
      lastName: "Laurent",
      email: "sophie.laurent@email.com",
      phone: "+33 1 11 22 33 44",
      studentId: "ETU2024003",
      status: "rejected",
      joinDate: "2024-01-10",
      coursesEnrolled: 0,
      lastActivity: "2024-01-12",
      address: "789 Boulevard Saint-Germain, Paris",
      birthDate: "1988-11-08",
      notes: "Dossier incomplet",
      paymentAmount: "€0",
      paymentStatus: "pending",
    },
  ]

  const teachers = [
    {
      id: "1",
      firstName: "Dr. Zhang",
      lastName: "Ming",
      email: "zhang.ming@mtc.com",
      phone: "+33 1 55 66 77 88",
      specialization: "Acupuncture Avancée",
      status: "active",
      joinDate: "2023-09-01",
      coursesTeaching: 8,
      studentsCount: 45,
      lastActivity: "2024-02-26",
      address: "Centre MTC, 12 Rue de la Santé, Paris",
      birthDate: "1975-05-12",
      notes: "Expert reconnu, 20 ans d'expérience",
    },
    {
      id: "2",
      firstName: "Dr. Wang",
      lastName: "Hua",
      email: "wang.hua@mtc.com",
      phone: "+33 1 44 55 66 77",
      specialization: "Phytothérapie Chinoise",
      status: "active",
      joinDate: "2023-10-15",
      coursesTeaching: 6,
      studentsCount: 32,
      lastActivity: "2024-02-25",
      address: "Institut de Médecine Chinoise, Marseille",
      birthDate: "1980-09-30",
      notes: "Spécialiste des plantes médicinales",
    },
  ]

  return (
    <>
    
    <SuccessAnimation isVisible={showSuccessAnimation} message="Utilisateur ajouté avec succès !" onComplete={() => setShowSuccessAnimation(false)} />
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                <Users className="mr-1 h-3 w-3" />
                GESTION
              </Badge>
              <h2 className="text-3xl font-bold">Gestion des Utilisateurs</h2>
              <p className="max-w-[600px] text-white/80">Gérez les apprenants et enseignants de votre plateforme MTC.</p>
            </div>
            <Button
              onClick={() => setShowUserModal(true)}
              className="w-fit rounded-2xl bg-white text-blue-700 hover:bg-white/90"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un Utilisateur
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {/*
          <Button
            variant={activeView === "overview" ? "default" : "outline"}
            onClick={() => setActiveView("overview")}
            className="rounded-2xl"
          >
            <Users className="mr-2 h-4 w-4" />
            Vue d'ensemble
          </Button>
            <Button
            variant={activeView === "teachers" ? "default" : "outline"}
            onClick={() => setActiveView("teachers")}
            className="rounded-2xl"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Enseignants ({teachers.length})
          </Button>
         
          */}
           <Button
            variant={activeView === "students" ? "default" : "outline"}
            onClick={() => setActiveView("students")}
            className="rounded-2xl"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            apprenants ({students.length})
          </Button>
        
        </div>
      </section>

        {activeView === "students" && (
  <StudentTable
 
    onValidateStudent={handleValidateStudent}
    onViewReceipt={handleViewReceipt}   // keep this
  />
)}
   

    

      <UserModal isOpen={showUserModal} onClose={() => setShowUserModal(false)} onSuccess={handleUserAdded} />

    </>
  )
}
