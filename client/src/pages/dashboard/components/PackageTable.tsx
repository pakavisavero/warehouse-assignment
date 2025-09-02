import { useState } from 'react'
import { PencilIcon } from 'lucide-react'
import { getStatusBadge } from '@/utils/statusUtils'
import { formatTimestamp } from '@/utils/dateUtils'

import type { Package } from '@/types/Package'
import PackageStatusModal from '@/pages/dashboard/components/modal/PackageStatusModal'

interface PackageTableProps {
    packages: Package[]
    handleUpdateStatus: (id: string, status: string) => void
}

const PackageRow = ({
    pkg,
    handleUpdateStatus,
}: {
    pkg: Package
    handleUpdateStatus: (id: string, status: string) => void
}) => {
    const badge = getStatusBadge(pkg.status)
    const [isOpen, setIsOpen] = useState(false)
    const isExpired = pkg.status.toUpperCase() === 'EXPIRED'

    return (
        <>
            <tr className="transition-all hover:bg-[var(--muted)] bg-[var(--card)]">
                <td className="px-4 py-2">{pkg.package_id}</td>
                <td className="px-4 py-2">{pkg.order_ref}</td>
                <td className="px-4 py-2">{pkg.driver}</td>
                <td className="px-4 py-2">
                    <span
                        className="inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs sm:text-sm"
                        style={{ backgroundColor: badge.color || 'var(--muted)' }}
                    >
                        {badge.icon} {pkg.status.replace('_', ' ')}
                    </span>
                </td>
                <td className="px-4 py-2">{pkg.created_by}</td>
                <td className="px-4 py-2">{formatTimestamp(pkg.created_at)}</td>
                <td className="px-4 py-2">
                    {isExpired ? (
                        <span className="inline-block px-3 py-1 rounded-md text-sm font-medium bg-red-100 text-red-700">
                            Already Expired
                        </span>
                    ) : pkg.status === 'HANDED_OVER' ? (
                        <span className="inline-block px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-700">
                            Completed
                        </span>
                    ) : (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex items-center gap-1 px-3 py-1 rounded-md font-medium text-sm transition-all duration-200 border border-gray-500 text-gray-700 hover:bg-gray-100 hover:shadow-md cursor-pointer"
                        >
                            <PencilIcon className="w-4 h-4" /> Update
                        </button>
                    )}
                </td>
            </tr>

            <PackageStatusModal
                pkg={pkg}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSave={handleUpdateStatus}
            />
        </>
    )
}

export default function PackageTable({ packages, handleUpdateStatus }: PackageTableProps) {
    const columns = ['Package ID', 'Order Ref', 'Driver', 'Status', 'Created By', 'Created At', 'Action']

    return (
        <div className="w-full mb-6">
            <div className="hidden md:block overflow-x-auto rounded-lg shadow">
                <table className="min-w-[700px] w-full table-auto border-collapse">
                    <thead className="bg-[var(--muted)]">
                        <tr className="sticky top-0 z-10">
                            {columns.map(head => (
                                <th
                                    key={head}
                                    className="text-left font-semibold text-sm sm:text-base px-4 py-2 border-b"
                                    style={{ color: 'var(--muted-foreground)' }}
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {packages.length > 0 ? (
                            packages.map(pkg => (
                                <PackageRow key={pkg.id} pkg={pkg} handleUpdateStatus={handleUpdateStatus} />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center py-8 text-sm sm:text-base"
                                    style={{ color: 'var(--muted-foreground)' }}
                                >
                                    No packages found for this status.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
