import { useEffect, useState } from "react"
import type { Package } from "@/types/Package"
import type { Aggregates } from "@/types/Aggregates"
import { fetchPackages } from "@/api/packages"

interface UsePackagesProps {
    selectedStatus: string
    currentPage: number
    itemsPerPage: number
}

export const usePackages = ({ selectedStatus, currentPage, itemsPerPage }: UsePackagesProps) => {
    const [packages, setPackages] = useState<Package[]>([])
    const [aggregates, setAggregates] = useState<Aggregates | null>(null)
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        let isMounted = true

        const load = async () => {
            try {
                const result = await fetchPackages({ selectedStatus, currentPage, itemsPerPage })
                if (!isMounted) return

                setPackages(result.packages)
                setAggregates(result.aggregates)
                setTotalPages(result.totalPages)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }

        load()
        const interval = setInterval(load, 5000)

        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [selectedStatus, currentPage, itemsPerPage])

    return { packages, aggregates, loading, totalPages }
}
