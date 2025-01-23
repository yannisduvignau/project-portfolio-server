import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SkillCategoryService } from './skill-category.service';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('skill-categories')
@Controller('skill-categories')
export class SkillCategoryController {
  constructor(private readonly categoryService: SkillCategoryService) {}

  /**
   * INDEX
   * _
   * @description index all categories
   * @road localhost:3000/skill-categories
   * @returns http resources
   */
  @Get()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  /**
   * INDEX
   * _
   * @description index all categories
   * @road localhost:3000/skill-categories
   * @returns http resources
   */
  @Get('/admin')
  async getAllCategoriesAdmin() {
    return await this.categoryService.getAllCategoriesAdmin();
  }

  /**
   * INDEX
   * _
   * @description index all categories with pagination
   * @route GET /skill-categories/paginate?page={page}
   * @returns http resources
   */
  @Get('/paginate')
  async getCategoriesPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.categoryService.getCategoriesPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '', // Recherche vide par défaut
      });
    } catch (error) {
      console.error('Error fetching paginated skills:', error.message);
      throw new HttpException(
        'Erreur lors de la récupération des compétences',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * SHOW
   * _
   * @description index one skill category (by ID)
   * @road localhost:3000/skill-categories/{id}
   * @returns http resources
   */
  // @Get('/:categoryId')
  // async getCategoryById(@Param('categoryId') categoryId: string) {
  //   return await this.categoryService.getCategoryById({ categoryId });
  // }

  /**
   * POST
   * _
   * @description create a skill category
   * @road localhost:3000/skill-categories
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Body() createSkillCategoryDto: CreateSkillCategoryDto) {
    return await this.categoryService.createCategory({
      createSkillCategoryDto,
    });
  }

  /**
   * PUT
   * _
   * @description update a skill category
   * @road localhost:3000/skill-categories/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateSkillCategoryDto: UpdateSkillCategoryDto,
  ) {
    return await this.categoryService.updateCategory({
      categoryId,
      updateSkillCategoryDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a skill category
   * @road localhost:3000/skill-categories/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.categoryService.deleteCategory({ categoryId });
  }
}
