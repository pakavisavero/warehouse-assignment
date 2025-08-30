import { useEffect, useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

import StatusFilter from '@/pages/dashboard/components/StatusFilter'
import PackageTable from '@/pages/dashboard/components/PackageTable'
import AggregatesCard from '@/pages/dashboard/components/AggregatesCard'
import PaginationControl from '@/pages/dashboard/components/PaginationControl'

import { usePackages } from '@/hooks/usePackages'

export default function App() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedStatus, setSelectedStatus] = useState<string>(
    new URLSearchParams(window.location.search).get('status') || 'ALL'
  )
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  useEffect(() => {
    const url = new URL(window.location.href)
    if (selectedStatus === 'ALL') url.searchParams.delete('status')
    else url.searchParams.set('status', selectedStatus)

    url.searchParams.set('page', currentPage.toString())
    url.searchParams.set('limit', itemsPerPage.toString())
    window.history.replaceState({}, '', url.toString())
  }, [selectedStatus, currentPage, itemsPerPage])

  const { packages, aggregates, loading, totalPages } = usePackages({
    selectedStatus,
    currentPage,
    itemsPerPage
  })

  return (
    <div className="min-h-screen flex">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col transition-all">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <h4 className="hidden md:block text-3xl sm:text-4xl md:text-4xl font-extrabold text-gray-800 mb-5 text-left">
          Package Dashboard
        </h4>

        <div className="w-full max-w-8xl">
          {aggregates && <AggregatesCard aggregates={aggregates} />}
          <hr className="my-6 border-t-1 border-gray-300" />

          <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />

          <div className="flex items-center space-x-3 mb-4">
            <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">Show:</label>
            <select
              id="itemsPerPage"
              className="border border-gray-300 bg-white text-gray-700 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={itemsPerPage}
              onChange={e => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
            >
              {[5, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg font-medium text-gray-500 animate-pulse">Loading packages...</p>
            </div>
          ) : (
            <>
              <PackageTable packages={packages} />
              <PaginationControl totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
