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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';

@ApiTags('navigations')
@Controller('navigations')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  /**
   * INDEX
   * _
   * @description index all navigations
   * @route GET /navigations
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all navigations' })
  @ApiResponse({ status: 200, description: 'Get all navigations successfully' })
  @ApiNotFoundResponse({ description: 'No navigations found' })
  async getNavigations() {
    return await this.navigationService.getAllNavigations();
  }

  /**
   * INDEX
   * _
   * @description index all navigations with pagination
   * @route GET /navigations/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all navigations' })
  @ApiResponse({ status: 200, description: 'Get all navigations successfully' })
  @ApiNotFoundResponse({ description: 'No navigations found' })
  async getNavigationsPaginate(
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
      return await this.navigationService.getNavigationsPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
        filters: filters || {},
      });
    } catch (error) {
      console.error('Error fetching paginated navigations:', error.message);
      throw new HttpException(
        'Erreur lors de la récupération des onglets de navigation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description create a navigation
   * @route POST /navigations
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a navigation' })
  @ApiCreatedResponse({
    description: 'The navigation has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createNavigation(
    @Body() createNavigationDto: CreateNavigationDto,
  ): Promise<Observable<CreateNavigationDto>> {
    return this.navigationService.createNavigation({
      createNavigationDto,
    });
  }

  /**
   * PUT
   * _
   * @description update a navigation
   * @route PUT /navigations/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:itemId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a navigation' })
  @ApiCreatedResponse({
    description: 'The navigation has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateCategory(
    @Param('itemId') itemId: string,
    @Body() updateNavigationDto: UpdateNavigationDto,
  ): Promise<Observable<UpdateNavigationDto>> {
    return this.navigationService.updateCategory({
      itemId,
      updateNavigationDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a navigation
   * @route DELETE /navigations/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:itemId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a navigation' })
  @ApiCreatedResponse({
    description: 'The navigation has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteCategory(@Param('itemId') itemId: string) {
    return this.navigationService.deleteCategory({ itemId });
  }
}
