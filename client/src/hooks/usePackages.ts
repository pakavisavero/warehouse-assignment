import { useEffect, useState } from 'react'
import type { Package } from '@/types/Package'
import type { Aggregates } from '@/types/Aggregates'

interface UsePackagesProps {
    selectedStatus: string
    currentPage: number
    itemsPerPage: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usePackages = ({ selectedStatus, currentPage, itemsPerPage }: UsePackagesProps) => {
    const [packages, setPackages] = useState<Package[]>([])
    const [aggregates, setAggregates] = useState<Aggregates | null>(null)
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        let isMounted = true

        const fetchPackages = async () => {
            try {
                const url = new URL(`${API_BASE_URL}/api/v1/packages`);
                if (selectedStatus !== 'ALL') url.searchParams.append('status', selectedStatus);
                url.searchParams.append('limit', itemsPerPage.toString());
                url.searchParams.append('offset', ((currentPage - 1) * itemsPerPage).toString());

                const res = await fetch(url.toString());
                const data = await res.json();
                if (!isMounted || !data.data) return;

                setPackages(data.data.packages || []);
                setAggregates(data.data.aggregates || null);
                setTotalPages(Math.ceil((data.data.aggregates.TOTAL || 0) / itemsPerPage));
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }

        fetchPackages()
        const interval = setInterval(fetchPackages, 5000)

        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [selectedStatus, currentPage, itemsPerPage])

    return { packages, aggregates, loading, totalPages }
}
