import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { BaseService } from 'src/base.service';

@Injectable()
export class AboutService extends BaseService<'about'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'about');
  }

  /**
   * INDEX
   * _
   * @description get all abouts ref
   */
  async getAbouts() {
    return await this.getAll({
      id: true,
      label: true,
      number: true,
      priority: true,
    });
  }

  async getAboutsAdmin() {
    return await this.getAll({
      id: true,
      label: true,
      number: true,
      priority: true,
      createdAt: true,
    });
  }

  /**
   * INDEX
   * _
   * @description Get all abouts with pagination, search, and filters
   */
  async getAboutsPaginate({
    page,
    pageSize,
    search,
    filters,
  }: {
    page: number;
    pageSize: number;
    search?: string; // Made optional
    filters?: {
      createdAt?: [Date, Date];
      numberMin?: number;
      numberMax?: number;
    }; // Refined filters type
  }) {
    // Build search condition
    const searchCondition = search
      ? {
          OR: [
            { label: { contains: search, mode: 'insensitive' } }, // Search by label (case-insensitive)
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
        number: true,
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
   * SHOW
   * _
   * @description get one about ref (by ID)
   */
  async getAboutByID({ aboutId }: { aboutId: string }) {
    return await this.getById(aboutId, {
      id: true,
      label: true,
      number: true,
    });
  }

  /**
   * POST
   * _
   * @description create an about ref
   */
  async createAbout({ createAboutDto }: { createAboutDto: CreateAboutDto }) {
    const sanitizedData = {
      ...createAboutDto,
      priority: Number(createAboutDto.priority), // Conversion forcée en entier
    };
    return await this.create(sanitizedData);
  }

  /**
   * PUT
   * _
   * @description update an about ref
   */
  async updateAbout({
    aboutId,
    updateAboutDto,
  }: {
    aboutId: string;
    updateAboutDto: UpdateAboutDto;
  }) {
    let sanitizedData = updateAboutDto;
    if (updateAboutDto.priority) {
      sanitizedData = {
        ...updateAboutDto,
        priority: Number(updateAboutDto.priority), // Conversion forcée en entier
      };
    }
    return await this.update(aboutId, sanitizedData);
  }

  /**
   * DELETE
   * _
   * @description delete an about ref
   */
  async deleteAbout({ aboutId }: { aboutId: string }) {
    return await this.delete(aboutId);
  }
}
