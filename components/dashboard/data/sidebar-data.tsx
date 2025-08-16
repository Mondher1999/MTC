import { Home, Radio, BookOpen } from "lucide-react"

export const sidebarItems = [
  {
    title: "Tableau de Bord",
    icon: <Home />,
    isActive: true,
  },
  {
    title: "Cours en Direct",
    icon: <Radio className="text-red-500" />,
    badge: "LIVE",
    badgeVariant: "destructive" as const,
    items: [
      { title: "Acupuncture Avancée", url: "#", badge: "LIVE", isLive: true, time: "14:30" },
      { title: "Phytothérapie Chinoise", url: "#", badge: "15:00", isUpcoming: true },
      { title: "Diagnostic Énergétique", url: "#", badge: "17:00", isUpcoming: true },
    ],
  },
  {
    title: "Cours Enregistrés",
    icon: <BookOpen />,
    badge: "2",
    items: [
      { title: "Fondements MTC", url: "#", progress: 0, locked: false },
      { title: "Méridiens & Points", url: "#", progress: 0, locked: true },
      { title: "Pharmacopée", url: "#", progress: 0, locked: true },
      { title: "Diététique Énergétique", url: "#", progress: 0, locked: false },
    ],
  },
]
