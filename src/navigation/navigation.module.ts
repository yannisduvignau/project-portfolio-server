import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [NavigationController],
  providers: [NavigationService, PrismaService],
})
export class NavigationModule {}
