import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { PDFDocument, StandardFonts } from 'pdf-lib'

const sesClient = new SESClient({ region: process.env.AWS_REGION })
const s3Client = new S3Client({ region: process.env.AWS_REGION })

export async function generateBookingPDF(bookingData: any) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  page.drawText('Booking Confirmation', {
    x: 50,
    y: height - 50,
    size: 20,
    font
  })

  return await pdfDoc.save()
}

export async function uploadPDFToS3(pdfBytes: Uint8Array, bookingId: string) {
  const pdfKey = `bookings/${bookingId}/confirmation.pdf`
  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: pdfKey,
    Body: pdfBytes,
    ContentType: 'application/pdf'
  }))
  return pdfKey
}

export async function sendBookingConfirmationEmail(bookingData: any) {
  await sesClient.send(new SendEmailCommand({
    Destination: {
      ToAddresses: [bookingData.guestEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <h1>Booking Confirmation</h1>
            <p>Thank you for your booking!</p>
            <p>Check-in: ${bookingData.checkInDate} at ${bookingData.checkInTime}</p>
            <p>Check-out: ${bookingData.checkOutDate} at ${bookingData.checkOutTime}</p>
          `
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Your Booking Confirmation"
      }
    },
    Source: "noreply@yourdomain.com"
  }))
}