import { getStatusBadge } from '@/utils/statusUtils';
import { formatTimestamp } from '@/utils/dateUtils';

import type { Package } from '@/types/Package'

interface PackageCardProps {
    pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
    const badge = getStatusBadge(pkg.status)

    return (
        <div
            className="rounded-lg p-4 mb-4 border shadow-sm transition-shadow hover:shadow-md"
            style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--card-foreground)',
            }}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Package ID:</span>
                <span className="text-sm font-medium break-all text-right">{pkg.package_id}</span>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Order Ref:</span>
                <span className="text-sm font-medium break-all text-right">{pkg.order_ref}</span>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Driver:</span>
                <span className="text-sm font-medium break-all text-right">{pkg.driver}</span>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Status:</span>
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs sm:text-sm`}
                    style={{
                        backgroundColor: badge.color || 'var(--muted)',
                    }}
                >
                    {badge.icon}
                    {pkg.status.replace('_', ' ')}
                </span>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Created By:</span>
                <span className="text-sm font-medium text-right">{pkg.created_by}</span>
            </div>

            <div className="flex items-center justify-between">
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Created At:</span>
                <span className="text-sm font-medium text-right">{formatTimestamp(pkg.created_at)}</span>
            </div>
        </div>
    )
}
