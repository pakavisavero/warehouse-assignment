import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { Flash } from '@/components/Flash'
import { formatTimestamp } from '@/utils/dateUtils'
import type { FlashMessage } from '@/types/FlashMessage'
import { fetchPackageLogs } from '@/api/expiredLog'

interface ExpiredLog {
    id: string
    package: {
        id: string
        order_ref: string
        status: string
    }
    old_status: string
    new_status: string
    changed_at: string
    changed_by?: string
    note?: string
}

export default function ExpiredLogDashboard() {
    const [logs, setLogs] = useState<ExpiredLog[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [flash, setFlash] = useState<FlashMessage | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const [activeMenu, setActiveMenu] = useState<string>('Expired Log')

    const loadLogs = async () => {
        setLoading(true)
        try {
            const data = await fetchPackageLogs()
            setLogs(data)
        } catch (err: any) {
            setFlash({ type: 'error', message: err.message || 'Failed to fetch package logs' })
            setLogs([])
        } finally {
            setLoading(false)
            setTimeout(() => setFlash(null), 3000)
        }
    }

    useEffect(() => {
        loadLogs()
    }, [])

    return (
        <>
            {flash && (
                <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
                    <Flash
                        type={flash.type}
                        title={flash.type === 'success' ? 'Success' : 'Error'}
                        message={flash.message}
                    />
                </div>
            )}

            <div
                className="min-h-screen flex"
                style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
            >
                <Sidebar
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <div className="flex-1 flex flex-col">
                    <Topbar />
                    <main className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col transition-all">
                        <h4 className="text-3xl font-extrabold mb-10" style={{ color: 'var(--foreground)' }}>
                            Expired Logs
                        </h4>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg font-medium animate-pulse" style={{ color: 'var(--muted-foreground)' }}>
                                    Loading expired logs...
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-lg shadow">
                                <table className="min-w-[700px] w-full table-auto border-collapse">
                                    <thead className="bg-[var(--muted)]">
                                        <tr className="sticky top-0 z-10">
                                            {[
                                                'Package ID', 'Order Ref', 'Package Status',
                                                'Changed At'
                                            ].map(head => (
                                                <th
                                                    key={head}
                                                    className="text-left font-semibold text-sm sm:text-base px-4 py-2 border-b"
                                                    style={{ color: 'var(--muted-foreground)' }}
                                                >
                                                    {head}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.length > 0 ? (
                                            logs.map(log => (
                                                <tr key={log.id} className="transition-all hover:bg-[var(--muted)] bg-[var(--card)]">
                                                    <td className="px-4 py-2">{log.package.id}</td>
                                                    <td className="px-4 py-2">{log.package.order_ref}</td>
                                                    <td className="px-4 py-2">{log.package.status}</td>
                                                    <td className="px-4 py-2">{formatTimestamp(log.changed_at)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={9}
                                                    className="text-center py-8 text-sm sm:text-base"
                                                    style={{ color: 'var(--muted-foreground)' }}
                                                >
                                                    No package logs found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    )
}
