"use client"

import { useAuth } from "../../contexts/AuthContext" // Use the AuthContext you created
import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"
import { useLoading } from "../../contexts/LoadingContext"

interface ProtectedRouteProps {
  children: ReactNode // Explicitly typed as ReactNode
  requiredRole?: string // Optional prop to check for specific roles if needed
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading, role } = useAuth() // Destructure user, loading, and role from the context
  const router = useRouter()
  const { startLoading, stopLoading } = useLoading()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        startLoading()
        // Redirect to signin page if no user is authenticated
        router.push("/auth")
      } else if (requiredRole && role !== requiredRole) {
        startLoading()
        // Redirect if user does not have the required role
        router.push("/unauthorized")
      } else {
        stopLoading()
      }
    }
  }, [user, loading, role, requiredRole, router, startLoading, stopLoading])

  // Return children only if user is authenticated and has the required role (if any)
  return <>{children}</>
}
