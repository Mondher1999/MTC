"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  UserPlus,
  GraduationCap,
  BookOpen,
  Settings,
  Mail,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Search,
} from "lucide-react"

import { UserModal } from "../modals/user-modal"
import { SuccessAnimation } from "@/components/ui/success-animation"

export function UserManagementTab() {
  const [showUserModal, setShowUserModal] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [activeView, setActiveView] = useState<"overview" | "students" | "teachers">("overview")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const handleUserAdded = () => {
    setShowUserModal(false)
    setShowSuccessAnimation(true)
    setTimeout(() => setShowSuccessAnimation(false), 3000)
  }

  const handleValidateStudent = (studentId: string, action: "approve" | "reject") => {
    console.log(`[v0] ${action} student:`, studentId)
    // Here you would update the student status in your backend
  }

  const students = [
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
    
    <SuccessAnimation isVisible={showSuccessAnimation} message="Utilisateur ajouté avec succès !" type="user" />
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
              <p className="max-w-[600px] text-white/80">Gérez les étudiants et enseignants de votre plateforme MTC.</p>
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
          <Button
            variant={activeView === "overview" ? "default" : "outline"}
            onClick={() => setActiveView("overview")}
            className="rounded-2xl"
          >
            <Users className="mr-2 h-4 w-4" />
            Vue d'ensemble
          </Button>
          <Button
            variant={activeView === "students" ? "default" : "outline"}
            onClick={() => setActiveView("students")}
            className="rounded-2xl"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Étudiants ({students.length})
          </Button>
          <Button
            variant={activeView === "teachers" ? "default" : "outline"}
            onClick={() => setActiveView("teachers")}
            className="rounded-2xl"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Enseignants ({teachers.length})
          </Button>
        </div>
      </section>

      {activeView === "students" && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tableau de Suivi des Étudiants</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher un étudiant..." className="rounded-2xl pl-9 w-[250px]" />
            </div>
          </div>

          <Card className="rounded-3xl">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom / Prénom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>N° Étudiant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Cours Inscrits</TableHead>
                    <TableHead>Dernière Activité</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.firstName} {student.lastName}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === "active"
                              ? "default"
                              : student.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className="rounded-xl"
                        >
                          {student.status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {student.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                          {student.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                          {student.status === "active"
                            ? "Actif"
                            : student.status === "pending"
                              ? "En attente"
                              : "Rejeté"}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.coursesEnrolled}</TableCell>
                      <TableCell>{new Date(student.lastActivity).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl bg-transparent"
                                onClick={() => setSelectedUser(student)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Fiche Détaillée - {student.firstName} {student.lastName}
                                </DialogTitle>
                                <DialogDescription>Informations complètes de l'étudiant</DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                  <Label>Informations personnelles</Label>
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <strong>Email:</strong> {student.email}
                                    </p>
                                    <p>
                                      <strong>Téléphone:</strong> {student.phone}
                                    </p>
                                    <p>
                                      <strong>Adresse:</strong> {student.address}
                                    </p>
                                    <p>
                                      <strong>Date de naissance:</strong>{" "}
                                      {new Date(student.birthDate).toLocaleDateString("fr-FR")}
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Informations académiques</Label>
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <strong>N° Étudiant:</strong> {student.studentId}
                                    </p>
                                    <p>
                                      <strong>Date d'inscription:</strong>{" "}
                                      {new Date(student.joinDate).toLocaleDateString("fr-FR")}
                                    </p>
                                    <p>
                                      <strong>Cours inscrits:</strong> {student.coursesEnrolled}
                                    </p>
                                    <p>
                                      <strong>Dernière activité:</strong>{" "}
                                      {new Date(student.lastActivity).toLocaleDateString("fr-FR")}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 space-y-2">
                                  <Label>Notes</Label>
                                  <p className="text-sm text-muted-foreground">{student.notes}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {student.status === "pending" && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                className="rounded-xl bg-green-600 hover:bg-green-700"
                                onClick={() => handleValidateStudent(student.id, "approve")}
                              >
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="rounded-xl"
                                onClick={() => handleValidateStudent(student.id, "reject")}
                              >
                                <XCircle className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      )}

      {activeView === "teachers" && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Tableau de Suivi des Enseignants</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher un enseignant..." className="rounded-2xl pl-9 w-[250px]" />
            </div>
          </div>

          <Card className="rounded-3xl">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom / Prénom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Spécialisation</TableHead>
                    <TableHead>Cours Enseignés</TableHead>
                    <TableHead>Étudiants</TableHead>
                    <TableHead>Dernière Activité</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">
                        {teacher.firstName} {teacher.lastName}
                      </TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.specialization}</TableCell>
                      <TableCell>{teacher.coursesTeaching}</TableCell>
                      <TableCell>{teacher.studentsCount}</TableCell>
                      <TableCell>{new Date(teacher.lastActivity).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl bg-transparent"
                                onClick={() => setSelectedUser(teacher)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Fiche Détaillée - {teacher.firstName} {teacher.lastName}
                                </DialogTitle>
                                <DialogDescription>Informations complètes de l'enseignant</DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                  <Label>Informations personnelles</Label>
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <strong>Email:</strong> {teacher.email}
                                    </p>
                                    <p>
                                      <strong>Téléphone:</strong> {teacher.phone}
                                    </p>
                                    <p>
                                      <strong>Adresse:</strong> {teacher.address}
                                    </p>
                                    <p>
                                      <strong>Date de naissance:</strong>{" "}
                                      {new Date(teacher.birthDate).toLocaleDateString("fr-FR")}
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Informations professionnelles</Label>
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <strong>Spécialisation:</strong> {teacher.specialization}
                                    </p>
                                    <p>
                                      <strong>Date d'embauche:</strong>{" "}
                                      {new Date(teacher.joinDate).toLocaleDateString("fr-FR")}
                                    </p>
                                    <p>
                                      <strong>Cours enseignés:</strong> {teacher.coursesTeaching}
                                    </p>
                                    <p>
                                      <strong>Nombre d'étudiants:</strong> {teacher.studentsCount}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 space-y-2">
                                  <Label>Notes</Label>
                                  <p className="text-sm text-muted-foreground">{teacher.notes}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      )}

      {activeView === "overview" && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Vue d'ensemble des Utilisateurs</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ...students.map((student) => ({ ...student, userType: "student" })),
              ...teachers.map((teacher) => ({ ...teacher, userType: "teacher" })),
            ].map((user) => (
              <motion.div
                key={`${user.userType}-${user.id}`}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="overflow-hidden rounded-3xl border-2 transition-all duration-300 hover:border-primary/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={"specialization" in user ? "default" : "secondary"} className="rounded-xl">
                        {"specialization" in user ? (
                          <>
                            <BookOpen className="w-3 h-3 mr-1" />
                            Enseignant
                          </>
                        ) : (
                          <>
                            <GraduationCap className="w-3 h-3 mr-1" />
                            Étudiant
                          </>
                        )}
                      </Badge>
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className={`rounded-xl ${user.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}`}
                      >
                        {user.status === "active" ? "Actif" : user.status === "pending" ? "En attente" : "Rejeté"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardTitle className="text-lg">
                      {user.firstName} {user.lastName}
                    </CardTitle>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-3 w-3" />
                        {user.email}
                      </div>
                      {"specialization" in user && (
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-3 w-3" />
                          {user.specialization}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-3 w-3" />
                        Inscrit le {new Date(user.joinDate).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl bg-transparent">
                      <Settings className="mr-2 h-4 w-4" />
                      Gérer
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <UserModal isOpen={showUserModal} onClose={() => setShowUserModal(false)} onSuccess={handleUserAdded} />

    </>
  )
}
