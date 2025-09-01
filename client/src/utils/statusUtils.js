import { jsx as _jsx } from "react/jsx-runtime";
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineGift, AiOutlineCloseCircle, } from 'react-icons/ai';
export const getStatusBadge = (status) => {
    switch (status.toUpperCase()) {
        case 'ALL':
            return {
                color: 'text-purple-900 bg-purple-200',
                icon: _jsx(AiOutlineGift, { className: "inline mr-1" })
            };
        case 'WAITING':
            return { color: 'text-yellow-900 bg-yellow-200', icon: _jsx(AiOutlineClockCircle, { className: "inline mr-1" }) };
        case 'PICKED':
            return { color: 'text-blue-900 bg-blue-200', icon: _jsx(AiOutlineCheckCircle, { className: "inline mr-1" }) };
        case 'HANDED_OVER':
            return { color: 'text-green-900 bg-green-200', icon: _jsx(AiOutlineGift, { className: "inline mr-1" }) };
        case 'EXPIRED':
            return { color: 'text-red-900 bg-red-200', icon: _jsx(AiOutlineCloseCircle, { className: "inline mr-1" }) };
        default:
            return { color: 'text-gray-800 bg-gray-200', icon: null };
    }
};
