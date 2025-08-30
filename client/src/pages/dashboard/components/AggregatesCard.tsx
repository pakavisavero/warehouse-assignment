import type { JSX } from 'react'
import {
    AiOutlineClockCircle,
    AiOutlineCheckCircle,
    AiOutlineGift,
    AiOutlineCloseCircle,
    AiOutlineAppstore
} from 'react-icons/ai'

import type { Aggregates } from '@/types/Aggregates'

interface AggregatesCardProps {
    aggregates: Aggregates
}

const aggregateData: Record<string, { color: string; icon: JSX.Element }> = {
    TOTAL: {
        color: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white',
        icon: <AiOutlineAppstore className="text-5xl text-gray-600" />
    },
    WAITING: {
        color: 'bg-gradient-to-r from-amber-400 to-amber-500 text-white',
        icon: <AiOutlineClockCircle className="text-5xl text-amber-400" />
    },
    PICKED: {
        color: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
        icon: <AiOutlineCheckCircle className="text-5xl text-blue-400" />
    },
    HANDED_OVER: {
        color: 'bg-gradient-to-r from-green-400 to-green-500 text-white',
        icon: <AiOutlineGift className="text-5xl text-green-400" />
    },
    EXPIRED: {
        color: 'bg-gradient-to-r from-rose-400 to-rose-500 text-white',
        icon: <AiOutlineCloseCircle className="text-5xl text-rose-400" />
    },
}

export default function AggregatesCard({ aggregates }: AggregatesCardProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 w-full mt-6 mb-10">
            {Object.entries(aggregates).map(([key, value]) => {
                const data = aggregateData[key] || { color: 'bg-gray-300 text-gray-900', icon: null }

                return (
                    <div
                        key={key}
                        className={`${data.color} rounded-md shadow-lg p-6 flex items-center gap-4 transition-transform transform hover:scale-105 hover:shadow-2xl`}
                    >
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20">
                            {data.icon}
                        </div>

                        <div className="flex flex-col justify-center">
                            <span className="text-sm sm:text-base md:text-lg font-semibold">
                                {key.replace('_', ' ')}
                            </span>
                            <span className="text-lg sm:text-xl md:text-2xl font-bold mt-1">
                                {value}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
