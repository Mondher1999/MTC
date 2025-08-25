"use client"

import { useAuth } from "../../contexts/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, type ReactNode } from "react"
import { useLoading } from "../../contexts/LoadingContext"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: string
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { startLoading, stopLoading } = useLoading()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        startLoading()
        router.push("/auth")
      } 
      // 🔒 Role check
      else if (requiredRole && user?.role !== requiredRole) {
        startLoading()
        router.push("/unauthorized")
      } 
      // 🔒 Student validation flow
      else if (user?.role?.toLowerCase() === "etudiant") {
        if (!user.formValidated && pathname !== "/registration") {
          startLoading()
          router.push("/registration")
        } 
        else if (user.formValidated && !user.accessValidated && pathname !== "/confirmation") {
          startLoading()
          router.push("/confirmation")
        } 
        else {
          stopLoading()
        }
      } 
      else {
        stopLoading()
      }
    }
  }, [
    user,
    loading,
    user?.role,
    user?.formValidated,
    user?.accessValidated,
    requiredRole,
    pathname,
    router,
    startLoading,
    stopLoading,
  ])

  return <>{children}</>
}
