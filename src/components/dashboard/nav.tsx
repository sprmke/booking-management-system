"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Building2, 
  Settings,
  LogOut 
} from "lucide-react"

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Bookings",
    icon: Calendar,
    href: "/dashboard/bookings",
  },
  {
    label: "Guests",
    icon: Users,
    href: "/dashboard/guests",
  },
  {
    label: "Properties",
    icon: Building2,
    href: "/dashboard/properties",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">
          Dashboard
        </h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors",
                pathname === route.href ? "bg-gray-800" : "transparent",
              )}
            >
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3">
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800" onClick={() => {}}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}