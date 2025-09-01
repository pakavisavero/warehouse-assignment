import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import StatusFilter from '@/pages/dashboard/components/StatusFilter';
describe('StatusFilter Component', () => {
    it('renders all status buttons and calls setSelectedStatus when clicked', async () => {
        const user = userEvent.setup();
        const setSelectedStatus = jest.fn();
        render(_jsx(StatusFilter, { selectedStatus: "ALL", setSelectedStatus: setSelectedStatus }));
        const waitingButton = screen.getByRole('button', { name: /waiting/i });
        expect(waitingButton).toBeInTheDocument();
        await user.click(waitingButton);
        expect(setSelectedStatus).toHaveBeenCalledWith('WAITING');
    });
});
