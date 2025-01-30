import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/server/prisma/prisma.service';
import { cognitoClient } from '@/lib/aws-config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // Auth methods will go here
}