import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
export default function CreatePackageModal({ isOpen, onClose, onCreate }) {
    const [orderRef, setOrderRef] = useState('');
    const [driver, setDriver] = useState('');
    useEffect(() => {
        if (!isOpen) {
            setOrderRef('');
            setDriver('');
        }
    }, [isOpen]);
    const handleSubmit = () => {
        if (!orderRef.trim())
            return;
        onCreate({ orderRef, driver: driver.trim() || undefined });
        onClose();
    };
    return (_jsx(Transition, { appear: true, show: isOpen, as: Fragment, children: _jsxs(Dialog, { as: "div", className: "relative z-50", onClose: onClose, children: [_jsx(Transition.Child, { as: Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0", children: _jsx("div", { className: "fixed inset-0 bg-black/25 backdrop-blur-sm" }) }), _jsx("div", { className: "fixed inset-0 overflow-y-auto", children: _jsx("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: _jsx(Transition.Child, { as: Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95", children: _jsxs(Dialog.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-xl bg-[var(--background)] py-5 px-6 text-left border border-[var(--border)] transition-all", children: [_jsx(Dialog.Title, { className: "text-xl font-bold text-[var(--foreground)] mb-4", children: "Create Package" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--foreground)] mb-1", children: "Order Reference (*)" }), _jsx("input", { type: "text", value: orderRef, onChange: e => setOrderRef(e.target.value.toUpperCase()), className: "w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--foreground)] mb-1", children: "Driver Code" }), _jsx("input", { type: "text", value: driver, onChange: e => setDriver(e.target.value.toUpperCase()), className: "w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" })] })] }), _jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [_jsx("button", { onClick: onClose, className: "rounded-md border border-[var(--border)] px-5 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] hover:shadow-sm transition cursor-pointer", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: !orderRef.trim(), className: `rounded-md px-5 py-2 text-sm font-medium shadow transition cursor-pointer ${orderRef.trim()
                                                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-90'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`, children: "Create" })] })] }) }) }) })] }) }));
}
