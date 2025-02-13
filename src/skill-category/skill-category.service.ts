import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'src/base.service';
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
   * @description Get all skill categories
   */
  async getAllCategories() {
    try {
      return await this.getAllOrderByPriority({
        title: true,
        title_en: true,
        skills: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching skill categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * INDEX
   * _
   * @description Get all categories with pagination, search, and filters
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
    try {
      const searchCondition = search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } }, // Search by title (case insensitive)
            ],
          }
        : {};

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
          skills: true,
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
        'Error fetching paginated categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description Create a skill category
   */
  async createCategory({
    createSkillCategoryDto,
  }: {
    createSkillCategoryDto: CreateSkillCategoryDto;
  }) {
    try {
      const sanitizedData = {
        ...createSkillCategoryDto,
        priority: Number(createSkillCategoryDto.priority),
        masqued: Boolean(createSkillCategoryDto.masqued),
      };

      return await this.create(sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating skill category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * PUT
   * _
   * @description Update a skill category
   */
  async updateCategory({
    categoryId,
    updateSkillCategoryDto,
  }: {
    categoryId: string;
    updateSkillCategoryDto: UpdateSkillCategoryDto;
  }) {
    try {
      const sanitizedData: any = { ...updateSkillCategoryDto };

      if (updateSkillCategoryDto.priority !== undefined) {
        sanitizedData.priority = Number(updateSkillCategoryDto.priority);
      }
      if (updateSkillCategoryDto.masqued !== undefined) {
        sanitizedData.masqued = Boolean(updateSkillCategoryDto.masqued);
      }
      return await this.update(categoryId, sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error updating skill category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * DELETE
   * _
   * @description Delete a skill category
   */
  async deleteCategory({ categoryId }: { categoryId: string }) {
    try {
      return await this.delete(categoryId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error deleting skill category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET
   * _
   * @description Find a category by slug
   */
  async findBySlug(slug: string) {
    try {
      const category = await this.findOne({ where: { slug } });

      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
