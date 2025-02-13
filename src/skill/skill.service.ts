import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
   * @description Get all skills
   */
  async getSkills() {
    try {
      return await this.getAllOrderByPriority({
        title: true,
        title_en: true,
        description: true,
        description_en: true,
        stars: true,
        iconSrc: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching skills',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * INDEX
   * _
   * @description Get all skills with pagination, search, and filters
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
    try {
      // Search condition
      const searchCondition = search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
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
          description: true,
          description_en: true,
          stars: true,
          iconSrc: true,
          categoryId: true,
          category: true,
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
        'Error fetching paginated skills',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * SHOW
   * _
   * @description Get one skill
   */
  async getSkillById({ skillId }: { skillId: string }) {
    try {
      const skill = await this.getById(skillId, {
        id: true,
        title: true,
        description: true,
        stars: true,
        iconSrc: true,
        categoryId: true,
      });

      if (!skill) {
        throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
      }

      return skill;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error fetching skill', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * POST
   * _
   * @description Create a skill
   */
  async createSkill({ createSkillDto }: { createSkillDto: CreateSkillDto }) {
    try {
      const sanitizedData = {
        ...createSkillDto,
        stars: Number(createSkillDto.stars),
        priority: Number(createSkillDto.priority),
        masqued: Boolean(createSkillDto.masqued),
      };

      return await this.create(sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creating skill', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * PUT
   * _
   * @description Update a skill
   */
  async updateSkill({
    skillId,
    updateSkillDto,
  }: {
    skillId: string;
    updateSkillDto: UpdateSkillDto;
  }) {
    try {
      const sanitizedData: any = { ...updateSkillDto };

      if (updateSkillDto.stars !== undefined) {
        sanitizedData.stars = Number(updateSkillDto.stars);
      }
      if (updateSkillDto.priority !== undefined) {
        sanitizedData.priority = Number(updateSkillDto.priority);
      }
      if (updateSkillDto.masqued !== undefined) {
        sanitizedData.masqued = Boolean(updateSkillDto.masqued);
      }

      return await this.update(skillId, sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating skill', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * DELETE
   * _
   * @description Delete a skill ref
   */
  async deleteSkill({ skillId }: { skillId: string }) {
    try {
      return await this.delete(skillId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error deleting skill',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET
   * _
   * @description Find a skill by slug
   */
  async findBySlug(slug: string) {
    try {
      const skill = await this.findOne({ where: { slug } });

      if (!skill) {
        throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
      }

      return skill;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching skill',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
