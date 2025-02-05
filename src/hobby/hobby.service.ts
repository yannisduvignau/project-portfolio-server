import { Injectable } from '@nestjs/common';
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
   * @description get all hobbies
   */
  async getHobbies() {
    return await this.getAll({
      id: true,
      titre: true,
      emoji: true,
      top: true,
      left: true,
      masqued: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all hobbies
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
    const searchCondition = search
      ? {
          OR: [
            { titre: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { emoji: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
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
        titre: true,
        emoji: true,
        top: true,
        left: true,
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
   * @description create a hobby
   */
  async createHobby({ createHobbyDto }: { createHobbyDto: CreateHobbyDto }) {
    return await this.create(createHobbyDto);
  }

  /**
   * PUT
   * _
   * @description update a hobby
   */
  async updateHobby({
    hobbyId,
    updateHobbyDto,
  }: {
    hobbyId: string;
    updateHobbyDto: UpdateHobbyDto;
  }) {
    return await this.update(hobbyId, updateHobbyDto);
  }

  /**
   * DELETE
   * _
   * @description delete a hobby
   */
  async deleteHobby({ hobbyId }: { hobbyId: string }) {
    return await this.delete(hobbyId);
  }
}
