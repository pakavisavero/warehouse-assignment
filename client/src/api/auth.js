const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function loginApi(username, password) {
    const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Login failed");
    }
    const loginData = data;
    if (loginData.data) {
        localStorage.setItem("userId", loginData.data.id);
        localStorage.setItem("username", loginData.data.username);
    }
    return loginData;
}
