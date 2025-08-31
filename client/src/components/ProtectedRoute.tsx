import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { JSX } from 'react'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, loading } = useAuth()
    const location = useLocation()

    if (loading) return null

    if (!isAuthenticated) {
        // store current location to redirect after login if needed
        return <Navigate to="/auth/login" state={{ from: location }} replace />
    }

    return children
}
