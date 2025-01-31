import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { CreateBookingDto } from '../bookings/dto/create-booking.dto';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
    });
  }

  async generateBookingPDF(bookingData: CreateBookingDto) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText('Booking Confirmation', {
      x: 50,
      y: height - 50,
      size: 20,
      font,
    });

    const guestInfo = [
      `Primary Guest: ${bookingData.primaryGuestName}`,
      `Email: ${bookingData.guestEmail}`,
      `Phone: ${bookingData.guestPhoneNumber}`,
      `Check-in: ${bookingData.checkInDate} at ${bookingData.checkInTime}`,
      `Check-out: ${bookingData.checkOutDate} at ${bookingData.checkOutTime}`,
    ];

    guestInfo.forEach((text, index) => {
      page.drawText(text, {
        x: 50,
        y: height - 100 - (index * 25),
        size: 12,
        font,
      });
    });

    return await pdfDoc.save();
  }

  async uploadPDFToS3(pdfBytes: Uint8Array, bookingId: string) {
    const pdfKey = `bookings/${bookingId}/confirmation.pdf`;

    await this.s3Client.send(new PutObjectCommand({
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: pdfKey,
      Body: pdfBytes,
      ContentType: 'application/pdf',
    }));

    return pdfKey;
  }
}