import { apiFetch } from '@/api/client';
export async function fetchWebSetting() {
    const data = await apiFetch('/api/v1/web-setting', {
        method: 'GET',
    });
    return data.data;
}
export async function updateWebSetting(id, time, period) {
    const data = await apiFetch(`/api/v1/web-setting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time, period }),
    });
    return data.data;
}
