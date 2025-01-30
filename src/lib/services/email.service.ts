import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { BookingFormValues } from '@/features/bookings/schemas/booking.schema'

const sesClient = new SESClient({ region: process.env.AWS_REGION })

export async function sendBookingConfirmationEmail(bookingData: BookingFormValues) {
  const emailContent = `
    <h1>Azure North Monaco 2604 - Guest Form</h1>
    <ul>
      <li>Booking Information:
        <ul>
          <li>Tower & Unit No.: Monaco Tower, Unit 2604</li>
          <li>Check-in: ${bookingData.checkInDate} at ${bookingData.checkInTime}</li>
          <li>Check-out: ${bookingData.checkOutDate} at ${bookingData.checkOutTime}</li>
        </ul>
      </li>
      <li>Guest Information:
        <ul>
          <li>Primary Guest: ${bookingData.primaryGuestName}</li>
          <li>Nationality: ${bookingData.nationality}</li>
          <li>Guest Email: ${bookingData.guestEmail}</li>
          <li>Guest Phone Number: ${bookingData.guestPhoneNumber}</li>
          <li>Number of Adults: ${bookingData.numberOfAdults}</li>
          <li>Number of Children: ${bookingData.numberOfChildren}</li>
          ${[
            bookingData.guest2Name,
            bookingData.guest3Name,
            bookingData.guest4Name,
            bookingData.guest5Name
          ]
            .filter(Boolean)
            .map(name => `<li>${name}</li>`)
            .join('')}
        </ul>
      </li>
      ${bookingData.needParking ? `
      <li>Car Information:
        <ul>
          <li>Car Plate Number: ${bookingData.carPlateNumber}</li>
          <li>Car Brand & Model: ${bookingData.carBrandModel}</li>
          <li>Car Color: ${bookingData.carColor}</li>
        </ul>
      </li>
      ` : ''}
      ${bookingData.hasPets ? `
      <li>Pet Information:
        <ul>
          <li>Name: ${bookingData.petName}</li>
          <li>Breed: ${bookingData.petBreed}</li>
          <li>Age: ${bookingData.petAge}</li>
          <li>Last Vaccination: ${bookingData.petVaccinationDate}</li>
        </ul>
      </li>
      ` : ''}
    </ul>
  `

  await sesClient.send(new SendEmailCommand({
    Destination: {
      ToAddresses: [bookingData.guestEmail],
      CcAddresses: ['michaeldmanlulu@gmail.com', 'kamehome.azurenorth@gmail.com']
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailContent
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