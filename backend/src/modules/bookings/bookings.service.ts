import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private storageService: StorageService,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    // 1. Create booking in database
    const booking = await this.prisma.booking.create({
      data: {
        unitId: createBookingDto.unitId,
        guestId: createBookingDto.guestId,
        checkIn: new Date(createBookingDto.checkInDate + 'T' + createBookingDto.checkInTime),
        checkOut: new Date(createBookingDto.checkOutDate + 'T' + createBookingDto.checkOutTime),
        totalGuests: createBookingDto.numberOfAdults + createBookingDto.numberOfChildren,
        specialRequests: createBookingDto.guestSpecialRequests,
        status: 'PENDING',
      },
    });

    // 2. Generate and upload PDF
    const pdfBytes = await this.storageService.generateBookingPDF(createBookingDto);
    await this.storageService.uploadPDFToS3(pdfBytes, booking.id);

    // 3. Send confirmation email
    await this.emailService.sendBookingConfirmation(createBookingDto);

    return booking;
  }

  async getBookings() {
    return this.prisma.booking.findMany({
      include: {
        unit: true,
        guest: true,
      },
    });
  }

  async getBooking(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        unit: true,
        guest: true,
      },
    });
  }
}