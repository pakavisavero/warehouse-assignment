import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import LoginPage from '@/pages/auth/Login';
import Dashboard from '@/pages/dashboard/Dashboard';
import ExpiredLog from '@/pages/expired-log/ExpiredLog';
import WebSettingPage from '@/pages/web-setting/WebSetting';
import ProtectedRoute from '@/components/ProtectedRoute';
export default function App() {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/auth/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/expired-logs", element: _jsx(ProtectedRoute, { children: _jsx(ExpiredLog, {}) }) }), _jsx(Route, { path: "/web-setting", element: _jsx(ProtectedRoute, { children: _jsx(WebSettingPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }) }) }));
}
