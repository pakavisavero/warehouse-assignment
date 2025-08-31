import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'

import LoginPage from '@/pages/auth/Login'
import Dashboard from '@/pages/dashboard/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}
