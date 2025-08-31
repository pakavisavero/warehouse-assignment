import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    username: string
    loading: boolean
    login: (username: string) => void
    logout: () => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('Authorization')
        const storedUsername = localStorage.getItem('username')
        if (token && storedUsername) {
            setIsAuthenticated(true)
            setUsername(storedUsername)
        }
        setLoading(false)
    }, [])

    const login = (name: string) => {
        setUsername(name)
        setIsAuthenticated(true)
        localStorage.setItem('Authorization', 'token123')
        localStorage.setItem('username', name)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUsername('')
        localStorage.removeItem('Authorization')
        localStorage.removeItem('username')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}