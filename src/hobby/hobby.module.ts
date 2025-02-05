import { Module } from '@nestjs/common';
import { HobbyController } from './hobby.controller';
import { HobbyService } from './hobby.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HobbyController],
  providers: [HobbyService, PrismaService],
})
export class HobbyModule {}
