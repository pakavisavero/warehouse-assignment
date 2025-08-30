import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationControlProps {
    totalPages: number
    currentPage: number
    setCurrentPage: (page: number) => void
}

export default function PaginationControl({ totalPages, currentPage, setCurrentPage }: PaginationControlProps) {
    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center mt-6">
            <Pagination>
                <PaginationContent className="flex items-center space-x-2">
                    <PaginationPrevious
                        href="#"
                        className={`px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={e => {
                            e.preventDefault()
                            if (currentPage > 1) setCurrentPage(currentPage - 1)
                        }}
                    >
                        Prev
                    </PaginationPrevious>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        className={`px-4 py-2 border transition-colors ${page === currentPage
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                            }`}
                                        onClick={e => {
                                            e.preventDefault()
                                            setCurrentPage(page)
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="px-2 text-gray-400 select-none">...</span>
                        } else return null
                    })}

                    <PaginationNext
                        href="#"
                        className={`px-4 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={e => {
                            e.preventDefault()
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                        }}
                    >
                        Next
                    </PaginationNext>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
