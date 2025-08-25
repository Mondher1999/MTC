"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Heart,
  Home,
  Lightbulb,
  Lock,
  Menu,
  MessageSquare,
  PanelLeft,
  Play,
  Plus,
  Search,
  Settings,
  Users,
  Video,
  Globe,
  Stethoscope,
  Brain,
  Leaf,
  X,
  CreditCard,
  CheckCircle,
  UserCheck,
  BookMarked,
  Target,
  MoreHorizontal,
  Share2,
  Eye,
  Radio,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const courses = [
  {
    name: "Fondements Théoriques MTC",
    icon: <Brain className="text-primary" />,
    description: "Principes fondamentaux de la médecine traditionnelle chinoise",
    category: "Théorie",
    progress: 0,
    duration: "8 semaines",
    instructor: "Dr. Li Wei",
    students: 52,
  },
  {
    name: "Acupuncture Clinique",
    icon: <Target className="text-secondary" />,
    description: "Techniques d'acupuncture et applications pratiques",
    category: "Pratique",
    progress: 0,
    duration: "12 semaines",
    instructor: "Dr. Zhang Ming",
    students: 56,
  },
  {
    name: "Pharmacopée Chinoise",
    icon: <Leaf className="text-accent" />,
    description: "Phytothérapie et préparations traditionnelles",
    category: "Pharmacologie",
    progress: 0,
    duration: "10 semaines",
    instructor: "Dr. Wang Hua",
    students: 42,
  },
  {
    name: "Diététique Énergétique",
    icon: <Heart className="text-chart-4" />,
    description: "Nutrition selon les principes de la MTC",
    category: "Nutrition",
    progress: 0,
    duration: "6 semaines",
    instructor: "Dr. Chen Lu",
    students: 35,
  },
]

const recentLessons = [
  {
    title: "Les Cinq Éléments en MTC",
    course: "Fondements Théoriques",
    duration: "45 min",
    completed: true,
    date: "Il y a 2 jours",
  },
  {
    title: "Points d'Acupuncture Essentiels",
    course: "Acupuncture Clinique",
    duration: "60 min",
    completed: false,
    date: "Hier",
  },
  {
    title: "Diagnostic par la Langue",
    course: "Fondements Théoriques",
    duration: "30 min",
    completed: true,
    date: "Il y a 3 jours",
  },
]

const upcomingEvents = [
  {
    title: "Webinaire: Cas Cliniques en MTC",
    date: "25 Mai 2025",
    time: "14:00 - 16:00",
    instructor: "Dr. Li Wei",
    participants: 120,
  },
  {
    title: "Atelier Pratique: Moxibustion",
    date: "2 Juin 2025",
    time: "10:00 - 12:00",
    instructor: "Dr. Zhang Ming",
    participants: 30,
  },
  {
    title: "Conférence: Intégration MTC-Médecine Moderne",
    date: "15 Juin 2025",
    time: "16:00 - 18:00",
    instructor: "Dr. Wang Hua",
    participants: 200,
  },
]

const sidebarItems = [
  {
    title: "Administration",
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
    badge: "24",
    items: [
      { title: "Fondements MTC", url: "#", progress: 85 },
      { title: "Méridiens & Points", url: "#", progress: 60 },
      { title: "Pharmacopée", url: "#", progress: 100, completed: true },
      { title: "Diététique Énergétique", url: "#", progress: 30 },
    ],
  },
  /*
  {
    title: "Ressources",
    icon: <FileText />,
    items: [
      { title: "Bibliothèque", url: "#" },
      { title: "Documents", url: "#" },
      { title: "Vidéos", url: "#" },
    ],
  },
  {
    title: "Évaluations",
    icon: <Award />,
    items: [
      { title: "Examens", url: "#" },
      { title: "Devoirs", url: "#" },
      { title: "Certificats", url: "#" },
    ],
  },
  {
    title: "Communauté",
    icon: <Users />,
    items: [
      { title: "Forums", url: "#" },
      { title: "Groupes d'Étude", url: "#" },
      { title: "Événements", url: "#" },
    ],
  },
  {
    title: "Stage en Chine",
    icon: <Globe />,

    items: [
      { title: "Programme", url: "#" },
      { title: "Candidature", url: "#" },
      { title: "Informations", url: "#" },
    ],
  },
  */
]

