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
      priority: true,
      masqued: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all skills with pagination, search, and filters
   */
  async getSkillsPaginate({
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
            { description: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
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
        description: true,
        stars: true,
        iconSrc: true,
        categoryId: true,
        category: true,
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
    const sanitizedData = {
      ...createSkillDto,
      stars: Number(createSkillDto.stars),
      priority: Number(createSkillDto.priority),
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
    const sanitizedData = { ...updateSkillDto };

    if (updateSkillDto.stars !== undefined) {
      sanitizedData.stars = Number(updateSkillDto.stars);
    }
    if (updateSkillDto.priority !== undefined) {
      sanitizedData.priority = Number(updateSkillDto.priority);
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
