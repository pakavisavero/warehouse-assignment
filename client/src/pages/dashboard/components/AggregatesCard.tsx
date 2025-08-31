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

// Map statuses to your CSS variable colors
const aggregateData: Record<string, { bgColor: string; iconBgColor: string; textColor: string; icon: JSX.Element }> = {
    TOTAL: {
        bgColor: 'var(--chart-1)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: <AiOutlineAppstore className="text-5xl text-white" />
    },
    WAITING: {
        bgColor: 'var(--chart-2)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: <AiOutlineClockCircle className="text-5xl text-white" />
    },
    PICKED: {
        bgColor: 'var(--chart-3)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: <AiOutlineCheckCircle className="text-5xl text-white" />
    },
    HANDED_OVER: {
        bgColor: 'var(--chart-4)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: <AiOutlineGift className="text-5xl text-white" />
    },
    EXPIRED: {
        bgColor: 'var(--chart-5)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: <AiOutlineCloseCircle className="text-5xl text-white" />
    },
}

export default function AggregatesCard({ aggregates }: AggregatesCardProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 w-full mt-6 mb-10">
            {Object.entries(aggregates).map(([key, value]) => {
                const data = aggregateData[key] || {
                    bgColor: 'var(--muted)',
                    iconBgColor: 'rgba(255,255,255,0.2)',
                    textColor: 'var(--muted-foreground)',
                    icon: null,
                }

                return (
                    <div
                        key={key}
                        className="rounded-md shadow-lg p-6 flex items-center gap-4 transition-transform transform hover:scale-105 hover:shadow-2xl"
                        style={{ backgroundColor: data.bgColor }}
                    >
                        <div
                            className="flex items-center justify-center w-16 h-16 rounded-full"
                            style={{ backgroundColor: data.iconBgColor }}
                        >
                            {data.icon}
                        </div>

                        <div className="flex flex-col justify-center">
                            <span
                                className="text-sm sm:text-base md:text-lg font-semibold"
                                style={{ color: data.textColor }}
                            >
                                {key.replace('_', ' ')}
                            </span>
                            <span
                                className="text-lg sm:text-xl md:text-2xl font-bold mt-1"
                                style={{ color: data.textColor }}
                            >
                                {value}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
