import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';

@Injectable()
export class ExperienceService extends BaseService<'experience'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'experience');
  }

  /**
   * INDEX
   * _
   * @description get all experiences
   */
  async getExperiences() {
    return await this.getAll({
      id: true,
      date: true,
      title: true,
      location: true,
      description: true,
      priority: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all experiences
   */
  async getExperiencesPaginate({
    page,
    pageSize,
    search,
    filters,
  }: {
    page: number;
    pageSize: number;
    search: string;
    filters?: {
      createdAt?: [Date, Date];
    }; // Refined filters type
  }) {
    const searchCondition = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { date: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
            { location: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
            { description: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
        }
      : {};

    const filtersObject =
      typeof filters === 'string' ? JSON.parse(filters) : filters;

    // Build filters condition
    const filtersCondition = filtersObject
      ? {
          AND: [
            filtersObject.createdAt
              ? {
                  createdAt: {
                    gte: filtersObject.createdAt[0], // Greater than or equal to start date
                    lte: filtersObject.createdAt[1], // Less than or equal to end date
                  },
                }
              : null,
          ].filter(Boolean),
          //.filter((condition) => Object.keys(condition).length > 0), // Remove empty conditions
        }
      : {};

    return await this.getAllPaginate(
      page,
      pageSize,
      {
        id: true,
        date: true,
        title: true,
        location: true,
        description: true,
        priority: true,
        createdAt: true,
      },
      {
        AND: [searchCondition, filtersCondition].filter(
          (condition) => Object.keys(condition).length > 0,
        ), // Combine conditions
      },
    );
  }

  /**
   * POST
   * _
   * @description create an experience
   */
  async createExperience({
    createExperienceDto,
  }: {
    createExperienceDto: CreateExperienceDto;
  }) {
    return await this.create(createExperienceDto);
  }

  /**
   * PUT
   * _
   * @description update an experience
   */
  async updateExperience({
    experienceId,
    updateExperienceDto,
  }: {
    experienceId: string;
    updateExperienceDto: UpdateExperienceDto;
  }) {
    return await this.update(experienceId, updateExperienceDto);
  }

  /**
   * DELETE
   * _
   * @description delete an experience ref
   */
  async deleteExperience({ experienceId }: { experienceId: string }) {
    return await this.delete(experienceId);
  }
}
