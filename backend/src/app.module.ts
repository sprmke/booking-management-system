import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    BookingsModule,
    PropertiesModule,
    UsersModule,
  ],
})
export class AppModule {}