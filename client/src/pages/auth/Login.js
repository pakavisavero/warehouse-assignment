import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { loginApi } from '@/api/auth';
import { Flash } from '@/components/Flash';
const images = ['/images/warehouse.jpg', '/images/warehouse-2.jpg', '/images/warehouse-3.jpg'];
export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentImage, setCurrentImage] = useState(0);
    const [flash, setFlash] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const handleLogin = async () => {
        if (!username || !password)
            return;
        try {
            const res = await loginApi(username, password);
            if (!res.data)
                throw new Error(res.message);
            login(res.data.username);
            setFlash({
                type: "success",
                message: res.message || "Login successful",
            });
            setTimeout(() => {
                navigate("/dashboard", { replace: true });
            }, 1000);
        }
        catch (error) {
            console.error("Login error:", error);
            setFlash({
                type: "error",
                message: error.message || "Login failed",
            });
        }
        finally {
            setTimeout(() => setFlash(null), 3000);
        }
    };
    if (isAuthenticated)
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    const handleUsernameChange = (e) => {
        const value = e.target.value
            .split(' ')
            .map(word => word.toUpperCase())
            .join(' ');
        setUsername(value);
    };
    return (_jsxs("div", { className: "flex min-h-screen", children: [flash && (_jsx("div", { className: "fixed top-4 right-4 z-50 w-full max-w-sm", children: _jsx(Flash, { type: flash.type, title: flash.type === "success" ? "Success" : "Error", message: flash.message }) })), _jsx("div", { className: "flex-[0.4] flex flex-col justify-center p-12 relative", style: { backgroundColor: 'var(--background)' }, children: _jsxs("div", { className: "w-full max-w-md p-8 rounded-xl relative", children: [_jsx("h1", { className: "text-3xl font-extrabold mb-2", style: { color: 'var(--foreground)' }, children: "Package Queue" }), _jsx("p", { className: "text-sm mb-6 text-[var(--muted-foreground)]", children: "Welcome! Please login to continue." }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium mb-1", style: { color: 'var(--foreground)' }, children: "Username" }), _jsx("input", { type: "text", value: username, onChange: handleUsernameChange, placeholder: "Enter username", autoComplete: "off", className: "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]", style: {
                                        backgroundColor: 'var(--input)',
                                        color: 'var(--foreground)',
                                        border: '1px solid var(--border)',
                                    } })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-medium mb-1", style: { color: 'var(--foreground)' }, children: "Password" }), _jsx("input", { type: "password", value: password, onChange: e => setPassword(e.target.value), placeholder: "Enter password", autoComplete: "new-password", className: "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]", style: {
                                        backgroundColor: 'var(--input)',
                                        color: 'var(--foreground)',
                                        border: '1px solid var(--border)',
                                    } })] }), _jsx("button", { onClick: handleLogin, disabled: !username || !password, className: `w-full py-2 rounded-lg font-semibold text-lg transition-colors cursor-pointer ${!username || !password ? 'bg-gray-400 cursor-not-allowed' : 'hover:brightness-90'}`, style: {
                                backgroundColor: !username || !password ? '#9ca3af' : 'var(--primary)',
                                color: 'var(--primary-foreground)',
                            }, children: "Login" }), _jsx("p", { className: "text-xs mt-6 text-[var(--muted-foreground)] text-center", children: "by Savero Pakavi Z. \u00A9 2025" })] }) }), _jsxs("div", { className: "flex-1 hidden md:flex relative items-center justify-center", style: {
                    backgroundImage: `url("${images[currentImage]}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }, children: [_jsx("div", { className: "absolute inset-0 bg-black/30" }), _jsx("div", { className: "absolute bottom-6 flex space-x-2 z-10", children: images.map((_, index) => (_jsx("span", { onClick: () => setCurrentImage(index), className: `w-3 h-3 rounded-full transition-colors cursor-pointer ${currentImage === index ? 'bg-white' : 'bg-white/50'}` }, index))) })] })] }));
}
