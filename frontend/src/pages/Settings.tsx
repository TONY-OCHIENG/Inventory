import { useEffect } from "react"
import { ChevronRight, Lock, User } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import Profile from "./Profile"
import Password from "./Password"

const TABS = [
  { key: "profile", name: "Profile", icon: User, component: Profile },
  { key: "password", name: "Update password", icon: Lock, component: Password },
] as const

function Settings() {
  const [params, setParams] = useSearchParams()

  // Fall back to the first tab if ?tab is missing or invalid
  const active = TABS.find((t) => t.key === params.get("tab")) ?? TABS[0]
  const ActiveTab = active.component

  // Make the address bar show ?tab=profile when visiting bare /dashboard/settings
  useEffect(() => {
    if (params.get("tab") !== active.key) {
      setParams({ tab: active.key }, { replace: true })
    }
  }, [params, active.key, setParams])

  return (
    <div className="p-4 w-full h-full flex gap-4">
      <div className="bg-white/80 border-t-2 border-t-white p-4 rounded-md w-[18%] h-[25%] flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-sm text-gray-600 font-bold">Settings</h1>
          <ChevronRight className="transition duration-300 h-4 w-4 text-gray-600 cursor-pointer" />
        </div>
        <hr className="mt-2 mb-2 text-gray-400" />

        <ul role="tablist" aria-orientation="vertical">
          {TABS.map((item) => {
            const isActive = item.key === active.key
            return (
              <li key={item.key} className="mb-1">
                <Link
                  role="tab"
                  aria-selected={isActive}
                  to={`?tab=${item.key}`}
                  replace
                  className={`relative flex items-center gap-2 w-full rounded-md py-2.5 text-xs
                    max-md:justify-center hover:bg-white/60
                    ${isActive ? "bg-white text-gray-600" : "text-gray-400"}`}
                >
                  <item.icon className="h-5 text-gray-400" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="w-full h-full" role="tabpanel">
        <ActiveTab />
      </div>
    </div>
  )
}

export default Settings
