import { Home, Radio, BookOpen, Users } from "lucide-react"
import { JSX } from "react"

export interface SidebarItem {
  title: string
  icon: JSX.Element
  isActive?: boolean
  badge?: string
  badgeVariant?: "destructive" | "outline" | "secondary"
  tabValue: string
  roleRestriction?: string
  items?: any[]
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Tableau de Bord",
    icon: <Home />,
    isActive: true,
    tabValue: "dashboard",
    roleRestriction: "enseignant" // Enseignant won't see dashboard
  },
  {
    title: "Cours en Direct",
    icon: <Radio className="text-red-500" />,
    badge: "LIVE",
    badgeVariant: "destructive" as const,
    tabValue: "coursesDirect"
  },
  {
    title: "Cours Enregistrés",
    icon: <BookOpen />,
    tabValue: "courses",
    roleRestriction: "enseignant" // Enseignant won't see recorded courses
  },
  {
    title: "Administration",
    icon: <Users />,
    tabValue: "users",
    roleRestriction: "etudiant" // Student won't see administration
    // Note: Additional filter in sidebar component prevents enseignant from seeing this too
  }
]