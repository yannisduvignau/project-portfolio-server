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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('experiences')
@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  /**
   * INDEX
   * _
   * @description index all experiences
   * @road localhost:3000/experiences
   * @returns http resources
   */
  @Get()
  async getExperiences() {
    return await this.experienceService.getExperiences();
  }

  /**
   * INDEX
   * _
   * @description index all experiences
   * @road localhost:3000/experiences
   * @returns http resources
   */
  @Get('/admin')
  async getExperiencesAdmin() {
    return await this.experienceService.getExperiencesAdmin();
  }

  /**
   * INDEX
   * _
   * @description index all experiences with pagination
   * @route GET /experiences/paginate?page={page}
   * @returns http resources
   */
  @Get('/paginate')
  async getExperiencesPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.experienceService.getExperiencesPaginate({
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
   * @description index one experience (by ID)
   * @road localhost:3000/experiences/{id}
   * @returns http resources
   */
  @Get('/:experienceId')
  async getExperienceByID(@Param('experienceId') experienceId: string) {
    return await this.experienceService.getExperienceByID({ experienceId });
  }

  /**
   * POST
   * _
   * @description create an experience
   * @road localhost:3000/experiences
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async createExperience(@Body() createExperienceDto: CreateExperienceDto) {
    return await this.experienceService.createExperience({
      createExperienceDto,
    });
  }

  /**
   * PUT
   * _
   * @description update an experience
   * @road localhost:3000/experiences/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:experienceId')
  async updateExperience(
    @Param('experienceId') experienceId: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return await this.experienceService.updateExperience({
      experienceId,
      updateExperienceDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete an experience
   * @road localhost:3000/experiences/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:experienceId')
  async deleteExperience(@Param('experienceId') experienceId: string) {
    return await this.experienceService.deleteExperience({ experienceId });
  }
}
