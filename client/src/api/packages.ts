import type { Aggregates } from "@/types/Aggregates"
import type { Package } from "@/types/Package"
import { apiFetch } from "./client"

interface FetchPackagesParams {
    selectedStatus: string
    currentPage: number
    itemsPerPage: number
}

export async function fetchPackages({ selectedStatus, currentPage, itemsPerPage }: FetchPackagesParams) {
    const url = new URL(`/api/v1/packages`, import.meta.env.VITE_API_BASE_URL)

    if (selectedStatus !== "ALL") url.searchParams.append("status", selectedStatus)
    url.searchParams.append("limit", itemsPerPage.toString())
    url.searchParams.append("offset", ((currentPage - 1) * itemsPerPage).toString())

    const data = await apiFetch(url.pathname + url.search)

    return {
        packages: (data.data?.packages as Package[]) || [],
        aggregates: (data.data?.aggregates as Aggregates) || null,
        totalPages: data._meta?.totalPages || 1,
    }
}

export async function createPackage(data: { orderRef: string; driver?: string }) {
    return apiFetch(`/api/v1/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            order_ref: data.orderRef,
            driver: data.driver,
            created_by: "SYSTEM",
            modified_by: "SYSTEM"
        }),
    })
}

export async function updatePackageStatus(id: string, newStatus: string) {
    return apiFetch(`/api/v1/packages/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
    })
}
