import React from 'react'
import PackageCard from '@/pages/dashboard/components/PackageCard'

import { getStatusBadge } from '@/utils/statusUtils';
import { formatTimestamp } from '@/utils/dateUtils';

import type { Package } from '@/types/Package'

interface PackageTableProps {
    packages: Package[]
}

const PackageRow = React.memo(({ pkg }: { pkg: Package }) => {
    const badge = getStatusBadge(pkg.status)
    return (
        <tr className="transition-all hover:bg-gray-50 bg-white">
            <td className="text-center text-xs sm:text-sm md:text-base px-4 py-2 whitespace-nowrap">{pkg.package_id}</td>
            <td className="text-center text-xs sm:text-sm md:text-base px-4 py-2 whitespace-nowrap">{pkg.order_ref}</td>
            <td className="text-center text-xs sm:text-sm md:text-base px-4 py-2 whitespace-nowrap">{pkg.driver}</td>
            <td className="text-center text-xs sm:text-sm md:text-base px-4 py-2 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs sm:text-sm ${badge.color}`}>
                    {badge.icon}
                    {pkg.status}
                </span>
            </td>
            <td className="text-center text-xs sm:text-sm md:text-base px-4 py-2 whitespace-nowrap">{pkg.created_by}</td>
            <td className="text-center text-xs sm:text-sm md:text-base px-4 py-2 whitespace-nowrap">{formatTimestamp(pkg.created_at)}</td>
        </tr>
    )
})

export default function PackageTable({ packages }: PackageTableProps) {
    return (
        <div className="w-full mb-6">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow">
                <table className="min-w-[700px] w-full table-auto border-collapse">
                    <thead className="bg-gray-50">
                        <tr className="sticky top-0 z-10 bg-gray-50">
                            {['Package ID', 'Order Ref', 'Driver', 'Status', 'Created By', 'Created At'].map(head => (
                                <th
                                    key={head}
                                    className="text-center text-gray-600 font-semibold text-sm sm:text-base px-4 py-2 border-b border-gray-200 whitespace-nowrap"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {packages.length > 0 ? (
                            packages.map(pkg => <PackageRow key={pkg.id} pkg={pkg} />)
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-500 py-8 text-sm sm:text-base whitespace-nowrap">
                                    No packages found for this status.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
                {packages.length > 0 ? (
                    packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)
                ) : (
                    <div className="text-center text-gray-500 py-8 text-sm sm:text-base">
                        No packages found for this status.
                    </div>
                )}
            </div>
        </div>
    )
}
