import { useCallback, useEffect, useState } from "react"
import { AlertTriangle, Bell, CheckCheck, Info, Loader2, PackageMinus } from "lucide-react"

type NotificationType = "stock.low" | "stock.out" | "info"

type NotificationItem = {
  id: string
  type: NotificationType
  message: string
  read: boolean
  createdAt: string // ISO string
}

type Filter = "all" | "unread"
type Status = "loading" | "ready" | "error"

const ICONS = {
  "stock.low": { icon: PackageMinus, color: "text-amber-500 bg-amber-50" },
  "stock.out": { icon: AlertTriangle, color: "text-red-500 bg-red-50" },
  info: { icon: Info, color: "text-blue-500 bg-blue-50" },
} as const

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

function Notifications() {
  const [items, setItems] = useState<NotificationItem[]>([])
  const [filter, setFilter] = useState<Filter>("all")
  const [status, setStatus] = useState<Status>("loading")
  const [error, setError] = useState("")

  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/notifications", { signal })
      if (!res.ok) throw new Error("Failed to load notifications")
      const data = (await res.json()) as NotificationItem[]
      setItems(data)
      setStatus("ready")
      setError("")
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return
      setError(err instanceof Error ? err.message : "Something went wrong")
      // Keep showing existing items if a background refresh fails
      setStatus((prev) => (prev === "loading" ? "error" : prev))
    }
  }, [])

  // Initial load + polling
  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
    const timer = setInterval(() => load(controller.signal), 30_000)
    return () => {
      controller.abort()
      clearInterval(timer)
    }
  }, [load])

  const markRead = async (id: string) => {
    // Optimistic update, roll back on failure
    const previous = items
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    try {
      const res = await fetch(`/api/notifications/${id}/read`, { method: "PATCH" })
      if (!res.ok) throw new Error()
    } catch {
      setItems(previous)
    }
  }

  const markAllRead = async () => {
    const previous = items
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
    try {
      const res = await fetch("/api/notifications/read-all", { method: "POST" })
      if (!res.ok) throw new Error()
    } catch {
      setItems(previous)
    }
  }

  const unreadCount = items.filter((n) => !n.read).length
  const visible = filter === "unread" ? items.filter((n) => !n.read) : items

  return (
    <div className="p-4 w-full h-full">
      <div className="bg-white/80 border-t-2 border-t-white rounded-md p-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-gray-600">Notifications</h2>
            <p className="text-xs text-gray-400 mt-1">
              Low-stock alerts and other updates from your inventory.
            </p>
          </div>

          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white/90 px-3 py-1.5 text-xs text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all as read
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4" role="tablist">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs capitalize ${
                filter === f
                  ? "bg-gray-700 text-white"
                  : "bg-white/90 text-gray-500 hover:bg-white"
              }`}
            >
              {f}
              {f === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <hr className="mt-4 mb-2 text-gray-300" />

        {/* Body */}
        {status === "loading" && (
          <div className="flex items-center gap-2 py-6 text-xs text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading notifications...
          </div>
        )}

        {status === "error" && (
          <div className="py-6 text-xs text-red-500">
            {error}{" "}
            <button onClick={() => load()} className="underline">
              Retry
            </button>
          </div>
        )}

        {status === "ready" && visible.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
            <Bell className="h-6 w-6" />
            <p className="text-xs">
              {filter === "unread" ? "You're all caught up." : "No notifications yet."}
            </p>
          </div>
        )}

        {status === "ready" && visible.length > 0 && (
          <ul className="divide-y divide-gray-200">
            {visible.map((n) => {
              const { icon: Icon, color } = ICONS[n.type] ?? ICONS.info
              return (
                <li key={n.id}>
                  <button
                    onClick={() => !n.read && markRead(n.id)}
                    className={`w-full flex items-start gap-3 rounded-md px-2 py-3 text-left hover:bg-white/70 ${
                      n.read ? "" : "bg-white/60"
                    }`}
                  >
                    <span className={`mt-0.5 rounded-full p-2 ${color}`}>
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="flex-1 min-w-0">
                      <span
                        className={`block text-xs ${
                          n.read ? "text-gray-400" : "text-gray-700 font-medium"
                        }`}
                      >
                        {n.message}
                      </span>
                      <span className="block text-[11px] text-gray-400 mt-0.5">
                        {timeAgo(n.createdAt)}
                      </span>
                    </span>

                    {!n.read && (
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500"
                        aria-label="Unread"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Notifications