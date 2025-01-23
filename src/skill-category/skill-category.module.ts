import { Module } from '@nestjs/common';
import { SkillCategoryController } from './skill-category.controller';
import { SkillCategoryService } from './skill-category.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SkillCategoryController],
  providers: [SkillCategoryService, PrismaService],
})
export class SkillCategoryModule {}
