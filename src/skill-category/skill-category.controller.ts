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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('skill-categories')
@Controller('skill-categories')
export class SkillCategoryController {
  constructor(private readonly categoryService: SkillCategoryService) {}

  /**
   * INDEX
   * _
   * @description index all categories
   * @route GET /skill-categories
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Get all categories successfully' })
  @ApiNotFoundResponse({ description: 'No categories found' })
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  /**
   * INDEX
   * _
   * @description index all categories with pagination
   * @route GET /skill-categories/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Get all categories successfully' })
  @ApiNotFoundResponse({ description: 'No categories found' })
  async getCategoriesPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('filters')
    filters?: {
      createdAt?: [Date, Date];
      numberMin?: number;
      numberMax?: number;
    },
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.categoryService.getCategoriesPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
        filters: filters || {},
      });
    } catch (error) {
      console.error('Error fetching paginated categories:', error.message);
      throw new HttpException(
        'Erreur lors de la récupération des catégories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description create a skill category
   * @route POST /skill-categories
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a category' })
  @ApiCreatedResponse({
    description: 'The category has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createCategory(
    @Body() createSkillCategoryDto: CreateSkillCategoryDto,
  ): Promise<Observable<CreateSkillCategoryDto>> {
    return await this.categoryService.createCategory({
      createSkillCategoryDto,
    });
  }

  /**
   * PUT
   * _
   * @description update a skill category
   * @route PUT /skill-categories/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:categoryId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category' })
  @ApiCreatedResponse({
    description: 'The category has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateSkillCategoryDto: UpdateSkillCategoryDto,
  ): Promise<Observable<UpdateSkillCategoryDto>> {
    return await this.categoryService.updateCategory({
      categoryId,
      updateSkillCategoryDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a skill category
   * @route DELETE /skill-categories/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:categoryId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category' })
  @ApiCreatedResponse({
    description: 'The category has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.categoryService.deleteCategory({ categoryId });
  }
}
