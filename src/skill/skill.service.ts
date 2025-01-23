import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillService extends BaseService<'skill'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'skill');
  }

  /**
   * INDEX
   * _
   * @description get all skills
   */
  async getSkills() {
    return await this.getAll({
      id: true,
      label: true,
      description: true,
      stars: true,
      iconSrc: true,
      categoryId: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all skills
   */
  async getSkillsAdmin() {
    return await this.getAll({
      id: true,
      label: true,
      description: true,
      stars: true,
      iconSrc: true,
      categoryId: true,
      category: true,
      createdAt: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all skills
   */
  async getSkillsPaginate({
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
            { label: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { description: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
        }
      : {};

    return await this.getAllPaginate(
      page,
      pageSize,
      {
        id: true,
        label: true,
        description: true,
        stars: true,
        iconSrc: true,
        categoryId: true,
        category: true,
        createdAt: true,
      },
      searchCondition,
    );
  }

  /**
   * SHOW
   * _
   * @description get one skill
   */
  async getSkillById({ skillId }: { skillId: string }) {
    return await this.getById(skillId, {
      id: true,
      label: true,
      description: true,
      stars: true,
      iconSrc: true,
      categoryId: true,
    });
  }

  /**
   * POST
   * _
   * @description create a skill
   */
  async createSkill({ createSkillDto }: { createSkillDto: CreateSkillDto }) {
    // Convertir explicitement la notation en un entier
    const sanitizedData = {
      ...createSkillDto,
      stars: Number(createSkillDto.stars), // Conversion forcée en entier
    };
    return await this.create(sanitizedData);
  }

  /**
   * PUT
   * _
   * @description update a skill
   */
  async updateSkill({
    skillId,
    updateSkillDto,
  }: {
    skillId: string;
    updateSkillDto: UpdateSkillDto;
  }) {
    let sanitizedData = updateSkillDto;
    if (updateSkillDto.stars) {
      sanitizedData = {
        ...updateSkillDto,
        stars: Number(updateSkillDto.stars), // Conversion forcée en entier
      };
    }
    return await this.update(skillId, sanitizedData);
  }

  /**
   * DELETE
   * _
   * @description delete a skill ref
   */
  async deleteSkill({ skillId }: { skillId: string }) {
    return await this.delete(skillId);
  }
}
