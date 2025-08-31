import { apiFetch } from "@/api/client"

export interface ExpiredLog {
    id: string
    package: {
        id: string
        order_ref: string
        status: string
    }
    old_status: string
    new_status: string
    changed_at: string
    changed_by?: string
    note?: string
}

export async function fetchPackageLogs(): Promise<ExpiredLog[]> {
    const data = await apiFetch("/api/v1/package-logs")
    return data.data || []
}
