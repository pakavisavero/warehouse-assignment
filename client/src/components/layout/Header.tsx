import { AiOutlineMenu } from 'react-icons/ai'

interface HeaderProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
    return (
        <div className="md:hidden flex justify-between items-center w-full mb-2">
            <h4 className="text-2xl font-extrabold text-gray-800">Package Dashboard</h4>
            <button onClick={() => setSidebarOpen(true)}>
                <AiOutlineMenu className="text-3xl" />
            </button>
        </div>
    )
}
