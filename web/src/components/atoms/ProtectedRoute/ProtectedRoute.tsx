import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const status = useAuthStore((s) => s.status)

  if (status === 'unauthenticated' || status === 'idle') {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
