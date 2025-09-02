import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { loginApi } from '@/api/auth'
import { Flash } from '@/components/Flash'

const images = ['/images/warehouse.jpg', '/images/warehouse-2.jpg', '/images/warehouse-3.jpg']

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [currentImage, setCurrentImage] = useState(0)
    const [flash, setFlash] = useState<{ type: "success" | "error"; message: string } | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const handleLogin = async () => {
        if (!username || !password) return

        try {
            const res = await loginApi(username, password)
            if (!res.data) throw new Error(res.message)

            login(res.data.username)
            setFlash({
                type: "success",
                message: res.message || "Login successful",
            })

            setTimeout(() => {
                navigate("/dashboard", { replace: true })
            }, 1000)
        } catch (error: any) {
            console.error("Login error:", error)
            setFlash({
                type: "error",
                message: error.message || "Login failed",
            })
        } finally {
            setTimeout(() => setFlash(null), 3000)
        }
    }

    if (isAuthenticated) return <Navigate to="/dashboard" replace />

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
            .split(' ')
            .map(word => word.toUpperCase())
            .join(' ')
        setUsername(value)
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {flash && (
                <div className="fixed top-4 right-4 z-50 w-full max-w-sm px-4">
                    <Flash
                        type={flash.type}
                        title={flash.type === "success" ? "Success" : "Error"}
                        message={flash.message}
                    />
                </div>
            )}

            <div className="flex-[1] flex flex-col justify-center p-6 sm:p-12 md:flex-[0.4] bg-[var(--background)]">
                <div className="w-full max-w-md p-6 sm:p-8 rounded-xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-[var(--foreground)]">
                        Package Queue
                    </h1>
                    <p className="text-sm sm:text-base mb-6 text-[var(--muted-foreground)]">
                        Welcome! Please login to continue.
                    </p>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 text-[var(--foreground)]">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter username"
                            autoComplete="off"
                            className="w-full px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                            style={{
                                backgroundColor: 'var(--input)',
                                color: 'var(--foreground)',
                                border: '1px solid var(--border)',
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1 text-[var(--foreground)]">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter password"
                            autoComplete="new-password"
                            className="w-full px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                            style={{
                                backgroundColor: 'var(--input)',
                                color: 'var(--foreground)',
                                border: '1px solid var(--border)',
                            }}
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={!username || !password}
                        className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-lg transition-colors cursor-pointer ${!username || !password ? 'bg-gray-400 cursor-not-allowed' : 'hover:brightness-90'}`}
                        style={{
                            backgroundColor: !username || !password ? '#9ca3af' : 'var(--primary)',
                            color: 'var(--primary-foreground)',
                        }}
                    >
                        Login
                    </button>

                    <p className="text-xs mt-6 text-[var(--muted-foreground)] text-center sm:text-sm">
                        by Savero Pakavi Z. © 2025
                    </p>
                </div>
            </div>

            <div
                className="hidden md:flex flex-1 relative items-center justify-center"
                style={{
                    backgroundImage: `url("${images[currentImage]}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute bottom-6 flex space-x-2 z-10">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${currentImage === index ? 'bg-white' : 'bg-white/50'}`}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    )
}
