"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Radio, Plus, CreditCard, Users } from "lucide-react"

import { DashboardLayout } from "./layout/dashboard-layout"
import { DashboardOverview } from "./tabs/dashboard-overview"
import { CoursesTab } from "./tabs/courses-tab"
import { LiveCoursesTab } from "./tabs/live-courses-tab"
import { UserManagementTab } from "./tabs/user-management-tab"
import { useAuth } from "@/contexts/AuthContext"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
 
  const { user } = useAuth(); // ✅ top-level


  
  return (
    <DashboardLayout>
      <main className="flex-1 p-4 md:p-6">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList
        className={`grid w-full max-w-[800px] rounded-3xl p-1 ${
          user?.role === "etudiant" ? "grid-cols-3" : "grid-cols-4"
        }`}
>
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
            {/* Conditionnel : n'affiche que si le rôle n'est pas "etudiant" */}
            {/* Conditionnel : n'affiche que si le rôle n'est pas "etudiant" */}
            {user?.role !== "etudiant" && (
              <TabsTrigger
                value="users"
                className="flex w-full items-center gap-2 rounded-xl data-[state=active]:rounded-xl"
              >
                <Users className="h-4 w-4" />
                <span>Utilisateurs</span>
                <Badge className="ml-auto">12</Badge>
              </TabsTrigger>
            )}
          </TabsList>
          
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

              <TabsContent value="users" className="space-y-8 mt-0">
                <UserManagementTab />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>

      
    </DashboardLayout>
  )
}
