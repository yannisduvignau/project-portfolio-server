import { BaseService } from 'src/base.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';

@Injectable()
export class SkillCategoryService extends BaseService<'skillCategory'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'skillCategory');
  }

  /**
   * INDEX
   * _
   * @description get all skill categories
   */
  async getAllCategories() {
    return await this.getAllOrderByPriority({
      id: true,
      intitule: true,
      priority: true,
      masqued: true,
      skills: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all categories with pagination, search, and filters
   */
  async getCategoriesPaginate({
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
            { intitule: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
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
        intitule: true,
        skills: true,
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
   * @description create a skill category
   */
  async createCategory({
    createSkillCategoryDto,
  }: {
    createSkillCategoryDto: CreateSkillCategoryDto;
  }) {
    const sanitizedData = {
      ...createSkillCategoryDto,
      priority: Number(createSkillCategoryDto.priority),
    };
    return await this.create(sanitizedData);
  }

  /**
   * PUT
   * _
   * @description update an about ref
   */
  async updateCategory({
    categoryId,
    updateSkillCategoryDto,
  }: {
    categoryId: string;
    updateSkillCategoryDto: UpdateSkillCategoryDto;
  }) {
    let sanitizedData = updateSkillCategoryDto;
    if (updateSkillCategoryDto.priority) {
      sanitizedData = {
        ...updateSkillCategoryDto,
        priority: Number(updateSkillCategoryDto.priority),
      };
    }
    return await this.update(categoryId, sanitizedData);
  }

  /**
   * DELETE
   * _
   * @description delete a skill category
   */
  async deleteCategory({ categoryId }: { categoryId: string }) {
    return await this.delete(categoryId);
  }
}
