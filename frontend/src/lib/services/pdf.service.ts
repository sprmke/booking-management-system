import { PDFDocument, StandardFonts } from 'pdf-lib'
import { BookingFormValues } from '@/features/bookings/schemas/booking.schema'

export async function generateBookingPDF(bookingData: BookingFormValues) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Header
  page.drawText('Booking Confirmation', {
    x: 50,
    y: height - 50,
    size: 20,
    font
  })

  // Guest Information
  const guestInfo = [
    `Primary Guest: ${bookingData.primaryGuestName}`,
    `Email: ${bookingData.guestEmail}`,
    `Phone: ${bookingData.guestPhoneNumber}`,
    `Address: ${bookingData.guestAddress}`,
    `Nationality: ${bookingData.nationality}`,
  ]

  guestInfo.forEach((text, index) => {
    page.drawText(text, {
      x: 50,
      y: height - 100 - (index * 25),
      size: 12,
      font
    })
  })

  // Booking Details
  const bookingDetails = [
    `Check-in: ${bookingData.checkInDate} at ${bookingData.checkInTime}`,
    `Check-out: ${bookingData.checkOutDate} at ${bookingData.checkOutTime}`,
    `Total Guests: ${bookingData.numberOfAdults + bookingData.numberOfChildren}`,
  ]

  bookingDetails.forEach((text, index) => {
    page.drawText(text, {
      x: 50,
      y: height - 250 - (index * 25),
      size: 12,
      font
    })
  })

  return await pdfDoc.save()
}