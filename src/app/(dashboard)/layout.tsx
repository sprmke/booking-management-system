import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/nav"
import { getCurrentUser } from "@/lib/session"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}