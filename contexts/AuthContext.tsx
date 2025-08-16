"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: Error | null
  role: string | null
  name: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  role: null,
  name: null,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser)
          // For now, set default role and name to avoid API dependency issues
          setRole("user")
          setName(firebaseUser.displayName || firebaseUser.email || "User")
        } else {
          setUser(null)
          setRole(null)
          setName(null)
        }
        setLoading(false)
      },
      (error) => {
        setError(error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, loading, error, role, name }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
