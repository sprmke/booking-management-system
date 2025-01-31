import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/server/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  // Booking methods will go here
}