import { AiOutlineDashboard, AiFillDatabase, AiOutlineSetting, AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
    activeMenu: string
    setActiveMenu: (menu: string) => void
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ activeMenu, setActiveMenu, sidebarOpen, setSidebarOpen }: SidebarProps) {
    const navigate = useNavigate()

    const menuItems = [
        { name: 'Dashboard', icon: <AiOutlineDashboard />, path: '/dashboard' },
        { name: 'Expired Log', icon: <AiFillDatabase />, path: '/expired-logs' },
        { name: 'Web Setting', icon: <AiOutlineSetting />, path: '/web-setting' }
    ]

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40"
                    style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-64 md:w-56 lg:w-60 flex-shrink-0 flex flex-col border-r transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                style={{
                    backgroundColor: 'var(--color-sidebar)',
                    color: 'var(--color-sidebar-foreground)',
                    borderColor: 'var(--color-sidebar-border)',
                }}
            >
                <div
                    className="p-6 font-semibold text-xl flex items-center justify-between"
                    style={{ borderBottom: '1px solid var(--color-sidebar-border)' }}
                >
                    <span className="tracking-wider" style={{ color: 'var(--color-sidebar-foreground)' }}>
                        PACKAGE QUEUE
                    </span>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <AiOutlineClose
                            className="text-xl transition-colors"
                            style={{ color: 'var(--color-sidebar-foreground)' }}
                        />
                    </button>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-1">
                    {menuItems.map(item => {
                        const isActive = activeMenu === item.name
                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setActiveMenu(item.name)
                                    navigate(item.path)
                                    setSidebarOpen(false)
                                }}
                                className="flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200"
                                style={{
                                    backgroundColor: isActive
                                        ? 'var(--color-sidebar-primary)'
                                        : 'transparent',
                                    color: isActive
                                        ? 'var(--color-sidebar-primary-foreground)'
                                        : 'var(--color-sidebar-foreground)',
                                }}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                <span className="tracking-wide">{item.name}</span>
                            </button>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
