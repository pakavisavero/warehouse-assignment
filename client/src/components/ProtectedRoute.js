import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    if (loading)
        return null;
    if (!isAuthenticated) {
        // store current location to redirect after login if needed
        return _jsx(Navigate, { to: "/auth/login", state: { from: location }, replace: true });
    }
    return children;
}
