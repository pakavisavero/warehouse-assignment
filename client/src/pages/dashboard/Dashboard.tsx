import { useEffect, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { PlusIcon } from 'lucide-react'

import StatusFilter from '@/pages/dashboard/components/StatusFilter'
import PackageTable from '@/pages/dashboard/components/PackageTable'
import PackageCard from '@/pages/dashboard/components/PackageCard'
import AggregatesCard from '@/pages/dashboard/components/AggregatesCard'
import PaginationControl from '@/pages/dashboard/components/PaginationControl'
import CreatePackageModal from '@/pages/dashboard/components/modal/CreatePackageModal'

import { usePackages } from '@/hooks/usePackages'
import { createPackage, updatePackageStatus } from '@/api/packages'
import { Flash } from '@/components/Flash'
import type { FlashMessage } from '@/types/FlashMessage'

export default function Dashboard() {
  const location = useLocation()
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [flash, setFlash] = useState<FlashMessage | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const statusParam = searchParams.get('status') || 'ALL'
  const pageParam = searchParams.get('page') || '1'
  const limitParam = searchParams.get('limit') || '5'

  const [selectedStatus, setSelectedStatus] = useState<string>(statusParam)

  useEffect(() => {
    if (location.pathname !== '/dashboard') return
    setCurrentPage(Number(pageParam))
    setItemsPerPage(Number(limitParam))
    setSelectedStatus(statusParam)
  }, [location.pathname, pageParam, limitParam, statusParam])

  useEffect(() => {
    if (location.pathname !== '/dashboard') return
    const params: Record<string, string> = {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }
    if (selectedStatus !== 'ALL') params.status = selectedStatus
    setSearchParams(params)
  }, [selectedStatus, currentPage, itemsPerPage, setSearchParams, location.pathname])

  const { packages, aggregates, loading, totalPages } = usePackages({
    selectedStatus,
    currentPage,
    itemsPerPage,
  })

  const handleCreatePackage = async (data: { orderRef: string; driver?: string }) => {
    try {
      await createPackage(data)
      setFlash({ type: 'success', message: 'Package created successfully!' })
    } catch (err: any) {
      setFlash({ type: 'error', message: err.message || 'Failed to create package.' })
    } finally {
      setTimeout(() => setFlash(null), 3000)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const data = await updatePackageStatus(id, status)
      setFlash({
        type: 'success',
        message: data.message || `Package status updated to ${status}`,
      })
    } catch (err: any) {
      console.error('Caught error:', err)
      setFlash({
        type: 'error',
        message: err?.message || 'Failed to update status.',
      })
    } finally {
      setTimeout(() => setFlash(null), 3000)
    }
  }

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

      <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)]">
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col">
          <Topbar />

          <main className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 transition-all">
            <div className="flex justify-between items-center mb-5">
              <h4 className="hidden md:block text-3xl font-extrabold">
                Package Dashboard
              </h4>

            </div>

            <div className="w-full max-w-8xl">
              {aggregates && <AggregatesCard aggregates={aggregates} />}
              <hr className="my-6 border-t-1" style={{ borderColor: 'var(--border)' }} />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />

                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="flex items-center gap-2 px-5 py-2 rounded-md font-semibold text-base transition-all duration-200 hover:bg-[var(--primary-dark)] hover:shadow-md cursor-pointer"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  Create <PlusIcon className="w-5 h-5" />
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-lg font-medium animate-pulse text-[var(--muted-foreground)]">
                    Loading packages...
                  </p>
                </div>
              ) : (
                <>
                  <div className="hidden md:block">
                    <PackageTable
                      packages={packages}
                      handleUpdateStatus={handleUpdateStatus}
                    />
                  </div>

                  <div className="block md:hidden">
                    {packages.length > 0 ? (
                      packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)
                    ) : (
                      <p className="text-center py-8 text-[var(--muted-foreground)]">
                        No packages found.
                      </p>
                    )}
                  </div>

                  <PaginationControl
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </div>


            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
              <label htmlFor="itemsPerPage" className="text-sm font-medium">
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={e => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: 'var(--card)',
                  color: 'var(--card-foreground)',
                  borderColor: 'var(--border)',
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

      <CreatePackageModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreatePackage}
      />
    </>
  )
}
