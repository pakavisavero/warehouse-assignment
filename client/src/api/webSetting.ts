import { apiFetch } from '@/api/client'
import type { PERIODS } from '@/types/Period'

type PeriodType = typeof PERIODS[number]

export interface WebSetting {
    id: number
    period: PeriodType
    time: number
    created_at: string
    updated_at: string
}

export async function fetchWebSetting(): Promise<WebSetting> {
    const data = await apiFetch('/api/v1/web-setting', {
        method: 'GET',
    })
    return data.data
}

export async function updateWebSetting(id: number, time: number, period: PeriodType): Promise<WebSetting> {
    const data = await apiFetch(`/api/v1/web-setting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time, period }),
    })
    return data.data
}
