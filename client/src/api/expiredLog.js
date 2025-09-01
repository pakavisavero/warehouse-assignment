import { apiFetch } from "@/api/client";
export async function fetchPackageLogs() {
    const data = await apiFetch("/api/v1/package-logs");
    return data.data || [];
}
