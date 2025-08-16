"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Radio, Plus, CreditCard } from "lucide-react"

import { DashboardLayout } from "./layout/dashboard-layout"
import { DashboardOverview } from "./tabs/dashboard-overview"
import { CoursesTab } from "./tabs/courses-tab"
import { LiveCoursesTab } from "./tabs/live-courses-tab"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <DashboardLayout>
      <main className="flex-1 p-4 md:p-6">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TabsList className="grid w-full max-w-[600px] grid-cols-3 rounded-3xl p-1">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
              >
                <Home className="h-4 w-4" />
                Tableau de Bord
              </TabsTrigger>
              <TabsTrigger
                value="coursesDirect"
                className="flex w-full items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
              >
                <Radio className="h-4 w-4 text-red-500" />
                <span>Cours en Direct</span>
                <Badge variant="destructive" className="ml-auto animate-pulse">
                  LIVE
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="courses"
                className="flex w-full items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
              >
                <BookOpen className="h-4 w-4" />
                <span>Cours Enregistrés</span>
                <Badge className="ml-auto">2</Badge>
              </TabsTrigger>
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
                <DashboardOverview onNavigateToTab={setActiveTab} />
              </TabsContent>

              <TabsContent value="coursesDirect" className="space-y-8 mt-0">
                <LiveCoursesTab />
              </TabsContent>

              <TabsContent value="courses" className="space-y-8 mt-0">
                <CoursesTab />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>
    </DashboardLayout>
  )
}
