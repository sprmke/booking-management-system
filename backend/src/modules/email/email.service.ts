import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import { CreateBookingDto } from '../bookings/dto/create-booking.dto';

@Injectable()
export class EmailService {
  private readonly sesClient: SESClient;

  constructor(private configService: ConfigService) {
    this.sesClient = new SESClient({
      region: this.configService.get('AWS_REGION'),
    });
  }

  async sendBookingConfirmation(bookingData: CreateBookingDto) {
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
            <li>Guest Email: ${bookingData.guestEmail}</li>
            <li>Guest Phone Number: ${bookingData.guestPhoneNumber}</li>
            <li>Number of Adults: ${bookingData.numberOfAdults}</li>
            <li>Number of Children: ${bookingData.numberOfChildren}</li>
          </ul>
        </li>
      </ul>
    `;

    await this.sesClient.send(new SendEmailCommand({
      Destination: {
        ToAddresses: [bookingData.guestEmail],
        CcAddresses: ['michaeldmanlulu@gmail.com', 'kamehome.azurenorth@gmail.com'],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailContent,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Your Booking Confirmation',
        },
      },
      Source: this.configService.get('SES_FROM_EMAIL'),
    }));
  }
}