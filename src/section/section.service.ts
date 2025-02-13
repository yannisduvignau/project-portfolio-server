import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateSectionDto } from './dto/update-section.dto';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionService extends BaseService<'section'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'section');
  }

  /**
   * INDEX
   * _
   * @description Get all section items
   */
  async getAllSections() {
    try {
      return await this.getAllOrderByPriority({
        label: true,
        label_en: true,
        link: true,
        className: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching sections',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * INDEX
   * _
   * @description Get all sections with pagination, search, and filters
   */
  async getSectionsPaginate({
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
      numberMin?: number;
      numberMax?: number;
    };
  }) {
    try {
      // Search condition
      const searchCondition = search
        ? {
            OR: [
              { label: { contains: search, mode: 'insensitive' } },
              { link: { contains: search, mode: 'insensitive' } },
              { className: { contains: search, mode: 'insensitive' } },
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
      if (filtersObject?.numberMin || filtersObject?.numberMax) {
        filtersCondition.number = {
          ...(filtersObject.numberMin && { gte: filtersObject.numberMin }),
          ...(filtersObject.numberMax && { lte: filtersObject.numberMax }),
        };
      }

      return await this.getAllPaginate(
        page,
        pageSize,
        {
          id: true,
          label: true,
          label_en: true,
          link: true,
          className: true,
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
        'Error fetching paginated sections',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description Create a section item
   */
  async createSection({
    createSectionDto,
  }: {
    createSectionDto: CreateSectionDto;
  }) {
    try {
      const sanitizedData = {
        ...createSectionDto,
        priority: Number(createSectionDto.priority),
        masqued: Boolean(createSectionDto.masqued),
      };

      return await this.create(sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creating section', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * PUT
   * _
   * @description Update a section item
   */
  async updateSection({
    itemId,
    updateSectionDto,
  }: {
    itemId: string;
    updateSectionDto: UpdateSectionDto;
  }) {
    try {
      const sanitizedData: any = { ...updateSectionDto };

      if (updateSectionDto.priority !== undefined) {
        sanitizedData.priority = Number(updateSectionDto.priority);
      }
      if (updateSectionDto.masqued !== undefined) {
        sanitizedData.masqued = Boolean(updateSectionDto.masqued);
      }

      return await this.update(itemId, sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating section', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * DELETE
   * _
   * @description Delete a section item
   */
  async deleteSection({ itemId }: { itemId: string }) {
    try {
      return await this.delete(itemId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error deleting section',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET
   * _
   * @description Find a section by slug
   */
  async findBySlug(slug: string) {
    try {
      const section = await this.findOne({ where: { slug } });

      if (!section) {
        throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
      }

      return section;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching section',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
