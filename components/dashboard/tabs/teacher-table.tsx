"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Settings, Eye, Search } from "lucide-react"

interface Teacher {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: string
  status: string
  joinDate: string
  coursesTeaching: number
  studentsCount: number
  lastActivity: string
  address: string
  birthDate: string
  notes: string
}

interface TeacherTableProps {
  teachers: Teacher[]
}

export function TeacherTable({ teachers }: TeacherTableProps) {
  const [selectedUser, setSelectedUser] = useState<Teacher | null>(null)

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Tableau de Suivi des Enseignants</h2>
        
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
                <TableHead>apprenants</TableHead>
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
                                  <strong>Nombre d'apprenants:</strong> {teacher.studentsCount}
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
  )
}
