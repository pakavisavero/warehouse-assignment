import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineGift, AiOutlineCloseCircle, AiOutlineAppstore } from 'react-icons/ai';
// Map statuses to your CSS variable colors
const aggregateData = {
    TOTAL: {
        bgColor: 'var(--chart-1)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: _jsx(AiOutlineAppstore, { className: "text-5xl text-white" })
    },
    WAITING: {
        bgColor: 'var(--chart-2)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: _jsx(AiOutlineClockCircle, { className: "text-5xl text-white" })
    },
    PICKED: {
        bgColor: 'var(--chart-3)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: _jsx(AiOutlineCheckCircle, { className: "text-5xl text-white" })
    },
    HANDED_OVER: {
        bgColor: 'var(--chart-4)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: _jsx(AiOutlineGift, { className: "text-5xl text-white" })
    },
    EXPIRED: {
        bgColor: 'var(--chart-5)',
        iconBgColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'var(--primary-foreground)',
        icon: _jsx(AiOutlineCloseCircle, { className: "text-5xl text-white" })
    },
};
export default function AggregatesCard({ aggregates }) {
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 w-full mt-6 mb-10", children: Object.entries(aggregates).map(([key, value]) => {
            const data = aggregateData[key] || {
                bgColor: 'var(--muted)',
                iconBgColor: 'rgba(255,255,255,0.2)',
                textColor: 'var(--muted-foreground)',
                icon: null,
            };
            return (_jsxs("div", { className: "rounded-md shadow-lg p-6 flex items-center gap-4 transition-transform transform hover:scale-105 hover:shadow-2xl", style: { backgroundColor: data.bgColor }, children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-full", style: { backgroundColor: data.iconBgColor }, children: data.icon }), _jsxs("div", { className: "flex flex-col justify-center", children: [_jsx("span", { className: "text-sm sm:text-base md:text-lg font-semibold", style: { color: data.textColor }, children: key.replace('_', ' ') }), _jsx("span", { className: "text-lg sm:text-xl md:text-2xl font-bold mt-1", style: { color: data.textColor }, children: value })] })] }, key));
        }) }));
}
