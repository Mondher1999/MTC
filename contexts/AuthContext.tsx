"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { fetchUserByEmail } from "@/services/Service"

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
          setUser(firebaseUser);
          try {
            // Fetch the user details from Firestore using the user ID
            if (!firebaseUser.email) {
              setError(new Error("Email not available"));
              setLoading(false);
              return;
            }
            const userData = await fetchUserByEmail(firebaseUser.email);
            

            setRole(userData.role); // Set the role based on the fetched data
            setName(userData.name); // Set the name based on the fetched data
          } catch (error) {
            console.error("Error fetching user role:", error);
            setRole(null);
          }
        } else {
          setUser(null);
          setRole(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading, error, role, name }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
