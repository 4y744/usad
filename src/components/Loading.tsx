export function Loading() {
    return (
        <div className="w-64 h-3 rounded-md bg-zinc-800 relative overflow-hidden">
            <div className="w-32 h-3 bg-zinc-700 rounded-md absolute top-1/2 -translate-y-1/2 loading"></div>
        </div>
    )
}
