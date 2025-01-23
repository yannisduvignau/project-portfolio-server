import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { UpdatePassionDto } from './dto/update-passion.dto';
import { CreatePassionDto } from './dto/create-passion.dto';

@Injectable()
export class PassionService extends BaseService<'passion'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'passion');
  }

  /**
   * INDEX
   * _
   * @description get all passions
   */
  async getPassions() {
    return await this.getAll({
      id: true,
      titre: true,
      emoji: true,
      top: true,
      left: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all passions
   */
  async getPassionsAdmin() {
    return await this.getAll({
      id: true,
      titre: true,
      emoji: true,
      top: true,
      left: true,
      createdAt: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all passions
   */
  async getPassionsPaginate({
    page,
    pageSize,
    search,
  }: {
    page: number;
    pageSize: number;
    search: string;
  }) {
    const searchCondition = search
      ? {
          OR: [
            { titre: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { emoji: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
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
        createdAt: true,
      },
      searchCondition,
    );
  }

  /**
   * SHOW
   * _
   * @description get one passion
   */
  async getPassionByID({ passionId }: { passionId: string }) {
    return await this.getById(passionId, {
      id: true,
      titre: true,
      emoji: true,
      top: true,
      left: true,
    });
  }

  /**
   * POST
   * _
   * @description create a passion
   */
  async createPassion({
    createPassionDto,
  }: {
    createPassionDto: CreatePassionDto;
  }) {
    return await this.create(createPassionDto);
  }

  /**
   * PUT
   * _
   * @description update a passion
   */
  async updatePassion({
    passionId,
    updatePassionDto,
  }: {
    passionId: string;
    updatePassionDto: UpdatePassionDto;
  }) {
    return await this.update(passionId, updatePassionDto);
  }

  /**
   * DELETE
   * _
   * @description delete a passion
   */
  async deletePassion({ passionId }: { passionId: string }) {
    return await this.delete(passionId);
  }
}
