import { render, screen } from '@testing-library/react'
import PackageTable from '@/pages/dashboard/components/PackageTable'
import type { Package } from '@/types/Package'

const packages: Package[] = [
    {
        id: '1',
        package_id: 'PKG1',
        order_ref: 'ORD1',
        driver: 'DRV1',
        status: 'WAITING',
        created_by: 'SYSTEM',
        created_at: '2025-08-31T00:00:00Z',
    },
]

describe('PackageTable Component', () => {
    it('renders package rows correctly', () => {
        render(
            <PackageTable
                packages={packages}
                handleUpdateStatus={jest.fn()}
            />
        )

        expect(screen.getByText('PKG1')).toBeInTheDocument()
        expect(screen.getByText('ORD1')).toBeInTheDocument()
        expect(screen.getByText('WAITING')).toBeInTheDocument()
    })

    it('renders "No packages found" when package list is empty', () => {
        render(
            <PackageTable
                packages={[]}
                handleUpdateStatus={jest.fn()}
            />
        )

        expect(screen.getByText(/no packages found/i)).toBeInTheDocument()
    })
})
