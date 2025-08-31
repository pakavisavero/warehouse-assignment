import {
    AiOutlineClockCircle,
    AiOutlineCheckCircle,
    AiOutlineGift,
    AiOutlineCloseCircle,
} from 'react-icons/ai';
import type { ReactNode } from 'react';

export const getStatusBadge = (status: string): { color: string; icon: ReactNode | null } => {
    switch (status.toUpperCase()) {
        case 'ALL':
            return {
                color: 'text-purple-900 bg-purple-200',
                icon: <AiOutlineGift className="inline mr-1" />
            };
        case 'WAITING':
            return { color: 'text-yellow-900 bg-yellow-200', icon: <AiOutlineClockCircle className="inline mr-1" /> };
        case 'PICKED':
            return { color: 'text-blue-900 bg-blue-200', icon: <AiOutlineCheckCircle className="inline mr-1" /> };
        case 'HANDED_OVER':
            return { color: 'text-green-900 bg-green-200', icon: <AiOutlineGift className="inline mr-1" /> };
        case 'EXPIRED':
            return { color: 'text-red-900 bg-red-200', icon: <AiOutlineCloseCircle className="inline mr-1" /> };
        default:
            return { color: 'text-gray-800 bg-gray-200', icon: null };
    }
};
