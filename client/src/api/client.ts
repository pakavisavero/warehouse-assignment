const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiFetch(url: string, options: RequestInit = {}, withAuth: boolean = true) {
    const headers = new Headers(options.headers || {})

    if (withAuth) {
        const userId = localStorage.getItem("userId")
        if (userId) headers.set("X-User-ID", userId)
    }

    const res = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || res.statusText)
    }

    return data
}
