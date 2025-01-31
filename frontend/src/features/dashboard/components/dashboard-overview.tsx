"use client"

import { Card } from "@/components/ui/card"
import { 
  CalendarDays, 
  Users, 
  Building2, 
  TrendingUp 
} from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <CalendarDays className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h3 className="text-2xl font-bold">128</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Active Guests</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Properties</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <h3 className="text-2xl font-bold">₱256,800</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Add more dashboard components here */}
    </div>
  )
}