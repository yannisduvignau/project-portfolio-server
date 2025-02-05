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
import { ExperienceService } from './experience.service';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
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

@ApiTags('experiences')
@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  /**
   * INDEX
   * _
   * @description index all experiences
   * @route GET /experiences
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all experiences' })
  @ApiResponse({ status: 200, description: 'Get all experiences successfully' })
  @ApiNotFoundResponse({ description: 'No experiences found' })
  async getExperiences() {
    return await this.experienceService.getExperiences();
  }

  /**
   * INDEX
   * _
   * @description index all experiences with pagination
   * @route GET /experiences/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all experiences' })
  @ApiResponse({ status: 200, description: 'Get all experiences successfully' })
  @ApiNotFoundResponse({ description: 'No experiences found' })
  async getExperiencesPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('filters')
    filters?: {
      createdAt?: [Date, Date];
    },
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.experienceService.getExperiencesPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
        filters: filters || {},
      });
    } catch (error) {
      console.error('Error fetching paginated experiences:', error.message);
      throw new HttpException(
        'Erreur lors de la récupération des expériences',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description create an experience
   * @route GET /experiences
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an experience' })
  @ApiCreatedResponse({
    description: 'The experience has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createExperience(
    @Body() createExperienceDto: CreateExperienceDto,
  ): Promise<Observable<CreateExperienceDto>> {
    return await this.experienceService.createExperience({
      createExperienceDto,
    });
  }

  /**
   * PUT
   * _
   * @description update an experience
   * @route GET /experiences/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:experienceId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an experience' })
  @ApiCreatedResponse({
    description: 'The experience has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateExperience(
    @Param('experienceId') experienceId: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ): Promise<Observable<UpdateExperienceDto>> {
    return await this.experienceService.updateExperience({
      experienceId,
      updateExperienceDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete an experience
   * @route localhost:3000/experiences/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:experienceId')
  @ApiOperation({ summary: 'Delete an experience' })
  @ApiCreatedResponse({
    description: 'The experience has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteExperience(@Param('experienceId') experienceId: string) {
    return await this.experienceService.deleteExperience({ experienceId });
  }
}
