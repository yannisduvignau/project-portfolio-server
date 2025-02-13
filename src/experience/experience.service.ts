import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
   * @description Get all experiences
   */
  async getExperiences() {
    try {
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
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching experiences',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * INDEX
   * _
   * @description Get all experiences with pagination, search, and filters
   */
  async getExperiencesPaginate({
    page,
    pageSize,
    search,
    filters,
  }: {
    page: number;
    pageSize: number;
    search?: string;
    filters?: {
      createdAt?: [Date, Date];
    };
  }) {
    try {
      // Search condition
      const searchCondition = search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { date: { contains: search, mode: 'insensitive' } },
              { location: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {};

      // Parse filters if needed
      const filtersObject =
        typeof filters === 'string' ? JSON.parse(filters) : filters;

      // Build filters condition
      const filtersCondition: any = {};
      if (filtersObject?.createdAt) {
        filtersCondition.createdAt = {
          gte: filtersObject.createdAt[0],
          lte: filtersObject.createdAt[1],
        };
      }

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
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching paginated experiences',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description Create an experience
   */
  async createExperience({
    createExperienceDto,
  }: {
    createExperienceDto: CreateExperienceDto;
  }) {
    try {
      const sanitizedData = {
        ...createExperienceDto,
        priority: Number(createExperienceDto.priority),
      };
      return await this.create(sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating experience',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * PUT
   * _
   * @description Update an experience
   */
  async updateExperience({
    experienceId,
    updateExperienceDto,
  }: {
    experienceId: string;
    updateExperienceDto: UpdateExperienceDto;
  }) {
    try {
      const sanitizedData = updateExperienceDto.priority
        ? {
            ...updateExperienceDto,
            priority: Number(updateExperienceDto.priority),
          }
        : updateExperienceDto;

      return await this.update(experienceId, sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error updating experience',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * DELETE
   * _
   * @description Delete an experience
   */
  async deleteExperience({ experienceId }: { experienceId: string }) {
    try {
      return await this.delete(experienceId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error deleting experience',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET
   * _
   * @description Find an experience by slug
   */
  async findBySlug(slug: string) {
    try {
      return await this.findOne({ where: { slug } });
    } catch (error) {
      console.log(error);
      throw new HttpException('Experience not found', HttpStatus.NOT_FOUND);
    }
  }
}
