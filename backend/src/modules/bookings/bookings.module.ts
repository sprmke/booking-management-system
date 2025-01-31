import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmailModule } from '../email/email.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [PrismaModule, EmailModule, StorageModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}