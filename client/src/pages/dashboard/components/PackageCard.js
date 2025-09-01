import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getStatusBadge } from '@/utils/statusUtils';
import { formatTimestamp } from '@/utils/dateUtils';
export default function PackageCard({ pkg }) {
    const badge = getStatusBadge(pkg.status);
    return (_jsxs("div", { className: "rounded-lg p-4 mb-4 border shadow-sm transition-shadow hover:shadow-md", style: {
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--card-foreground)',
        }, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-semibold", style: { color: 'var(--foreground)' }, children: "Package ID:" }), _jsx("span", { className: "text-sm font-medium break-all text-right", children: pkg.package_id })] }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-semibold", style: { color: 'var(--foreground)' }, children: "Order Ref:" }), _jsx("span", { className: "text-sm font-medium break-all text-right", children: pkg.order_ref })] }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-semibold", style: { color: 'var(--foreground)' }, children: "Driver:" }), _jsx("span", { className: "text-sm font-medium break-all text-right", children: pkg.driver })] }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-semibold", style: { color: 'var(--foreground)' }, children: "Status:" }), _jsxs("span", { className: `inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs sm:text-sm`, style: {
                            backgroundColor: badge.color || 'var(--muted)',
                        }, children: [badge.icon, pkg.status.replace('_', ' ')] })] }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-semibold", style: { color: 'var(--foreground)' }, children: "Created By:" }), _jsx("span", { className: "text-sm font-medium text-right", children: pkg.created_by })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-semibold", style: { color: 'var(--foreground)' }, children: "Created At:" }), _jsx("span", { className: "text-sm font-medium text-right", children: formatTimestamp(pkg.created_at) })] })] }));
}
