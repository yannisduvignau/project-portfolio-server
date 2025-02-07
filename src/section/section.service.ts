import { Injectable } from '@nestjs/common';
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
   * @description get all section items
   */
  async getAllSections() {
    return await this.getAllOrderByPriority({
      label: true,
      label_en: true,
      link: true,
      className: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all sections with pagination, search, and filters
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
    const searchCondition = search
      ? {
          OR: [
            { label: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { link: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
            { className: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
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
            filtersObject.numberMin || filtersObject.numberMax
              ? {
                  number: {
                    ...(filtersObject.numberMin && {
                      gte: filtersObject.numberMin,
                    }),
                    ...(filtersObject.numberMax && {
                      lte: filtersObject.numberMax,
                    }),
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
  }

  /**
   * POST
   * _
   * @description create an item for section
   */
  async createSection({
    createSectionDto,
  }: {
    createSectionDto: CreateSectionDto;
  }) {
    const sanitizedData = {
      ...createSectionDto,
      priority: Number(createSectionDto.priority),
      masqued: Boolean(createSectionDto.masqued),
    };
    return await this.create(sanitizedData);
  }

  /**
   * PUT
   * _
   * @description update an item for section
   */
  async updateCategory({
    itemId,
    updateSectionDto,
  }: {
    itemId: string;
    updateSectionDto: UpdateSectionDto;
  }) {
    let sanitizedData = updateSectionDto;
    if (updateSectionDto.priority) {
      sanitizedData = {
        ...sanitizedData,
        priority: Number(sanitizedData.priority),
      };
    }
    if (updateSectionDto.masqued) {
      sanitizedData = {
        ...sanitizedData,
        masqued: Boolean(sanitizedData.masqued),
      };
    }
    return await this.update(itemId, sanitizedData);
  }

  /**
   * DELETE
   * _
   * @description delete an item for section
   */
  async deleteCategory({ itemId }: { itemId: string }) {
    return await this.delete(itemId);
  }
}
