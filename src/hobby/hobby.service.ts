import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { CreateHobbyDto } from './dto/create-hobby.dto';

@Injectable()
export class HobbyService extends BaseService<'hobby'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'hobby');
  }

  /**
   * INDEX
   * _
   * @description Get all hobbies
   */
  async getHobbies() {
    try {
      return await this.getAll({
        title: true,
        title_en: true,
        emoji: true,
        top: true,
        left: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching hobbies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * INDEX
   * _
   * @description Get hobbies with pagination, search, and filters
   */
  async getHobbiesPaginate({
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
              { title: { contains: search, mode: 'insensitive' } },
              { emoji: { contains: search, mode: 'insensitive' } },
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
          title: true,
          title_en: true,
          emoji: true,
          top: true,
          left: true,
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
        'Error fetching paginated hobbies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description Create a hobby
   */
  async createHobby({ createHobbyDto }: { createHobbyDto: CreateHobbyDto }) {
    try {
      return await this.create(createHobbyDto);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creating hobby', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * PUT
   * _
   * @description Update a hobby
   */
  async updateHobby({
    hobbyId,
    updateHobbyDto,
  }: {
    hobbyId: string;
    updateHobbyDto: UpdateHobbyDto;
  }) {
    try {
      return await this.update(hobbyId, updateHobbyDto);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating hobby', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * DELETE
   * _
   * @description Delete a hobby
   */
  async deleteHobby({ hobbyId }: { hobbyId: string }) {
    try {
      return await this.delete(hobbyId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error deleting hobby',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET
   * _
   * @description Find a hobby by slug
   */
  async findBySlug(slug: string) {
    try {
      return await this.findOne({ where: { slug } });
    } catch (error) {
      console.log(error);
      throw new HttpException('Hobby not found', HttpStatus.NOT_FOUND);
    }
  }
}