export function DesignaliCreative() {
  const [progress, setProgress] = useState(0)
  const [notifications, setNotifications] = useState(3)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <motion.div
        className="absolute inset-0 -z-10 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(190, 18, 60, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(236, 72, 153, 0.3) 0%, rgba(190, 18, 60, 0.2) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(217, 119, 6, 0.3) 0%, rgba(190, 18, 60, 0.2) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(190, 18, 60, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                <Stethoscope className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">ATAMTC</h2>
                <p className="text-xs text-muted-foreground">Formation MTC</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => item.items && toggleExpanded(item.title)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        variant={item.badgeVariant || "outline"}
                        className={cn(
                          "ml-auto rounded-full px-2 py-0.5 text-xs",
                          item.badge === "LIVE" && "animate-pulse bg-red-500 text-white border-red-500",
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <ChevronDown
                        className={cn(
                          "ml-2 h-4 w-4 transition-transform",
                          expandedItems[item.title] ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </button>

                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted",
                            subItem.isLive && "bg-red-50 border border-red-200 hover:bg-red-100",
                            subItem.completed && "text-green-600",
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {subItem.isLive && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <Radio className="w-3 h-3 text-red-500" />
                              </div>
                            )}
                            {subItem.isUpcoming && <Clock className="w-3 h-3 text-orange-500" />}
                            {subItem.completed && <CheckCircle className="w-3 h-3 text-green-500" />}
                            <span
                              className={cn(
                                subItem.isLive && "font-medium text-red-700",
                                subItem.completed && "line-through",
                              )}
                            >
                              {subItem.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {subItem.progress !== undefined && (
                              <div className="flex items-center gap-1">
                                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={cn(
                                      "h-full transition-all duration-300",
                                      subItem.completed ? "bg-green-500" : "bg-primary",
                                    )}
                                    style={{ width: `${subItem.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-muted-foreground">{subItem.progress}%</span>
                              </div>
                            )}
                            {subItem.badge && (
                              <Badge
                                variant={subItem.isLive ? "destructive" : subItem.isUpcoming ? "secondary" : "outline"}
                                className={cn(
                                  "ml-auto rounded-full px-2 py-0.5 text-xs",
                                  subItem.isLive && "animate-pulse bg-red-500 text-white",
                                  subItem.time && "bg-orange-100 text-orange-700",
                                )}
                              >
                                {subItem.badge}
                              </Badge>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <span>Dr. Dupont</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                apprenant
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                <Stethoscope className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">ATAMTC</h2>
                <p className="text-xs text-muted-foreground">Formation MTC</p>
              </div>
            </div>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => item.items && toggleExpanded(item.title)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        variant={item.badgeVariant || "outline"}
                        className={cn(
                          "ml-auto rounded-full px-2 py-0.5 text-xs",
                          item.badge === "LIVE" && "animate-pulse bg-red-500 text-white border-red-500",
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <ChevronDown
                        className={cn(
                          "ml-2 h-4 w-4 transition-transform",
                          expandedItems[item.title] ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </button>

                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted",
                            subItem.isLive && "bg-red-50 border border-red-200 hover:bg-red-100",
                            subItem.completed && "text-green-600",
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {subItem.isLive && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <Radio className="w-3 h-3 text-red-500" />
                              </div>
                            )}
                            {subItem.isUpcoming && <Clock className="w-3 h-3 text-orange-500" />}
                            {subItem.completed && <CheckCircle className="w-3 h-3 text-green-500" />}
                            <span
                              className={cn(
                                subItem.isLive && "font-medium text-red-700",
                                subItem.completed && "line-through",
                              )}
                            >
                              {subItem.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {subItem.progress !== undefined && (
                              <div className="flex items-center gap-1">
                                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={cn(
                                      "h-full transition-all duration-300",
                                      subItem.completed ? "bg-green-500" : "bg-primary",
                                    )}
                                    style={{ width: `${subItem.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-muted-foreground">{subItem.progress}%</span>
                              </div>
                            )}
                            {subItem.badge && (
                              <Badge
                                variant={subItem.isLive ? "destructive" : subItem.isUpcoming ? "secondary" : "outline"}
                                className={cn(
                                  "ml-auto rounded-full px-2 py-0.5 text-xs",
                                  subItem.isLive && "animate-pulse bg-red-500 text-white",
                                  subItem.time && "bg-orange-100 text-orange-700",
                                )}
                              >
                                {subItem.badge}
                              </Badge>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <span>Dr. Dupont</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                apprenant
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Formation MTC - ATAMTC</h1>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Messages</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar className="h-9 w-9 border-2 border-primary">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="grid w-full max-w-[600px] grid-cols-3 rounded-3xl p-1">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
              >
                <Home className="h-4 w-4" /> {/* Icône ajoutée ici */}
                Tableau de Bord
              </TabsTrigger>
                <TabsTrigger
                  value="coursesDirect"
                  className="flex w-full items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
                >
                  <Radio className="h-4 w-4 text-red-500" />
                  <span>Cours en Direct</span>
                  
                  <Badge 
                    variant="destructive" 
                    className="ml-auto animate-pulse" // ✨ Ajout de l'animation ici
                  >
                    LIVE
                  </Badge>
                </TabsTrigger>
            
                <TabsTrigger
                  value="courses"
                  className="flex w-full items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Cours Enregistrés</span>
                  
                  {/* On utilise la même technique pour pousser le badge à droite */}
                  <Badge className="ml-auto">
                      2
                  </Badge>
                </TabsTrigger>
              {/*
                <TabsTrigger value="progress" className="rounded-xl data-[state=active]:rounded-xl">
                  Progrès
                </TabsTrigger>
                <TabsTrigger value="community" className="rounded-xl data-[state=active]:rounded-xl">
                  Communauté
                </TabsTrigger>
                */}
              </TabsList>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" className="rounded-2xl bg-transparent">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Paiement
                </Button>
                <Button className="rounded-2xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau Cours
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="dashboard" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-8 text-white relative"
                    >
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 text-6xl">☯</div>
                        <div className="absolute bottom-4 left-4 text-4xl">🏮</div>
                        <div className="absolute top-1/2 right-1/4 text-3xl">🌸</div>
                      </div>
                      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-4">
                          <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                            Formation Exclusive
                          </Badge>
                          <h2 className="text-3xl font-bold">Bienvenue dans votre Formation MTC</h2>
                          <p className="max-w-[600px] text-white/90">
                            Découvrez les secrets millénaires de la Médecine Traditionnelle Chinoise avec nos experts de
                            l'Université de Shanghai.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button className="rounded-2xl bg-white text-primary hover:bg-white/90">
                              Continuer la Formation
                            </Button>
                            <Button
                              variant="outline"
                              className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                            >
                              Programme Détaillé
                            </Button>
                          </div>
                        </div>
                        <div className="hidden lg:block">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="relative h-40 w-40"
                          >
                            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-6xl">
                              ☯
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Mes Cours Actuels</h2>
                      <Button  variant="ghost" className="rounded-2xl">
                        Voir Tous 
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {courses.map((course) => (
                        <motion.div key={course.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                                  {course.icon}
                                </div>
                                <Badge variant="outline" className="rounded-xl">
                                  {course.category}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <CardTitle className="text-lg">{course.name}</CardTitle>
                              <CardDescription className="mb-3">{course.description}</CardDescription>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Progrès</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2 rounded-xl" />
                              </div>
                              <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-4 w-4" />
                                  {course.duration}
                                </div>
                                <div className="flex items-center">
                                  <Users className="mr-1 h-4 w-4" />
                                  {course.students}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                          <Button
                            variant="secondary"
                            className="w-full rounded-2xl"
                            disabled // ✨ Important : Rendre le bouton non cliquable
                          >
                            <Lock className="mr-2 h-4 w-4" /> {/* Icône ajoutée ici */}
                            Contenu verrouillé {/* Texte amélioré */}
                          </Button>
                        </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Leçons Récentes</h2>
                        <Button variant="ghost" className="rounded-2xl">
                          Voir Toutes
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {recentLessons.map((lesson) => (
                            <motion.div
                              key={lesson.title}
                              whileHover={{ backgroundColor: "rgba(190, 18, 60, 0.02)" }}
                              className="flex items-center justify-between p-4"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                                  {lesson.completed ? (
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                  ) : (
                                    <Play className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{lesson.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {lesson.course} • {lesson.duration} • {lesson.date}
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="rounded-xl">
                                {lesson.completed ? "Revoir" : "Commencer"}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Événements à Venir</h2>
                        <Button variant="ghost" className="rounded-2xl">
                          Calendrier
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {upcomingEvents.map((event) => (
                            <motion.div
                              key={event.title}
                              whileHover={{ backgroundColor: "rgba(190, 18, 60, 0.02)" }}
                              className="p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{event.title}</h3>
                                <Badge variant="outline" className="rounded-xl">
                                  {event.date}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {event.time} • Instructeur: {event.instructor}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Users className="mr-1 h-4 w-4" />
                                  {event.participants} participants
                                </div>
                                <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                                  S'inscrire
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Informations Importantes</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      

                      <Card className="rounded-3xl border-secondary/20 bg-secondary/5">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Globe className="h-8 w-8 text-secondary" />
                            <h3 className="font-semibold">Stage en Chine</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Opportunité de stage pratique pendant la formation
                          </p>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            En Savoir Plus
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="rounded-3xl border-accent/20 bg-accent/5">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <GraduationCap className="h-8 w-8 text-accent" />
                            <h3 className="font-semibold">Certification</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Certificat reconnu par l'Université de Shanghai
                          </p>
                          <Button variant="outline" className="w-full rounded-2xl bg-transparent">
                            Voir Critères
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="courses" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Vos Cours en MTC</h2>
                          <p className="max-w-[600px] text-white/80">
                            Approfondissez vos connaissances et compétences en Médecine Traditionnelle Chinoise.
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-red-700 hover:bg-white/90">
                          <GraduationCap className="mr-2 h-4 w-4" />
                          Voir Ma Certification
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Tous les Cours
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Brain className="mr-2 h-4 w-4" />
                      Théorie
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Target className="mr-2 h-4 w-4" />
                      Pratique
                    </Button>
                    
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Heart className="mr-2 h-4 w-4" />
                      Favoris
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Rechercher un cours..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Cours Disponibles</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {courses.map((course) => (
                        <motion.div key={course.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                                  {course.icon}
                                </div>
                                <Badge variant="outline" className="rounded-xl">
                                  {course.category}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <CardTitle className="text-lg">{course.name}</CardTitle>
                              <CardDescription>{course.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                            <Button
                              variant="secondary"
                              className="w-full rounded-2xl"
                              disabled // ✨ Important : Rendre le bouton non cliquable
                            >
                              <Lock className="mr-2 h-4 w-4" /> {/* Icône ajoutée ici */}
                              Contenu verrouillé {/* Texte amélioré */}
                            </Button>
                          </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="resources" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Vos Ressources MTC</h2>
                          <p className="max-w-[600px] text-white/80">
                            Accédez à une bibliothèque complète de ressources pour approfondir vos connaissances.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button className="rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30">
                            <FileText className="mr-2 h-4 w-4" />
                            Bibliothèque
                          </Button>
                          <Button className="rounded-2xl bg-white text-blue-700 hover:bg-white/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter une Ressource
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <FileText className="mr-2 h-4 w-4" />
                      Tous les Fichiers
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Video className="mr-2 h-4 w-4" />
                      Vidéos
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Livres
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Articles
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Rechercher une ressource..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Ressources Populaires</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        Voir Tout
                      </Button>
                    </div>

                    <div className="rounded-3xl border overflow-hidden">
                      <div className="bg-muted/50 p-3 hidden md:grid md:grid-cols-12 text-sm font-medium">
                        <div className="col-span-6">Nom</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Taille</div>
                        <div className="col-span-2">Ajouté</div>
                      </div>
                      <div className="divide-y">
                        {recentLessons.map((file) => (
                          <motion.div
                            key={file.title}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            className="p-3 md:grid md:grid-cols-12 items-center flex flex-col md:flex-row gap-3 md:gap-0"
                          >
                            <div className="col-span-6 flex items-center gap-3 w-full md:w-auto">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{file.title}</p>
                                <div className="flex items-center text-xs text-muted-foreground">{file.course}</div>
                              </div>
                            </div>
                            <div className="col-span-2 text-sm md:text-base">Document</div>
                            <div className="col-span-2 text-sm md:text-base">2.5 MB</div>
                            <div className="col-span-2 flex items-center justify-between w-full md:w-auto">
                              <span className="text-sm md:text-base">Il y a 2 jours</span>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="progress" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Suivez Votre Progrès</h2>
                          <p className="max-w-[600px] text-white/80">
                            Visualisez votre progression dans les différents cours et modules.
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-indigo-700 hover:bg-white/90">
                          <Award className="mr-2 h-4 w-4" />
                          Voir Mes Certificats
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Calendar className="mr-2 h-4 w-4" />
                      Vue d'Ensemble
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Clock className="mr-2 h-4 w-4" />
                      Temps d'Étude
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Award className="mr-2 h-4 w-4" />
                      Évaluations
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Modules Complétés
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Rechercher un cours..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Progression par Cours</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {courses.map((course) => (
                        <motion.div key={course.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle>{course.name}</CardTitle>
                                <Badge variant="outline" className="rounded-xl">
                                  {course.category}
                                </Badge>
                              </div>
                              <CardDescription>{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Progression</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2 rounded-xl" />
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-4 w-4" />
                                  {course.duration}
                                </div>
                                <div className="flex items-center">
                                  <Users className="mr-1 h-4 w-4" />
                                  {course.students} apprenants
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                              <Button variant="secondary" className="flex-1 rounded-2xl">
                                Voir le Cours
                              </Button>
                              <Button variant="outline" size="icon" className="rounded-2xl bg-transparent">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="community" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Rejoignez la Communauté</h2>
                          <p className="max-w-[600px] text-white/80">
                            Connectez-vous avec d'autres apprenants et experts en Médecine Traditionnelle Chinoise.
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-emerald-700 hover:bg-white/90">
                          <Users className="mr-2 h-4 w-4" />
                          Accéder au Forum
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Users className="mr-2 h-4 w-4" />
                      Tous les Membres
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Discussions
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Globe className="mr-2 h-4 w-4" />
                      Événements
                    </Button>
                    <Button variant="outline" className="rounded-2xl bg-transparent">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Conseils & Astuces
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Rechercher un membre..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Dernières Discussions</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {recentLessons.map((tutorial) => (
                        <motion.div key={tutorial.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl">
                            <div className="aspect-video overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button size="icon" variant="secondary" className="h-14 w-14 rounded-full">
                                  <MessageSquare className="h-6 w-6" />
                                </Button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                                  {tutorial.course}
                                </Badge>
                                <h3 className="mt-2 text-lg font-medium">{tutorial.title}</h3>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <p className="text-sm text-muted-foreground">Dernier message: Il y a 2 jours</p>
                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>JD</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">Dr. Dupont</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {tutorial.duration}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t p-4">
                              <Badge variant="outline" className="rounded-xl">
                                Nouveau
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                1200 vues
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
