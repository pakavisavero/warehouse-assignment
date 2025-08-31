import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { LogOut } from 'lucide-react'

export default function Topbar() {
    const { username, logout } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const displayName = (username || 'User')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div
            className="w-full flex justify-end items-center px-6"
            style={{
                backgroundColor: 'var(--card)',
                color: 'var(--foreground)',
                borderBottom: '1px solid var(--border)',
            }}
        >
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="flex items-center space-x-3 px-4 pt-2 rounded-lg transition-colors"
                    style={{
                        backgroundColor: 'var(--card)',
                        color: 'var(--foreground)',
                    }}
                >
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                    >
                        {displayName[0]}
                    </div>
                    <span className="font-semibold">{displayName}</span>
                    <svg
                        className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div
                        className="absolute right-0 mt-1 w-44 rounded-lg py-2 z-50 transition-all"
                        style={{
                            backgroundColor: 'var(--card)',
                            boxShadow: 'var(--shadow-md)',
                            border: '1px solid var(--border)',
                        }}
                    >
                        <button
                            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] transition-colors text-red-600"
                            onClick={logout}
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
