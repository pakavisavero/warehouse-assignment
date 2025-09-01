import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        const storedUsername = localStorage.getItem('username');
        if (token && storedUsername) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        }
        setLoading(false);
    }, []);
    const login = (name) => {
        setUsername(name);
        setIsAuthenticated(true);
        localStorage.setItem('Authorization', 'token123');
        localStorage.setItem('username', name);
    };
    const logout = () => {
        setIsAuthenticated(false);
        setUsername('');
        localStorage.removeItem('Authorization');
        localStorage.removeItem('username');
    };
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, username, loading, login, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within AuthProvider');
    return context;
};
