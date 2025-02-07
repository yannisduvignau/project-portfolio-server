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
    return await this.getAllOrderByPriority({
      date: true,
      date_en: true,
      title: true,
      title_en: true,
      location: true,
      location_en: true,
      description: true,
      description_en: true,
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
    };
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
        date_en: true,
        title: true,
        title_en: true,
        location: true,
        location_en: true,
        description: true,
        description_en: true,
        priority: true,
        slug: true,
        masqued: true,
        createdAt: true,
      },
      {
        AND: [searchCondition, filtersCondition].filter(
          (condition) => Object.keys(condition).length > 0,
        ),
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
    const sanitizedData = {
      ...createExperienceDto,
      priority: Number(createExperienceDto.priority),
    };
    return await this.create(sanitizedData);
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
    let sanitizedData = updateExperienceDto;
    if (updateExperienceDto.priority) {
      sanitizedData = {
        ...updateExperienceDto,
        priority: Number(updateExperienceDto.priority),
      };
    }
    return await this.update(experienceId, sanitizedData);
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
