"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Receipt,
  Download,
  ImageIcon,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Hash,
  Sparkles,
  Shield,
  RefreshCw,
  Filter,
  Users,
  Clock,
  CheckSquare,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  FileText,
  Settings,
  Bell,
  MessageSquare,
  Save,
  AlertTriangle,
} from "lucide-react"
import type { Userss } from "@/types/Clients"
import { getStudentsNotVerified, validateUserAccess } from "@/services/Service"
import { SuccessAnimation } from "@/components/ui/success-animation"

interface StudentTableProps {
  onValidateStudent: (studentId: string, action: "approve" | "reject") => void
  onViewReceipt: (studentId: string) => void
  refreshTrigger: number // <--- NOUVEAU : Le déclencheur
  onSuccess: (message: string) => void  // ← Ajouter ceci

}


const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/api" // production → nginx forwards to backend
    : "http://localhost:4002"; // local dev → direct backend

export function StudentTable({ onValidateStudent, onViewReceipt,onSuccess, refreshTrigger }: StudentTableProps) { 

  const [students, setStudents] = useState<Userss[]>([])
  const [loading, setLoading] = useState(true)
  
  const [selectedUser, setSelectedUser] = useState<Userss | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getStudentsNotVerified()
        setStudents(data)
        
      } catch (error) {
        console.error("Error fetching students:", error)
        setError("Erreur lors du chargement des étudiants. Veuillez réessayer.")
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [refreshTrigger]) // <--- MODIFIÉ : Réagit au changement du déclencheur

  const refreshStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getStudentsNotVerified()
      setStudents(data)
    } catch (error) {
      console.error("Error refreshing students:", error)
      setError("Erreur lors de l'actualisation. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students
  // exclusion stricte : ne jamais montrer (false,false)
  .filter((s) => !( !toBool(s.formValidated) && !toBool(s.accessValidated) ))
  .filter((student) => {
    const q = searchTerm.trim().toLowerCase()

    const name = `${student.firstName ?? ""} ${student.lastName ?? ""}`.toLowerCase()
    const email = (student.email ?? "").toLowerCase()
    const phone = (student.telNumber ?? "").toLowerCase()

    // 🔎 recherche par numéro
    const idFull = (student.id ?? "").toLowerCase()
    const idShort = (`etu${(student.id ?? "").slice(-6)}`).toLowerCase()
    const receiptStr =
      typeof student.receipt === "string"
        ? student.receipt.toLowerCase()
        : (student.receipt ?? "").toLowerCase()

    const matchesSearch =
      q === "" ||
      name.includes(q) ||
      email.includes(q) ||
      phone.includes(q) ||
      idFull.includes(q) ||      // ex: "6512f3a…"
      idShort.includes(q) ||     // ex: "etu123456"
      receiptStr.includes(q)     // ex: n° de reçu

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "approved" && toBool(student.formValidated) && toBool(student.accessValidated)) ||
      (statusFilter === "pending"  && toBool(student.formValidated) && !toBool(student.accessValidated)) ||
      (statusFilter === "rejected" && !toBool(student.formValidated))

    return matchesSearch && matchesStatus
  })


// petit utilitaire
function toBool(value: any): boolean {
  return value === true || value === "true" || value === 1 || value === "1"
}

const handleValidateStudent = async (studentId: string, action: "approve" | "reject") => {
  try {
    if (action === "approve") {
      const updatedClientData =  {
        accessValidated: "true", // String au lieu de boolean
      };
      
      await validateUserAccess(studentId, updatedClientData);
      refreshStudents();
     
      setSuccessMessage("Validé avec succès !")
      setShowSuccessAnimation(true)
      setTimeout(() => setShowSuccessAnimation(false), 3000)
    }
  } catch (error) {
    console.error("Error validating student:", error);
  }
};




  const handleViewReceipt = (studentId: string) => {
    onViewReceipt(studentId)
  }

  const handleViewPhoto = (photoUrl: string) => {
    window.open(photoUrl, "_blank")
  }

  const handleSelectStudent = (studentId: string) => {
    const newSelected = new Set(selectedStudents)
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId)
    } else {
      newSelected.add(studentId)
    }
    setSelectedStudents(newSelected)
  }

  

  const handleSelectAll = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set())
    } else {
      setSelectedStudents(new Set(filteredStudents.map((s) => s.id)))
    }
  }

  const getImageUrl = (path?: string) => {
    // 1. If the path is missing/empty → return empty string (so you can show "Pas de photo uploadée")
    if (!path || typeof path !== "string" || path.trim() === "") {
      return "";
    }
  
    // 2. If it's already a full URL (like Cloud Storage), return it directly
    if (path.startsWith("http")) {
      return path;
    }
  
    // 3. Otherwise build from API_BASE
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE}${cleanPath}`;
  };
  
    
  const displayedStudents = students.filter(
    (s) => !( !toBool(s.formValidated) && !toBool(s.accessValidated) )
  )

  const stats = {
    total: displayedStudents.length,
    pending: displayedStudents.filter((s) => s.formValidated && !s.accessValidated).length,
    approved: displayedStudents.filter((s) => s.formValidated && s.accessValidated).length,
    rejected: displayedStudents.filter((s) => !s.formValidated).length,
  }


  const SkeletonRow = () => (
    <TableRow className="animate-pulse">
      <TableCell className="py-8 px-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-muted"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-32"></div>
            <div className="h-3 bg-muted rounded w-24"></div>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-8 px-8">
        <div className="space-y-3">
          <div className="h-10 bg-muted rounded-xl"></div>
          <div className="h-10 bg-muted rounded-xl"></div>
        </div>
      </TableCell>
      <TableCell className="py-8 px-8">
        <div className="h-6 bg-muted rounded-full w-20"></div>
      </TableCell>
      <TableCell className="py-8 px-8">
        <div className="space-y-4">
          <div className="h-16 bg-muted rounded-xl"></div>
          <div className="h-16 bg-muted rounded-xl"></div>
        </div>
      </TableCell>
      <TableCell className="py-8 px-8">
        <div className="h-10 bg-muted rounded-xl w-32 ml-auto"></div>
      </TableCell>
    </TableRow>
  )

  return (
<>
    <SuccessAnimation
    isVisible={showSuccessAnimation}
    onComplete={() => setShowSuccessAnimation(false)}
    message={successMessage}
  />
    {/* Header Section */}
    <section className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Gestion des apprenants
              </h2>
              <p className="text-muted-foreground font-medium">
                Gérez et validez les inscriptions des apprenants 
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                  <div className="text-xs text-muted-foreground font-medium">Total</div>
                </div>
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
                  <div className="text-xs text-muted-foreground font-medium">En attente</div>
                </div>
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-emerald-500" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.approved}</div>
                  <div className="text-xs text-muted-foreground font-medium">Approuvés</div>
                </div>
              </div>
            </div>
           
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshStudents}
            disabled={loading}
            className="hover-lift bg-background/50 border-border/50 hover:border-primary/50 rounded-xl"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvés</SelectItem>
              <SelectItem value="rejected">Rejetés</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2 transition-colors group-focus-within:text-primary" />
              <Input
                type="search"
                placeholder="Rechercher un apprenant..."
                className="pl-11 w-[320px] h-12 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-card rounded-2xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <Card className="premium-card border-0 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          {error && (
            <div className="flex items-center justify-center py-12 px-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Erreur de chargement</h3>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={refreshStudents} variant="outline" className="hover-lift bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réessayer
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!error &&
            (loading ? (
              <div className="premium-table w-full border-0">
                <Table>
                  <TableHeader className="premium-table-header bg-gradient-to-r from-muted/50 to-muted/30">
                    <TableRow className="border-b border-border/30 hover:bg-transparent">
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide w-12">
                        <input
                          type="checkbox"
                          className="rounded border-border/50"
                          checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
                          onChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide">
                      apprenant
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide">
                        Contact
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide">
                        Statut
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide text-center">
                        Documents
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <SkeletonRow key={index} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="premium-table w-full border-0">
                <Table>
                  <TableHeader className="premium-table-header bg-gradient-to-r from-muted/50 to-muted/30">
                    <TableRow className="border-b border-border/30 hover:bg-transparent">
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide w-12">
                        <input
                          type="checkbox"
                          className="rounded border-border/50"
                          checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
                          onChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide">
                      apprenant
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide">
                        Contact
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide">
                        Statut
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide text-center">
                        Documents
                      </TableHead>
                      <TableHead className="font-bold text-foreground py-6 px-8 text-sm tracking-wide text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {filteredStudents.map((student,index) => (

                      <TableRow
                        key={student.id}
                        className={`premium-table-row animate-fade-in-up stagger-${Math.min(index + 1, 6)} border-b border-border/20 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-300 ${
                          selectedStudents.has(student.id) ? "bg-primary/5" : ""
                        }`}
                      >
                        <TableCell className="py-8 px-8">
                          <input
                            type="checkbox"
                            className="rounded border-border/50"
                            checked={selectedStudents.has(student.id)}
                            onChange={() => handleSelectStudent(student.id)}
                          />
                        </TableCell>

                        <TableCell className="py-8 px-8">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center shadow-lg border border-border/50">
                                <User className="h-6 w-6 text-primary" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                                <Sparkles className="h-2 w-2 text-white" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="font-semibold text-foreground text-lg">
                                {student.firstName} {student.lastName}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Hash className="h-3 w-3" />
                                <span className="font-mono font-medium">ETU{student.id.slice(-6)}</span>
                              </div>
                             
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-8 px-8">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-colors">
                              <Mail className="h-4 w-4 text-primary" />
                              <span className="text-foreground font-medium text-sm">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-colors">
                              <Phone className="h-4 w-4 text-primary" />
                              <span className="text-muted-foreground font-medium text-sm">
                                {student.telNumber || "Non renseigné"}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-8 px-8">
                          <div className="flex flex-col items-start gap-2">
                                                    <Badge
                                  className={`
                                    px-4 py-2 text-xs font-semibold tracking-wide shadow-sm rounded-full
                                    ${
                                      student.formValidated && student.accessValidated
                                        ? "bg-green-100 text-green-800 border border-green-300" // ✅ approuvé
                                        : student.formValidated && !student.accessValidated
                                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300" // ⏳ en attente
                                          : "bg-red-100 text-red-800 border border-red-300" // ❌ non validé
                                    }
                                  `}
                                >
                                  {student.formValidated && student.accessValidated
                                    ? "✓ Approuvé"
                                    : student.formValidated && !student.accessValidated
                                      ? "⏳ En attente"
                                      : "❌ Non validé"}
                                </Badge>



                            {!student.accessValidated && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Shield className="h-3 w-3" />
                                <span>Validation requise</span>
                              </div>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="py-8 px-8">
                          <div className="flex flex-col items-center gap-4">
                            {/* Photo Section */}
                           

                            {/* Receipt Section */}
                            <div className="premium-document-card w-full max-w-[200px]">
                              
                              {student.formValidated ? (
                                <div className="space-y-3">
                                  <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                                    
                                    <div className="text-center py-4">
                                  <Receipt className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-xs text-muted-foreground"> Reçu disponible</p>
                                </div>
                                  </div>
                                
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <Receipt className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-xs text-muted-foreground">Non disponible</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-8 px-8 text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="lg"
                                className="hover-lift bg-gradient-to-r from-background to-background/80 border-border/50 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 px-6 py-3"
                                onClick={() => setSelectedUser(student)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                <span className="font-medium">Voir détails</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="premium-dialog max-w-6xl max-h-[95vh] overflow-y-auto">
  <DialogHeader className="premium-dialog-header bg-gradient-to-r from-muted/30 to-muted/10 border-b border-border/30">
    <DialogTitle className="text-2xl font-bold flex items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center shadow-xl border border-border/50">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Fiche Détaillée - {student.firstName} {student.lastName}
        </div>
      </div>
    </DialogTitle>
    <DialogDescription className="text-muted-foreground font-medium text-base mt-2">
      Informations complètes et documents de l'apprenant
    </DialogDescription>
  </DialogHeader>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
    {/* Personal Information */}
    <div className="premium-info-section animate-slide-in-right stagger-1 hover-glow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <User className="h-5 w-5 text-primary" />
        </div>
        <Label className="text-lg font-bold text-foreground">
          Informations personnelles
        </Label>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-all duration-200">
          <Mail className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="text-xs text-muted-foreground font-medium mb-1">Email</div>
            <div className="font-semibold text-foreground">{student.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-all duration-200">
          <Phone className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="text-xs text-muted-foreground font-medium mb-1">Téléphone</div>
            <div className="font-semibold text-foreground">
              {student.telNumber || "Non renseigné"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-all duration-200">
          <MapPin className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="text-xs text-muted-foreground font-medium mb-1">Adresse</div>
            <div className="font-semibold text-foreground">
              {student.address || "Non renseignée"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-all duration-200">
          <Calendar className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="text-xs text-muted-foreground font-medium mb-1">
              Date de naissance
            </div>
            <div className="font-semibold text-foreground">
              {student.dateOfBirth
                ? new Date(student.dateOfBirth).toLocaleDateString("fr-FR")
                : "Non renseignée"}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Profile Photo */}
    <div className="premium-info-section animate-slide-in-right stagger-2 hover-glow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <ImageIcon className="h-5 w-5 text-primary" />
        </div>
        <Label className="text-lg font-bold text-foreground">Photo d'apprenant</Label>
      </div>
      {student.formValidated ? (
  <div className="space-y-6">
    <div className="relative group">
      <div className="w-48 h-48 rounded-2xl overflow-hidden bg-muted mx-auto border-4 border-border/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
      <img
        src={getImageUrl(typeof student?.photoId === "string" ? student.photoId : "")}
        alt="Photo de l'étudiant"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          // This is still great to have as a final safety net!
          e.currentTarget.src = "/photo.jpg";
        }}
/>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <Button
  size="lg"
  variant="outline"
  onClick={() =>
    handleViewPhoto(
      getImageUrl(
        typeof student?.photoId === "string" && student.photoId.trim()
          ? student.photoId
          : "/photo.jpg"
      )
    )
  }
  className="w-full hover-lift bg-background/50 border-border/50 hover:border-primary/50 rounded-xl py-3"
>
  <Eye className="h-4 w-4 mr-2" />
  <span className="font-medium">Voir en grand</span>
</Button>

  </div>
) : (
  <div className="text-center py-12">
    <div className="w-24 h-24 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-border">
      <ImageIcon className="h-12 w-12 text-muted-foreground" />
    </div>
    <p className="text-muted-foreground font-medium">Formulaire non validé - Photo non disponible</p>
  </div>
)}
    </div>

  
{/* Payment Receipt */}
<div className="premium-info-section animate-slide-in-right stagger-2 hover-glow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <ImageIcon className="h-5 w-5 text-primary" />
        </div>
        <Label className="text-lg font-bold text-foreground">Reçu de paiement</Label>
      </div>
      {student.receipt ? (
  <div className="space-y-6">
    <div className="relative group">
      <div className="w-48 h-48 rounded-2xl overflow-hidden bg-muted mx-auto border-4 border-border/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
      <img
        src={getImageUrl(typeof student?.receipt === "string" ? student.receipt : "")}
        alt="Photo de l'étudiant"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          // This is still great to have as a final safety net!
          e.currentTarget.src = "/photo.jpg";
        }}
/>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <Button
  size="lg"
  variant="outline"
  onClick={() =>
    handleViewPhoto(
      getImageUrl(
        typeof student?.receipt === "string" && student.receipt.trim()
          ? student.receipt
          : "/photo.jpg"
      )
    )
  }
  className="w-full hover-lift bg-background/50 border-border/50 hover:border-primary/50 rounded-xl py-3"
>
  <Eye className="h-4 w-4 mr-2" />
  <span className="font-medium">Voir en grand</span>
</Button>

  </div>
  ) : student.formValidated ? (
    // Affichage avec image par défaut si formulaire validé mais pas de reçu
    <div className="grid grid-cols-1 gap-3">
    <Button
      size="lg"
      variant="outline"
      onClick={() =>
        handleViewPhoto(
          getImageUrl(
            typeof student?.receipt === "string" && student.receipt.trim()
              ? student.receipt
              : "/photo.jpg"
          )
        )
      }
      className="w-full hover-lift bg-background/50 border-border/50 hover:border-primary/50 rounded-xl py-3"
    >
      <Eye className="h-4 w-4 mr-2" />
      <span className="font-medium">Voir en grand</span>
    </Button>
  </div>
  ) : (
    // Affichage original si formulaire non validé
    <div className="text-center py-12">
      <div className="w-24 h-24 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-border">
        <Receipt className="h-12 w-12 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground font-medium">
        Formulaire non validé - Aucun reçu disponible
      </p>
    </div>
  )}
</div>
    {/* Admin Section - Status & Validation */}
    <div className="col-span-1 lg:col-span-3 animate-fade-in-up stagger-4">
      <div className="premium-admin-section bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900/50 dark:via-blue-900/20 dark:to-indigo-900/10 border-2 border-border/30 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <Label className="text-xl font-bold text-foreground">
                Panneau d'Administration
              </Label>
              <p className="text-muted-foreground font-medium mt-1">
                Gérer le statut et la validation de l'inscription
              </p>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
            student.accessValidated 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : !student.accessValidated
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}>
            {student.accessValidated ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Validé
              </>
            ) : !student.accessValidated ? (
              <>
                <Clock className="h-4 w-4" />
                En attente
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Rejeté
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Student ID */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-border/30">
            <Hash className="h-5 w-5 text-purple-600" />
            <div>
              <div className="text-xs text-muted-foreground font-medium mb-1">ID apprenant</div>
              <div className="font-mono font-bold text-sm">#{student.id}</div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-border/30">
            <CreditCard className="h-5 w-5 text-green-600" />
            <div>
              <div className="text-xs text-muted-foreground font-medium mb-1">Paiement</div>
              <div className="font-semibold text-sm">
                {student.receipt ? "Effectué" : "En attente"}
              </div>
            </div>
          </div>

          {/* Documents Status */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-border/30">
            <FileText className="h-5 w-5 text-orange-600" />
            <div>
              <div className="text-xs text-muted-foreground font-medium mb-1">Documents</div>
              <div className="font-semibold text-sm">
                {student.photoId && student.receipt ? "Complets" : "Incomplets"}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons for Pending Status */}
        {!student.accessValidated && (
          <div className="space-y-6">
            <div className="border-t border-border/30 pt-6">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Actions de validation
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Approve Button - Simple, no note required */}
                <Button
                  onClick={() => handleValidateStudent(student.id, "approve")}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 px-6 text-base font-semibold rounded-xl flex items-center justify-center gap-3"
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5" />
                  Valider l'inscription
                </Button>
                
                {/* Reject Button with Required Reason */}
               
              </div>
            </div>

          
          </div>
        )}

        {/* Validation Success Message */}
        {student.accessValidated&& (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-green-800 dark:text-green-300">
                  Inscription validée
                </h4>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  L'apprenant a été validé et peut maintenant accéder à la plateforme
                </p>
              </div>
            </div>
            
           
          </div>
        )}
      </div>
    </div>
  </div>
</DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
        </CardContent>
      </Card>

      {!loading && !error && filteredStudents.length === 0 && (
        <div className="text-center py-20 animate-fade-in-up">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-border">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Aucun apprenant trouvé</h3>
          <p className="text-muted-foreground font-medium text-lg max-w-md mx-auto">
            {searchTerm || statusFilter !== "all"
              ? "Essayez de modifier vos filtres de recherche"
              : "Aucun apprenant inscrit pour le moment"}
          </p>
          {(searchTerm || statusFilter !== "all") && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
              }}
              className="mt-4 hover-lift"
            >
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      )}
    </section>
    </>
  )
}
