import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AboutController],
  providers: [AboutService, PrismaService],
})
export class AboutModule {}
