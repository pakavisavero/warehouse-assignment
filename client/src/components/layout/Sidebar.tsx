import { AiOutlineDashboard, AiFillDatabase, AiOutlineSetting, AiOutlineClose } from 'react-icons/ai'

interface SidebarProps {
    activeMenu: string
    setActiveMenu: (menu: string) => void
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ activeMenu, setActiveMenu, sidebarOpen, setSidebarOpen }: SidebarProps) {
    const menuItems = [
        { name: 'Dashboard', icon: <AiOutlineDashboard /> },
        { name: 'Expired Log', icon: <AiFillDatabase /> },
        { name: 'Web Setting', icon: <AiOutlineSetting /> },
    ]

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex-shrink-0 flex flex-col transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="p-6 font-bold text-xl border-b border-gray-200 flex items-center justify-between">
                    Package Queue
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <AiOutlineClose className="text-2xl" />
                    </button>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                    {menuItems.map(item => (
                        <button
                            key={item.name}
                            onClick={() => {
                                setActiveMenu(item.name)
                                setSidebarOpen(false)
                            }}
                            className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${activeMenu === item.name
                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    )
}
