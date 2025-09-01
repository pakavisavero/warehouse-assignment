import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import StatusFilter from '@/pages/dashboard/components/StatusFilter';
import PackageTable from '@/pages/dashboard/components/PackageTable';
import AggregatesCard from '@/pages/dashboard/components/AggregatesCard';
import PaginationControl from '@/pages/dashboard/components/PaginationControl';
import { usePackages } from '@/hooks/usePackages';
import { createPackage, updatePackageStatus } from '@/api/packages';
import { Flash } from '@/components/Flash';
export default function Dashboard() {
    const location = useLocation();
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [flash, setFlash] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const statusParam = searchParams.get('status') || 'ALL';
    const pageParam = searchParams.get('page') || '1';
    const limitParam = searchParams.get('limit') || '5';
    const [selectedStatus, setSelectedStatus] = useState(statusParam);
    // Sync query params only if we are on /dashboard
    useEffect(() => {
        if (location.pathname !== '/dashboard')
            return;
        setCurrentPage(Number(pageParam));
        setItemsPerPage(Number(limitParam));
        setSelectedStatus(statusParam);
    }, [location.pathname, pageParam, limitParam, statusParam]);
    useEffect(() => {
        if (location.pathname !== '/dashboard')
            return;
        const params = {
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
        };
        if (selectedStatus !== 'ALL')
            params.status = selectedStatus;
        setSearchParams(params);
    }, [selectedStatus, currentPage, itemsPerPage, setSearchParams, location.pathname]);
    const { packages, aggregates, loading, totalPages } = usePackages({
        selectedStatus,
        currentPage,
        itemsPerPage,
    });
    const handleCreatePackage = async (data) => {
        try {
            await createPackage(data);
            setFlash({ type: 'success', message: 'Package created successfully!' });
        }
        catch (err) {
            setFlash({ type: 'error', message: err.message || 'Failed to create package.' });
        }
        finally {
            setTimeout(() => setFlash(null), 3000);
        }
    };
    const handleUpdateStatus = async (id, status) => {
        try {
            const data = await updatePackageStatus(id, status);
            setFlash({
                type: 'success',
                message: data.message || `Package status updated to ${status}`,
            });
        }
        catch (err) {
            console.error('Caught error:', err);
            setFlash({
                type: 'error',
                message: err?.message || 'Failed to update status.',
            });
        }
        finally {
            setTimeout(() => setFlash(null), 3000);
        }
    };
    return (_jsxs(_Fragment, { children: [flash && (_jsx("div", { className: "fixed top-4 right-4 z-50 w-full max-w-sm", children: _jsx(Flash, { type: flash.type, title: flash.type === 'success' ? 'Success' : 'Error', message: flash.message }) })), _jsxs("div", { className: "min-h-screen flex", style: { backgroundColor: 'var(--background)', color: 'var(--foreground)' }, children: [_jsx(Sidebar, { activeMenu: activeMenu, setActiveMenu: setActiveMenu, sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Topbar, {}), _jsxs("main", { className: "flex-1 p-4 sm:p-6 md:p-8 flex flex-col transition-all", children: [_jsx("h4", { className: "hidden md:block text-3xl font-extrabold mb-5", style: { color: 'var(--foreground)' }, children: "Package Dashboard" }), _jsxs("div", { className: "w-full max-w-8xl", children: [aggregates && _jsx(AggregatesCard, { aggregates: aggregates }), _jsx("hr", { className: "my-6 border-t-1", style: { borderColor: 'var(--border)' } }), _jsx(StatusFilter, { selectedStatus: selectedStatus, setSelectedStatus: setSelectedStatus }), loading ? (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("p", { className: "text-lg font-medium animate-pulse", style: { color: 'var(--muted-foreground)' }, children: "Loading packages..." }) })) : (_jsxs(_Fragment, { children: [_jsx(PackageTable, { packages: packages, handleUpdateStatus: handleUpdateStatus, handleCreatePackage: handleCreatePackage }), _jsx(PaginationControl, { totalPages: totalPages, currentPage: currentPage, setCurrentPage: setCurrentPage })] }))] }), _jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("label", { htmlFor: "itemsPerPage", className: "text-sm font-medium", style: { color: 'var(--foreground)' }, children: "Show:" }), _jsx("select", { id: "itemsPerPage", className: "rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 transition-colors", style: {
                                                    backgroundColor: 'var(--card)',
                                                    color: 'var(--card-foreground)',
                                                    borderColor: 'var(--border)',
                                                }, value: itemsPerPage, onChange: e => {
                                                    setItemsPerPage(Number(e.target.value));
                                                    setCurrentPage(1);
                                                }, children: [5, 20, 50, 100].map(n => (_jsx("option", { value: n, children: n }, n))) })] })] })] })] })] }));
}
