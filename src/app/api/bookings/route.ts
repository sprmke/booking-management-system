import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateBookingPDF } from '@/lib/services/pdf.service'
import { uploadPDFToS3 } from '@/lib/services/storage.service'
import { sendBookingConfirmationEmail } from '@/lib/services/email.service'
import { BookingFormValues } from '@/features/bookings/schemas/booking.schema'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const formData: BookingFormValues = await req.json()

    // 1. Save to database
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert([{
        unit_id: formData.unitId,
        guest_id: formData.guestId,
        check_in: new Date(formData.checkInDate + 'T' + formData.checkInTime),
        check_out: new Date(formData.checkOutDate + 'T' + formData.checkOutTime),
        total_guests: formData.numberOfAdults + formData.numberOfChildren,
        special_requests: formData.guestSpecialRequests,
        status: 'PENDING'
      }])
      .select()
      .single()

    if (dbError) throw dbError

    // 2. Generate and upload PDF
    const pdfBytes = await generateBookingPDF(formData)
    await uploadPDFToS3(pdfBytes, booking.id)

    // 3. Send confirmation email
    await sendBookingConfirmationEmail(formData)

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}