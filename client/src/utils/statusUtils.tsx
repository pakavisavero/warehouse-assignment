import {
    AiOutlineClockCircle,
    AiOutlineCheckCircle,
    AiOutlineGift,
    AiOutlineCloseCircle,
} from 'react-icons/ai';
import type { ReactNode } from 'react';

export const getStatusBadge = (status: string): { color: string; icon: ReactNode | null } => {
    switch (status.toUpperCase()) {
        case 'WAITING':
            return { color: 'text-yellow-800 bg-yellow-100', icon: <AiOutlineClockCircle className="inline mr-1" /> };
        case 'PICKED':
            return { color: 'text-blue-800 bg-blue-100', icon: <AiOutlineCheckCircle className="inline mr-1" /> };
        case 'HANDED OVER':
            return { color: 'text-green-800 bg-green-100', icon: <AiOutlineGift className="inline mr-1" /> };
        case 'EXPIRED':
            return { color: 'text-red-800 bg-red-100', icon: <AiOutlineCloseCircle className="inline mr-1" /> };
        default:
            return { color: 'text-gray-700 bg-gray-100', icon: null };
    }
};
