// components/ui/loading-overlay.tsx
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingOverlayProps {
    visible: boolean
    blur?: boolean
    className?: string
    loaderClassName?: string
}

export function LoadingOverlay({
    visible,
    blur = false,
    className,
    loaderClassName,
}: LoadingOverlayProps) {
    if (!visible) return null

    return (
        <div
            className={cn(
                "sticky h-screen inset-0 z-40 flex items-center justify-center bg-background/70",
                blur && "backdrop-blur-sm",
                className
            )}
        >
            <Loader2
                strokeWidth={2.5}
                 
                className={cn("h-24 w-24 animate-spin text-primary", loaderClassName)}
            />
        </div>
    )
}
