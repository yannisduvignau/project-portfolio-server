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
import { SectionService } from './section.service';
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
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@ApiTags('sections')
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  /**
   * INDEX
   * _
   * @description index all sections
   * @route GET /sections
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all sections' })
  @ApiResponse({ status: 200, description: 'Get all sections successfully' })
  @ApiNotFoundResponse({ description: 'No sections found' })
  async getSections() {
    return await this.sectionService.getAllSections();
  }

  /**
   * INDEX
   * _
   * @description index all sections with pagination
   * @route GET /sections/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all sections' })
  @ApiResponse({ status: 200, description: 'Get all sections successfully' })
  @ApiNotFoundResponse({ description: 'No sections found' })
  async getSectionsPaginate(
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
      return await this.sectionService.getSectionsPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
        filters: filters || {},
      });
    } catch (error) {
      console.error('Error fetching paginated sections:', error.message);
      throw new HttpException(
        'Erreur lors de la récupération des onglets de section',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description create a section
   * @route POST /sections
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a section' })
  @ApiCreatedResponse({
    description: 'The section has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createSection(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<Observable<CreateSectionDto>> {
    return this.sectionService.createSection({
      createSectionDto,
    });
  }

  /**
   * PUT
   * _
   * @description update a section
   * @route PUT /sections/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:itemId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a section' })
  @ApiCreatedResponse({
    description: 'The section has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateCategory(
    @Param('itemId') itemId: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<Observable<UpdateSectionDto>> {
    return this.sectionService.updateCategory({
      itemId,
      updateSectionDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a section
   * @route DELETE /sections/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:itemId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a section' })
  @ApiCreatedResponse({
    description: 'The section has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteCategory(@Param('itemId') itemId: string) {
    return this.sectionService.deleteCategory({ itemId });
  }
}
