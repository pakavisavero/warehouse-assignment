import { getStatusBadge } from '@/utils/statusUtils';
import { statusList } from '@/constants/status';

interface StatusFilterProps {
    selectedStatus: string
    setSelectedStatus: (status: string) => void
}

export default function StatusFilter({ selectedStatus, setSelectedStatus }: StatusFilterProps) {
    return (
        <div className="flex flex-wrap gap-1 justify-center md:justify-start mb-6">
            {statusList.map(status => {
                const badge = getStatusBadge(status)
                const isActive = selectedStatus.toUpperCase() === status.toUpperCase()

                return (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`
                            flex items-center gap-1 px-4 py-2 rounded-md font-semibold text-sm sm:text-base transition-all duration-300
                            ${isActive ? `${badge.color} shadow-md` : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:cursor-pointer'}
                        `}
                    >
                        {isActive && badge.icon}
                        {status.replace('_', ' ')}
                    </button>
                )
            })}
        </div>
    )
}
