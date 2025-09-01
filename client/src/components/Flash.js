import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon, InfoIcon, AlertTriangleIcon } from "lucide-react";
const icons = {
    success: _jsx(CheckCircle2Icon, { className: "h-5 w-5 text-[var(--success)]" }),
    error: _jsx(AlertCircleIcon, { className: "h-5 w-5 text-[var(--destructive)]" }),
    info: _jsx(InfoIcon, { className: "h-5 w-5 text-[var(--info)]" }),
    warning: _jsx(AlertTriangleIcon, { className: "h-5 w-5 text-[var(--warning)]" }),
};
const backgroundColors = {
    success: "bg-[color:var(--success-bg)] border-[color:var(--success)]",
    error: "bg-[color:var(--destructive-bg)] border-[color:var(--destructive)]",
    info: "bg-[color:var(--info-bg)] border-[color:var(--info)]",
    warning: "bg-[color:var(--warning-bg)] border-[color:var(--warning)]",
};
export function Flash({ type, title, message }) {
    return (_jsxs(Alert, { variant: type === "error" ? "destructive" : "default", className: `border rounded-lg shadow-md flex items-start gap-3 py-3 ${backgroundColors[type]}`, style: {
            color: "var(--card-foreground)",
        }, children: [_jsx("div", { className: "flex-shrink-0 mt-1", children: icons[type] }), _jsxs("div", { className: "flex flex-col", children: [title && (_jsx(AlertTitle, { className: "font-semibold", children: title })), _jsx(AlertDescription, { className: "text-sm", children: message })] })] }));
}
