import type { Aggregates } from "@/types/Aggregates"
import type { Package } from "@/types/Package"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface FetchPackagesParams {
    selectedStatus: string
    currentPage: number
    itemsPerPage: number
}

export async function fetchPackages({ selectedStatus, currentPage, itemsPerPage }: FetchPackagesParams) {
    const url = new URL(`${API_BASE_URL}/api/v1/packages`)

    if (selectedStatus !== "ALL") url.searchParams.append("status", selectedStatus)
    url.searchParams.append("limit", itemsPerPage.toString())
    url.searchParams.append("offset", ((currentPage - 1) * itemsPerPage).toString())

    const res = await fetch(url.toString())
    if (!res.ok) {
        throw new Error(`Failed to fetch packages: ${res.statusText}`)
    }

    const data = await res.json()
    return {
        packages: data.data?.packages as Package[] || [],
        aggregates: data.data?.aggregates as Aggregates || null,
        totalPages: data._meta?.totalPages || 1,
    }
}

export async function createPackage(data: { orderRef: string; driver?: string }) {
    const res = await fetch(`${API_BASE_URL}/api/v1/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            order_ref: data.orderRef,
            driver: data.driver,
            created_by: "SYSTEM",
            modified_by: "SYSTEM"
        })
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Failed to create package")
    }

    return res.json()
}


export async function updatePackageStatus(id: string, newStatus: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/packages/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update status");
    }

    return await res.json();
}

