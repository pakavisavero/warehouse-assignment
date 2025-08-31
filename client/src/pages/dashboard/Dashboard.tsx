import { useEffect, useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

import StatusFilter from '@/pages/dashboard/components/StatusFilter'
import PackageTable from '@/pages/dashboard/components/PackageTable'
import AggregatesCard from '@/pages/dashboard/components/AggregatesCard'
import PaginationControl from '@/pages/dashboard/components/PaginationControl'

import { usePackages } from '@/hooks/usePackages'
import { createPackage, updatePackageStatus } from '@/api/packages'
import { Flash } from '@/components/Flash'
import type { FlashMessage } from '@/types/FlashMessage'

export default function Dashboard() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedStatus, setSelectedStatus] = useState<string>(
    new URLSearchParams(window.location.search).get('status') || 'ALL'
  )
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [flash, setFlash] = useState<FlashMessage | null>(null)

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

  const handleCreatePackage = async (data: { orderRef: string; driver?: string }) => {
    try {
      await createPackage(data)
      setFlash({ type: "success", message: "Package created successfully!" })
    } catch (err: any) {
      setFlash({ type: "error", message: err.message || "Failed to create package." })
    } finally {
      setTimeout(() => setFlash(null), 3000)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const data = await updatePackageStatus(id, status);

      setFlash({
        type: "success",
        message: data.message || `Package status updated to ${status}`,
      });
    } catch (err: any) {
      console.error("Caught error:", err);
      setFlash({
        type: "error",
        message: err?.message || "Failed to update status.",
      });
    } finally {
      setTimeout(() => setFlash(null), 3000);
    }
  };


  return (
    <>
      {flash && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
          <Flash
            type={flash.type}
            title={flash.type === "success" ? "Success" : "Error"}
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
            <h4
              className="hidden md:block text-3xl font-extrabold mb-5"
              style={{ color: 'var(--foreground)' }}
            >
              Package Dashboard
            </h4>
            <div className="w-full max-w-8xl">
              {aggregates && <AggregatesCard aggregates={aggregates} />}
              <hr className="my-6 border-t-1" style={{ borderColor: 'var(--border)' }} />
              <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p
                    className="text-lg font-medium animate-pulse"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Loading packages...
                  </p>
                </div>
              ) : (
                <>
                  <PackageTable
                    packages={packages}
                    handleUpdateStatus={handleUpdateStatus}
                    handleCreatePackage={handleCreatePackage}
                  />
                  <PaginationControl
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <label
                htmlFor="itemsPerPage"
                className="text-sm font-medium"
                style={{ color: 'var(--foreground)' }}
              >
                Show:
              </label>
              <select
                id="itemsPerPage"
                className="rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: 'var(--card)',
                  color: 'var(--card-foreground)',
                  borderColor: 'var(--border)',
                }}
                value={itemsPerPage}
                onChange={e => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
              >
                {[5, 20, 50, 100].map(n => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
