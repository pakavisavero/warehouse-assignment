import { getStatusBadge } from '@/utils/statusUtils';
import { formatTimestamp } from '@/utils/dateUtils';

import type { Package } from '@/types/Package'

interface PackageCardProps {
    pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Package ID:</span>
                <span className="text-sm font-medium break-all text-right">{pkg.package_id}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Order Ref:</span>
                <span className="text-sm font-medium break-all text-right">{pkg.order_ref}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Driver:</span>
                <span className="text-sm font-medium break-all text-right">{pkg.driver}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs sm:text-sm ${getStatusBadge(pkg.status).color}`}>
                    {getStatusBadge(pkg.status).icon}
                    {pkg.status}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Created By:</span>
                <span className="text-sm font-medium text-right">{pkg.created_by}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Created At:</span>
                <span className="text-sm font-medium text-right">{formatTimestamp(pkg.created_at)}</span>
            </div>
        </div>
    );
}