import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const images = ['/images/warehouse.jpg', '/images/warehouse-2.jpg', '/images/warehouse-3.jpg']

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const handleLogin = () => {
        if (!username || !password) return
        login(username)
        navigate('/dashboard', { replace: true })
    }

    if (isAuthenticated) return <Navigate to="/dashboard" replace />

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
            .split(' ')
            .map(word => word.toUpperCase()) // auto capitalize all letters
            .join(' ')
        setUsername(value)
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex-[0.4] flex flex-col justify-center p-12 relative" style={{ backgroundColor: 'var(--background)' }}>
                <div className="w-full max-w-md p-8 rounded-xl relative">
                    <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--foreground)' }}>
                        Package Queue
                    </h1>
                    <p className="text-sm mb-6 text-[var(--muted-foreground)]">
                        Welcome! Please login to continue.
                    </p>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter username"
                            autoComplete="off"
                            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            style={{
                                backgroundColor: 'var(--input)',
                                color: 'var(--foreground)',
                                border: '1px solid var(--border)',
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter password"
                            autoComplete="new-password"
                            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
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
                        className={`w-full py-2 rounded-lg font-semibold text-lg transition-colors cursor-pointer ${!username || !password ? 'bg-gray-400 cursor-not-allowed' : 'hover:brightness-90'
                            }`}
                        style={{
                            backgroundColor: !username || !password ? '#9ca3af' : 'var(--primary)',
                            color: 'var(--primary-foreground)',
                        }}
                    >
                        Login
                    </button>

                    <p className="text-xs mt-6 text-[var(--muted-foreground)] text-center">
                        by Savero Pakavi Z. © 2025
                    </p>
                </div>
            </div>

            <div
                className="flex-1 hidden md:flex relative items-center justify-center"
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
                            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${currentImage === index ? 'bg-white' : 'bg-white/50'
                                }`}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    )
}
