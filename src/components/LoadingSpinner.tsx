import { Loader2 } from 'lucide-react'

export function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
    return (
        <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-3 py-10">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm">{label}</span>
        </div>
    )
}
