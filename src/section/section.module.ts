import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SectionController],
  providers: [SectionService, PrismaService],
})
export class SectionModule {}
