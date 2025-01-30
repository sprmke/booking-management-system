import { redirect } from "next/navigation"
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview"
import { getCurrentUser } from "@/lib/session"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  return <DashboardOverview />
}