import { Dashboard } from "@/components/dashboard/dashboard"
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute"

export default function DashboardPage() {
  return   <ProtectedRoute>
 
  <Dashboard />
 
</ProtectedRoute>
}
