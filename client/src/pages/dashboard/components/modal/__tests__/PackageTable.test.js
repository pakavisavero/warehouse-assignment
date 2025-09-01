import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PackageTable from '@/pages/dashboard/components/PackageTable';
const packages = [
    {
        id: '1',
        package_id: 'PKG1',
        order_ref: 'ORD1',
        driver: 'DRV1',
        status: 'WAITING',
        created_by: 'SYSTEM',
        created_at: '2025-08-31T00:00:00Z',
    },
];
describe('PackageTable Component', () => {
    it('renders package rows correctly', () => {
        render(_jsx(PackageTable, { packages: packages, handleUpdateStatus: jest.fn(), handleCreatePackage: jest.fn() }));
        expect(screen.getByText('PKG1')).toBeInTheDocument();
        expect(screen.getByText('ORD1')).toBeInTheDocument();
        expect(screen.getByText('WAITING')).toBeInTheDocument();
    });
    it('opens CreatePackageModal when create button clicked', async () => {
        const user = userEvent.setup();
        render(_jsx(PackageTable, { packages: [], handleUpdateStatus: jest.fn(), handleCreatePackage: jest.fn() }));
        const createButton = screen.getByRole('button', { name: /create/i });
        await user.click(createButton);
        expect(screen.getByText('Create Package')).toBeInTheDocument();
    });
});
