import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
export default function PaginationControl({ totalPages, currentPage, setCurrentPage }) {
    if (totalPages <= 1)
        return null;
    return (_jsx("div", { className: "flex justify-center mt-6", children: _jsx(Pagination, { children: _jsxs(PaginationContent, { className: "flex items-center space-x-2", children: [_jsx(PaginationPrevious, { href: "#", className: `px-4 py-1 rounded-full border text-sm transition-colors ${currentPage === 1
                            ? "opacity-50 cursor-not-allowed border-[var(--border)] text-[var(--muted-foreground)]"
                            : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"}`, onClick: e => {
                            e.preventDefault();
                            if (currentPage > 1)
                                setCurrentPage(currentPage - 1);
                        }, children: "Prev" }), Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                            return (_jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", className: `px-4 py-2 border text-sm rounded-md transition-colors ${page === currentPage
                                        ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                                        : "bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"}`, onClick: e => {
                                        e.preventDefault();
                                        setCurrentPage(page);
                                    }, children: page }) }, page));
                        }
                        else if (page === currentPage - 2 || page === currentPage + 2) {
                            return (_jsx("span", { className: "px-2 text-[var(--muted-foreground)] select-none", children: "..." }, page));
                        }
                        else
                            return null;
                    }), _jsx(PaginationNext, { href: "#", className: `px-4 py-1 rounded-full border text-sm transition-colors ${currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed border-[var(--border)] text-[var(--muted-foreground)]"
                            : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"}`, onClick: e => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                                setCurrentPage(currentPage + 1);
                        }, children: "Next" })] }) }) }));
}
