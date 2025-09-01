import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { fetchWebSetting, updateWebSetting } from "@/api/webSetting";
import { Flash } from "@/components/Flash";
import { PERIODS } from "@/types/Period";
export default function WebSettingPage() {
    const [webSetting, setWebSetting] = useState(null);
    const [time, setTime] = useState("");
    const [period, setPeriod] = useState("minutes");
    const [loading, setLoading] = useState(false);
    const [flash, setFlash] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("Web Setting");
    useEffect(() => {
        setLoading(true);
        fetchWebSetting()
            .then(ws => {
            if (ws) {
                setWebSetting(ws);
                setTime(ws.time);
                if (PERIODS.includes(ws.period)) {
                    setPeriod(ws.period);
                }
            }
            else {
                setWebSetting(null);
                setTime("");
            }
        })
            .catch(err => setFlash({ type: "error", message: err.message || "Failed to fetch settings" }))
            .finally(() => setLoading(false));
    }, []);
    const handleSave = async () => {
        if (!time) {
            setFlash({ type: "error", message: "Expiry time cannot be empty" });
            setTimeout(() => setFlash(null), 3000);
            return;
        }
        try {
            const updated = await updateWebSetting(webSetting?.id || 1, time, period);
            setWebSetting(updated);
            setFlash({ type: "success", message: "Settings updated successfully!" });
        }
        catch (err) {
            setFlash({ type: "error", message: err.message || "Failed to update settings" });
        }
        finally {
            setTimeout(() => setFlash(null), 3000);
        }
    };
    return (_jsxs(_Fragment, { children: [flash && (_jsx("div", { className: "fixed top-4 right-4 z-50 w-full max-w-sm", children: _jsx(Flash, { type: flash.type, title: flash.type === "success" ? "Success" : "Error", message: flash.message }) })), _jsxs("div", { className: "min-h-screen flex", style: { backgroundColor: "var(--background)", color: "var(--foreground)" }, children: [_jsx(Sidebar, { activeMenu: activeMenu, setActiveMenu: setActiveMenu, sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Topbar, {}), _jsxs("main", { className: "flex-1 p-4 sm:p-6 md:p-8 flex flex-col transition-all", children: [_jsx("h4", { className: "text-3xl font-extrabold mb-5", style: { color: "var(--foreground)" }, children: "Web Setting" }), loading ? (_jsx("p", { className: "text-lg font-medium animate-pulse", style: { color: "var(--muted-foreground)" }, children: "Loading settings..." })) : !webSetting ? (_jsx("div", { className: "mb-4 p-4 rounded-md bg-yellow-100 text-yellow-800 font-medium", style: { border: '1px solid var(--muted)' }, children: "Not setted" })) : null, _jsxs("div", { className: "max-w-sm space-y-4", children: [_jsx("label", { className: "block text-sm font-medium", style: { color: "var(--foreground)" }, children: "Expiry Time" }), _jsx("input", { type: "number", className: "w-full rounded-md px-3 py-2 border shadow-sm focus:outline-none focus:ring-2", value: time, min: 1, onChange: (e) => setTime(e.target.value === "" ? "" : Number(e.target.value)), style: { backgroundColor: "var(--card)", color: "var(--card-foreground)", borderColor: "var(--border)" } }), _jsx("label", { className: "block text-sm font-medium", style: { color: "var(--foreground)" }, children: "Period" }), _jsx("select", { className: "w-full rounded-md px-3 py-2 border shadow-sm focus:outline-none focus:ring-2", value: period, onChange: (e) => setPeriod(e.target.value), style: { backgroundColor: "var(--card)", color: "var(--card-foreground)", borderColor: "var(--border)" }, children: PERIODS.map(p => (_jsx("option", { value: p, children: p }, p))) }), _jsx("button", { className: "px-4 py-2 transition-colors cursor-pointer rounded-md mt-4", style: { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }, onClick: handleSave, children: "Save" })] })] })] })] })] }));
}
