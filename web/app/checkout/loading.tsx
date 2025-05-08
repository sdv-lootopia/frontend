import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-300" />
                <p className="mt-4 text-sand-500">Chargement...</p>
            </div>
        </div>
    )
}
