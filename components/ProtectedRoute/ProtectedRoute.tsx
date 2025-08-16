"use client";

import { useAuth } from "../../contexts/AuthContext"; // Use the AuthContext you created
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode; // Explicitly typed as ReactNode
  requiredRole?: string; // Optional prop to check for specific roles if needed
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, loading, role } = useAuth(); // Destructure user, loading, and role from the context
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to signin page if no user is authenticated
        router.push("/auth");
      } else if (requiredRole && role !== requiredRole) {
        // Redirect if user does not have the required role
        router.push("/unauthorized");
      }
    }
  }, [user, loading, role, requiredRole, router]);

  // Return children only if user is authenticated and has the required role (if any)
  return <>{children}</>;
}
