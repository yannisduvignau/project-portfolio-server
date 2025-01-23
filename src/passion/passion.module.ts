import { Module } from '@nestjs/common';
import { PassionController } from './passion.controller';
import { PassionService } from './passion.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PassionController],
  providers: [PassionService, PrismaService],
})
export class PassionModule {}
