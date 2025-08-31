const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface LoginResponse {
    message: string
    data: {
        id: string
        username: string
    } | null
}

export async function loginApi(username: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Login failed")
    }

    const loginData = data as LoginResponse

    if (loginData.data) {
        localStorage.setItem("userId", loginData.data.id)
        localStorage.setItem("username", loginData.data.username)
    }

    return loginData
}
