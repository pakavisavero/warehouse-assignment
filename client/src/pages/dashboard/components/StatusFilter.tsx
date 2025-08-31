import { getStatusBadge } from '@/utils/statusUtils';
import { statusList } from '@/constants/status';

interface StatusFilterProps {
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
}

export default function StatusFilter({ selectedStatus, setSelectedStatus }: StatusFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
            {statusList.map(status => {
                const badge = getStatusBadge(status)
                const isActive = selectedStatus.toUpperCase() === status.toUpperCase()

                return (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`
              flex items-center gap-1 px-3 py-1 rounded-lg font-medium text-sm transition-all duration-200
              ${isActive ? `${badge.color} shadow-sm` : 'border border-gray-300 hover:shadow-sm hover:scale-105'}
            `}
                        style={{
                            backgroundColor: isActive ? undefined : 'var(--card)',
                            color: isActive ? undefined : 'var(--card-foreground)',
                        }}
                    >
                        {isActive && badge.icon}
                        <span className="truncate">{status.replace('_', ' ')}</span>
                    </button>
                )
            })}
        </div>
    )
}
