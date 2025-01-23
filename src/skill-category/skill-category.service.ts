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
      skills: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all skill categories
   */
  async getAllCategoriesAdmin() {
    return await this.getAll({
      id: true,
      intitule: true,
      skills: true,
      priority: true,
      createdAt: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all categories
   */
  async getCategoriesPaginate({
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
            { intitule: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
          ],
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
        createdAt: true,
      },
      searchCondition,
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
    return await this.create(createSkillCategoryDto);
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
    return await this.update(categoryId, updateSkillCategoryDto);
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
