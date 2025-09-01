import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getStatusBadge } from '@/utils/statusUtils';
import { statusList } from '@/constants/status';
export default function StatusFilter({ selectedStatus, setSelectedStatus }) {
    return (_jsx("div", { className: "flex flex-wrap gap-2 justify-center md:justify-start mb-6", children: statusList.map(status => {
            const badge = getStatusBadge(status);
            const isActive = selectedStatus.toUpperCase() === status.toUpperCase();
            return (_jsxs("button", { onClick: () => setSelectedStatus(status), className: `
              flex items-center gap-1 px-3 py-1 rounded-lg font-medium text-sm transition-all duration-200
              ${isActive ? `${badge.color} shadow-sm` : 'border border-gray-300 hover:shadow-sm hover:scale-105'}
            `, style: {
                    backgroundColor: isActive ? undefined : 'var(--card)',
                    color: isActive ? undefined : 'var(--card-foreground)',
                }, children: [isActive && badge.icon, _jsx("span", { className: "truncate", children: status.replace('_', ' ') })] }, status));
        }) }));
}
