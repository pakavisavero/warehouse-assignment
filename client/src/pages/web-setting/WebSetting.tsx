import { useState, useEffect } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import { fetchWebSetting, updateWebSetting, type WebSetting } from "@/api/webSetting"
import { Flash } from "@/components/Flash"
import type { FlashMessage } from "@/types/FlashMessage"
import { PERIODS } from "@/types/Period"

type PeriodType = typeof PERIODS[number]

export default function WebSettingPage() {
    const [webSetting, setWebSetting] = useState<WebSetting | null>(null)
    const [time, setTime] = useState<number | "">("")
    const [period, setPeriod] = useState<PeriodType>("minutes")
    const [loading, setLoading] = useState<boolean>(false)
    const [flash, setFlash] = useState<FlashMessage | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const [activeMenu, setActiveMenu] = useState<string>("Web Setting")

    useEffect(() => {
        setLoading(true)
        fetchWebSetting()
            .then(ws => {
                if (ws) {
                    setWebSetting(ws)
                    setTime(ws.time)
                    if (PERIODS.includes(ws.period as PeriodType)) {
                        setPeriod(ws.period as PeriodType)
                    }
                } else {
                    setWebSetting(null)
                    setTime("")
                }
            })
            .catch(err => setFlash({ type: "error", message: err.message || "Failed to fetch settings" }))
            .finally(() => setLoading(false))
    }, [])

    const handleSave = async () => {
        if (!time) {
            setFlash({ type: "error", message: "Expiry time cannot be empty" })
            setTimeout(() => setFlash(null), 3000)
            return
        }

        try {
            const updated = await updateWebSetting(webSetting?.id || 1, time as number, period)
            setWebSetting(updated)
            setFlash({ type: "success", message: "Settings updated successfully!" })
        } catch (err: any) {
            setFlash({ type: "error", message: err.message || "Failed to update settings" })
        } finally {
            setTimeout(() => setFlash(null), 3000)
        }
    }

    return (
        <>
            {flash && (
                <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
                    <Flash type={flash.type} title={flash.type === "success" ? "Success" : "Error"} message={flash.message} />
                </div>
            )}

            <div className="min-h-screen flex" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
                <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 flex flex-col">
                    <Topbar />
                    <main className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col transition-all">
                        <h4 className="text-3xl font-extrabold mb-5" style={{ color: "var(--foreground)" }}>Web Setting</h4>

                        {loading ? (
                            <p className="text-lg font-medium animate-pulse" style={{ color: "var(--muted-foreground)" }}>
                                Loading settings...
                            </p>
                        ) : !webSetting ? (
                            <div
                                className="mb-4 p-4 rounded-md bg-yellow-100 text-yellow-800 font-medium"
                                style={{ border: '1px solid var(--muted)' }}
                            >
                                Not setted
                            </div>
                        ) : null}

                        <div className="max-w-sm space-y-4">
                            <label className="block text-sm font-medium" style={{ color: "var(--foreground)" }}>
                                Expiry Time
                            </label>
                            <input
                                type="number"
                                className="w-full rounded-md px-3 py-2 border shadow-sm focus:outline-none focus:ring-2"
                                value={time}
                                min={1}
                                onChange={(e) => setTime(e.target.value === "" ? "" : Number(e.target.value))}
                                style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", borderColor: "var(--border)" }}
                            />

                            <label className="block text-sm font-medium" style={{ color: "var(--foreground)" }}>
                                Period
                            </label>
                            <select
                                className="w-full rounded-md px-3 py-2 border shadow-sm focus:outline-none focus:ring-2"
                                value={period}
                                onChange={(e) => setPeriod(e.target.value as PeriodType)}
                                style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", borderColor: "var(--border)" }}
                            >
                                {PERIODS.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>

                            <button
                                className="px-4 py-2 transition-colors cursor-pointer rounded-md mt-4"
                                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

