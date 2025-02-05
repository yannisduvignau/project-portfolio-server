import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateNavigationDto } from './dto/update-navigation.dto';
import { CreateNavigationDto } from './dto/create-navigation.dto';

@Injectable()
export class NavigationService extends BaseService<'navigation'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'navigation');
  }

  /**
   * INDEX
   * _
   * @description get all navigation items
   */
  async getAllNavigations() {
    return await this.getAll({
      id: true,
      label: true,
      link: true,
      className: true,
      priority: true,
      masqued: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all navigations with pagination, search, and filters
   */
  async getNavigationsPaginate({
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
        link: true,
        className: true,
        priority: true,
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
   * @description create an item for navigation
   */
  async createNavigation({
    createNavigationDto,
  }: {
    createNavigationDto: CreateNavigationDto;
  }) {
    const sanitizedData = {
      ...createNavigationDto,
      priority: Number(createNavigationDto.priority),
    };
    return await this.create(sanitizedData);
  }

  /**
   * PUT
   * _
   * @description update an item for navigation
   */
  async updateCategory({
    itemId,
    updateNavigationDto,
  }: {
    itemId: string;
    updateNavigationDto: UpdateNavigationDto;
  }) {
    let sanitizedData = updateNavigationDto;
    if (updateNavigationDto.priority) {
      sanitizedData = {
        ...updateNavigationDto,
        priority: Number(updateNavigationDto.priority),
      };
    }
    return await this.update(itemId, sanitizedData);
  }

  /**
   * DELETE
   * _
   * @description delete an item for navigation
   */
  async deleteCategory({ itemId }: { itemId: string }) {
    return await this.delete(itemId);
  }
}
