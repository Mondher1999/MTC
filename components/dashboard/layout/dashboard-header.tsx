"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  PanelLeft,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  Monitor,
  MessageCircle,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useLoading } from "@/contexts/LoadingContext"
import { useAuth } from "@/contexts/AuthContext"

interface DashboardHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
}

export function DashboardHeader({ sidebarOpen, setSidebarOpen, setMobileMenuOpen }: DashboardHeaderProps) {
  const notifications = 3
  const router = useRouter()
  const { startLoading, stopLoading } = useLoading()
  const { role,name } = useAuth();
  const handleSignOut = async () => {
    try {
      startLoading()
      await signOut(auth)
      setTimeout(() => {
        stopLoading()
        router.push("/auth")
      }, 1000)
    } catch (error) {
      console.error("Error signing out:", error)
      stopLoading()
    }
  }

  return (
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-2xl px-3 py-2 h-auto hover:bg-muted/50 transition-all duration-200"
              >
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Dupont" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-sm font-semibold">
                    DD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium">{name}</span>
                  <span className="text-xs text-muted-foreground">{role}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 rounded-2xl border-0 bg-card shadow-2xl animate-in slide-in-from-top-2 duration-200"
            >
              {/* Profile Section */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Dr. Dupont" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                      DD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">Dr. Dupont</p>
                    <p className="text-sm text-muted-foreground">dr.dupont@mtc.com</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Settings className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Paramètres & confidentialité</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-blue-500/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <HelpCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Aide & support</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-green-500/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Monitor className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Affichage & accessibilité</p>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="rounded-xl p-3 cursor-pointer hover:bg-orange-500/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <MessageCircle className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p className="font-medium">Donner un avis</p>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">CTRL B</span>
                    </div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="rounded-xl p-3 cursor-pointer hover:bg-red-500/10 transition-colors duration-200 text-red-600 focus:text-red-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/20">
                      <LogOut className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Se déconnecter</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
