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
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
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

@ApiTags('abouts')
@Controller('abouts')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  /**
   * INDEX
   * _
   * @description index all abouts ref
   * @route GET /abouts
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all abouts' })
  @ApiResponse({ status: 200, description: 'Get all abouts successfully' })
  @ApiNotFoundResponse({ description: 'No abouts found' })
  async getAbouts() {
    return await this.aboutService.getAbouts();
  }

  /**
   * INDEX
   * _
   * @description index all abouts with pagination
   * @route GET /abouts/paginate?page={page}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all abouts' })
  @ApiResponse({ status: 200, description: 'Get all abouts successfully' })
  @ApiNotFoundResponse({ description: 'No abouts found' })
  async getAboutsPaginate(
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
      return await this.aboutService.getAboutsPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '', // Recherche vide par défaut
        filters: filters || {}, // Recherche vide par défaut
      });
    } catch (error) {
      console.error('Error fetching paginated abouts:', error.message);
      throw new HttpException(
        'Erreur lors de la récupération des à propos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description create an about ref
   * @route GET /abouts
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an about' })
  @ApiCreatedResponse({
    description: 'The about has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createAbout(
    @Body() createAboutDto: CreateAboutDto,
  ): Promise<Observable<CreateAboutDto>> {
    return this.aboutService.createAbout({ createAboutDto });
  }

  /**
   * PUT
   * _
   * @description update an about ref
   * @route GET /abouts/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:aboutId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an about' })
  @ApiCreatedResponse({
    description: 'The about has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateAbout(
    @Param('aboutId') aboutId: string,
    @Body() updateAboutDto: UpdateAboutDto,
  ): Promise<Observable<UpdateAboutDto>> {
    return await this.aboutService.updateAbout({ aboutId, updateAboutDto });
  }

  /**
   * DELETE
   * _
   * @description delete an about ref
   * @route GET /abouts/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:aboutId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an about' })
  @ApiCreatedResponse({
    description: 'The about has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteAbout(@Param('aboutId') aboutId: string) {
    return await this.aboutService.deleteAbout({ aboutId });
  }
}
