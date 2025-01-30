import { GuestBookingForm } from "@/features/guest-booking/components/guest-booking-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Azure North Monaco 2604</h1>
          <p className="mt-2 text-lg text-gray-600">Book your stay with us</p>
        </div>
        <GuestBookingForm />
      </div>
    </div>
  )
}