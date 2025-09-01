import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { statusList } from '@/constants/status';
import { getStatusBadge } from '@/utils/statusUtils';
const nextStatusMap = {
    WAITING: "PICKED",
    PICKED: "HANDED_OVER",
    HANDED_OVER: "COMPLETED",
};
export default function PackageStatusModal({ pkg, isOpen, onClose, onSave }) {
    const [selectedStatus, setSelectedStatus] = useState(nextStatusMap[pkg.status] || pkg.status);
    const badge = getStatusBadge(pkg.status);
    useEffect(() => {
        if (isOpen) {
            setSelectedStatus(nextStatusMap[pkg.status] || pkg.status);
        }
    }, [isOpen, pkg.status]);
    return (_jsx(Transition, { appear: true, show: isOpen, as: Fragment, children: _jsxs(Dialog, { as: "div", className: "relative z-50", onClose: onClose, children: [_jsx(Transition.Child, { as: Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0", children: _jsx("div", { className: "fixed inset-0 bg-black/25 backdrop-blur-sm" }) }), _jsx("div", { className: "fixed inset-0 overflow-y-auto", children: _jsx("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: _jsx(Transition.Child, { as: Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: _jsxs(Dialog.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-xl bg-[var(--background)] p-6 text-left border border-[var(--border)] transition-all", children: [_jsxs("div", { className: "mb-4", children: [_jsxs(Dialog.Title, { className: "text-xl font-bold text-[var(--foreground)]", children: ["Update Package #", pkg.package_id] }), _jsx(Dialog.Description, { className: "mt-1 text-sm text-[var(--muted-foreground)] border-b border-[var(--border)] pb-3", children: "Change the status of this package below" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--foreground)] mb-2", children: "Current Status" }), _jsxs("div", { className: "inline-flex items-center gap-2", children: [_jsx("span", { className: `w-4 h-4 rounded-full ${badge.color} border border-[var(--border)]` }), _jsx("span", { className: "text-sm font-semibold text-[var(--foreground)]", children: pkg.status.replace('_', ' ') })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--foreground)] mb-2", children: "New Status" }), _jsx("select", { value: selectedStatus, onChange: e => setSelectedStatus(e.target.value), className: "w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-[var(--foreground)] transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]", children: statusList
                                                    .filter(status => !['ALL', 'EXPIRED', pkg.status].includes(status))
                                                    .map(status => (_jsx("option", { value: status, children: status.replace('_', ' ') }, status))) })] }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { type: "button", onClick: onClose, className: "rounded-xl border border-[var(--border)] px-5 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] hover:shadow-sm transition cursor-pointer", children: "Cancel" }), _jsx("button", { type: "button", onClick: () => {
                                                    onSave(pkg.id, selectedStatus);
                                                    onClose();
                                                }, className: "rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--primary-foreground)] shadow hover:brightness-90 transition cursor-pointer", children: "Update" })] })] }) }) }) })] }) }));
}
