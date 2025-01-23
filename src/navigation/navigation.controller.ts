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
import { NavigationService } from './navigation.service';
import { CreateItemNavigationDto } from './dto/create-item-navigation.dto';
import { UpdateItemNavigationDto } from './dto/update-item-navigation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('item-navigations')
@Controller('item-navigations')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  /**
   * INDEX
   * @road localhost:3000/item-navigations
   * @returns http resources
   */
  @Get()
  async getNavigations() {
    return await this.navigationService.getAllNavigations();
  }

  /**
   * INDEX
   * @road localhost:3000/item-navigations
   * @returns http resources
   */
  @Get('/admin')
  async getNavigationsAdmin() {
    return await this.navigationService.getAllNavigationsAdmin();
  }

  /**
   * INDEX
   * _
   * @description index all item-navigations with pagination
   * @route GET /item-navigations/paginate?page={page}
   * @returns http resources
   */
  @Get('/paginate')
  async getNavigationsPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.navigationService.getNavigationsPaginate({
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
   * @road localhost:3000/item-navigations/{id}
   * @returns http resources
   */
  @Get('/:navigationId')
  async getNavigationById(@Param('navigationId') itemId: string) {
    return await this.navigationService.getNavigationById({ itemId });
  }

  /**
   * POST
   * @road localhost:3000/item-navigations
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async createItemNavigation(
    @Body() createItemNavigationDto: CreateItemNavigationDto,
  ) {
    return this.navigationService.createItemNavigation({
      createItemNavigationDto,
    });
  }

  /**
   * PUT
   * @road localhost:3000/item-navigations/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:itemId')
  async updateCategory(
    @Param('itemId') itemId: string,
    @Body() updateItemNavigationDto: UpdateItemNavigationDto,
  ) {
    return this.navigationService.updateCategory({
      itemId,
      updateItemNavigationDto,
    });
  }

  /**
   * DELETE
   * @road localhost:3000/item-navigations/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:itemId')
  async deleteCategory(@Param('itemId') itemId: string) {
    return this.navigationService.deleteCategory({ itemId });
  }
}
