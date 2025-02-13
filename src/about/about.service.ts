import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
   * @description Get all abouts
   */
  async getAbouts() {
    try {
      return await this.getAllOrderByPriority({
        label: true,
        label_en: true,
        number: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching abouts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
    search?: string;
    filters?: {
      createdAt?: [Date, Date];
      numberMin?: number;
      numberMax?: number;
    };
  }) {
    try {
      // Build search condition
      const searchCondition = search
        ? { label: { contains: search, mode: 'insensitive' } }
        : {};

      // Parse filters if needed
      const filtersObject =
        typeof filters === 'string' ? JSON.parse(filters) : filters;

      // Build filters condition
      const filtersCondition: any = {};
      if (filtersObject) {
        if (filtersObject.createdAt) {
          filtersCondition.createdAt = {
            gte: filtersObject.createdAt[0],
            lte: filtersObject.createdAt[1],
          };
        }
        if (filtersObject.numberMin || filtersObject.numberMax) {
          filtersCondition.number = {
            ...(filtersObject.numberMin && { gte: filtersObject.numberMin }),
            ...(filtersObject.numberMax && { lte: filtersObject.numberMax }),
          };
        }
      }

      return await this.getAllPaginate(
        page,
        pageSize,
        {
          id: true,
          label: true,
          label_en: true,
          number: true,
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
        'Error fetching paginated abouts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description Create an about ref
   */
  async createAbout({ createAboutDto }: { createAboutDto: CreateAboutDto }) {
    try {
      const sanitizedData = {
        ...createAboutDto,
        priority: Number(createAboutDto.priority),
      };
      return await this.create(sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creating about', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * PUT
   * _
   * @description Update an about ref
   */
  async updateAbout({
    aboutId,
    updateAboutDto,
  }: {
    aboutId: string;
    updateAboutDto: UpdateAboutDto;
  }) {
    try {
      const sanitizedData = updateAboutDto.priority
        ? { ...updateAboutDto, priority: Number(updateAboutDto.priority) }
        : updateAboutDto;

      return await this.update(aboutId, sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating about', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * DELETE
   * _
   * @description Delete an about ref
   */
  async deleteAbout({ aboutId }: { aboutId: string }) {
    try {
      return await this.delete(aboutId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error deleting about',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET
   * _
   * @description Find an about by slug
   */
  async findBySlug(slug: string) {
    try {
      return await this.findOne({ where: { slug } });
    } catch (error) {
      console.log(error);
      throw new HttpException('About not found', HttpStatus.NOT_FOUND);
    }
  }
}
