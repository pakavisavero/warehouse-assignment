// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    username: string
    login: (username: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('John Doe')

    const login = (name: string) => {
        setUsername(name)
        setIsAuthenticated(true)
        localStorage.setItem('Authorization', 'token123')
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('Authorization')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
