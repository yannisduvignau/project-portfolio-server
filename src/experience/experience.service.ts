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
    return await this.getAll({
      id: true,
      date: true,
      titre: true,
      localisation: true,
      description: true,
      priority: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all experiences
   */
  async getExperiencesAdmin() {
    return await this.getAll({
      id: true,
      date: true,
      titre: true,
      localisation: true,
      description: true,
      priority: true,
      createdAt: true,
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
  }: {
    page: number;
    pageSize: number;
    search: string;
  }) {
    const searchCondition = search
      ? {
          OR: [
            { titre: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { date: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
            { localisation: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
            { description: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
        }
      : {};
    return await this.getAllPaginate(
      page,
      pageSize,
      {
        id: true,
        date: true,
        titre: true,
        localisation: true,
        description: true,
        priority: true,
        createdAt: true,
      },
      searchCondition,
    );
  }

  /**
   * SHOW
   * _
   * @description get one experience
   */
  async getExperienceByID({ experienceId }: { experienceId: string }) {
    return await this.getById(experienceId, {
      id: true,
      date: true,
      titre: true,
      localisation: true,
      description: true,
    });
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
    return await this.create(createExperienceDto);
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
    return await this.update(experienceId, updateExperienceDto);
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
