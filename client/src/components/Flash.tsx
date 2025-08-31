import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, AlertCircleIcon, InfoIcon, AlertTriangleIcon } from "lucide-react"
import type { JSX } from "react"

export type FlashType = "success" | "error" | "info" | "warning"

interface FlashProps {
    type: FlashType
    title?: string
    message: string
}

const icons: Record<FlashType, JSX.Element> = {
    success: <CheckCircle2Icon className="h-5 w-5 text-[var(--success)]" />,
    error: <AlertCircleIcon className="h-5 w-5 text-[var(--destructive)]" />,
    info: <InfoIcon className="h-5 w-5 text-[var(--info)]" />,
    warning: <AlertTriangleIcon className="h-5 w-5 text-[var(--warning)]" />,
}

const backgroundColors: Record<FlashType, string> = {
    success: "bg-[color:var(--success-bg)] border-[color:var(--success)]",
    error: "bg-[color:var(--destructive-bg)] border-[color:var(--destructive)]",
    info: "bg-[color:var(--info-bg)] border-[color:var(--info)]",
    warning: "bg-[color:var(--warning-bg)] border-[color:var(--warning)]",
}

export function Flash({ type, title, message }: FlashProps) {
    return (
        <Alert
            variant={type === "error" ? "destructive" : "default"}
            className={`border rounded-lg shadow-md flex items-start gap-3 py-3 ${backgroundColors[type]}`}
            style={{
                color: "var(--card-foreground)",
            }}
        >
            <div className="flex-shrink-0 mt-1">
                {icons[type]}
            </div>

            <div className="flex flex-col">
                {title && (
                    <AlertTitle className="font-semibold">
                        {title}
                    </AlertTitle>
                )}
                <AlertDescription className="text-sm">
                    {message}
                </AlertDescription>
            </div>
        </Alert>
    )
}
