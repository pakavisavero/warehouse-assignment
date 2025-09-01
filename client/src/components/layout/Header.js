import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AiOutlineMenu } from 'react-icons/ai';
export default function Header({ sidebarOpen, setSidebarOpen }) {
    return (_jsxs("div", { className: "md:hidden flex justify-between items-center w-full mb-2", children: [_jsx("h4", { className: "text-2xl font-extrabold text-gray-800", children: "Package Dashboard" }), _jsx("button", { onClick: () => setSidebarOpen(true), children: _jsx(AiOutlineMenu, { className: "text-3xl" }) })] }));
}
