import { BookingFormValues } from "../schemas/booking.schema"
import { formatTimeToAMPM } from "@/lib/utils/time"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function submitBooking(values: BookingFormValues) {
  const formData = {
    ...values,
    checkInTime: formatTimeToAMPM(values.checkInTime, true),
    checkOutTime: formatTimeToAMPM(values.checkOutTime, false),
  }

  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })

  if (!response.ok) {
    throw new Error('Failed to submit booking')
  }

  return response.json()
}