import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { Flash } from '@/components/Flash';
import { formatTimestamp } from '@/utils/dateUtils';
import { fetchPackageLogs } from '@/api/expiredLog';
export default function ExpiredLogDashboard() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [flash, setFlash] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('Expired Log');
    const loadLogs = async () => {
        setLoading(true);
        try {
            const data = await fetchPackageLogs();
            setLogs(data);
        }
        catch (err) {
            setFlash({ type: 'error', message: err.message || 'Failed to fetch package logs' });
            setLogs([]);
        }
        finally {
            setLoading(false);
            setTimeout(() => setFlash(null), 3000);
        }
    };
    useEffect(() => {
        loadLogs();
    }, []);
    return (_jsxs(_Fragment, { children: [flash && (_jsx("div", { className: "fixed top-4 right-4 z-50 w-full max-w-sm", children: _jsx(Flash, { type: flash.type, title: flash.type === 'success' ? 'Success' : 'Error', message: flash.message }) })), _jsxs("div", { className: "min-h-screen flex", style: { backgroundColor: 'var(--background)', color: 'var(--foreground)' }, children: [_jsx(Sidebar, { activeMenu: activeMenu, setActiveMenu: setActiveMenu, sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Topbar, {}), _jsxs("main", { className: "flex-1 p-4 sm:p-6 md:p-8 flex flex-col transition-all", children: [_jsx("h4", { className: "text-3xl font-extrabold mb-10", style: { color: 'var(--foreground)' }, children: "Expired Logs" }), loading ? (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("p", { className: "text-lg font-medium animate-pulse", style: { color: 'var(--muted-foreground)' }, children: "Loading expired logs..." }) })) : (_jsx("div", { className: "overflow-x-auto rounded-lg shadow", children: _jsxs("table", { className: "min-w-[700px] w-full table-auto border-collapse", children: [_jsx("thead", { className: "bg-[var(--muted)]", children: _jsx("tr", { className: "sticky top-0 z-10", children: [
                                                            'Package ID', 'Order Ref', 'Package Status',
                                                            'Changed At'
                                                        ].map(head => (_jsx("th", { className: "text-left font-semibold text-sm sm:text-base px-4 py-2 border-b", style: { color: 'var(--muted-foreground)' }, children: head }, head))) }) }), _jsx("tbody", { children: logs.length > 0 ? (logs.map(log => (_jsxs("tr", { className: "transition-all hover:bg-[var(--muted)] bg-[var(--card)]", children: [_jsx("td", { className: "px-4 py-2", children: log.package.id }), _jsx("td", { className: "px-4 py-2", children: log.package.order_ref }), _jsx("td", { className: "px-4 py-2", children: log.package.status }), _jsx("td", { className: "px-4 py-2", children: formatTimestamp(log.changed_at) })] }, log.id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 9, className: "text-center py-8 text-sm sm:text-base", style: { color: 'var(--muted-foreground)' }, children: "No package logs found." }) })) })] }) }))] })] })] })] }));
}
