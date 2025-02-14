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
import { SkillService } from './skill.service';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
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

@ApiTags('skills')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  /**
   * INDEX
   * _
   * @description index all skills
   * @route GET /skills
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ status: 200, description: 'Get all skills successfully' })
  @ApiNotFoundResponse({ description: 'No skills found' })
  async getSkills() {
    return await this.skillService.getSkills();
  }

  /**
   * SHOW
   * _
   * @description index a skill
   * @route GET /projects/{id}
   * @returns http resources
   */
  @Get('/show/:skillId')
  @ApiOperation({ summary: 'Get a skill' })
  @ApiResponse({ status: 200, description: 'Get all skills successfully' })
  @ApiNotFoundResponse({ description: 'No skills found' })
  async getProjectById(@Param('skillId') skillId: string) {
    return await this.skillService.getSkillById({ skillId });
  }

  /**
   * INDEX
   * _
   * @description index all skills with pagination and optional search
   * @route GET /skills/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ status: 200, description: 'Get all skills successfully' })
  @ApiNotFoundResponse({ description: 'No skills found' })
  async getSkillsPaginate(
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
      return await this.skillService.getSkillsPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
        filters: filters || {},
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
   * POST
   * _
   * @description create a skill
   * @route POST /skills
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a skill' })
  @ApiCreatedResponse({
    description: 'The skill has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createSkill(
    @Body() createSkillDto: CreateSkillDto,
  ): Promise<Observable<CreateSkillDto>> {
    return this.skillService.createSkill({
      createSkillDto,
    });
  }

  /**
   * PUT
   * _
   * @description update a skill
   * @route PUT /skills/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:skillId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a skill' })
  @ApiCreatedResponse({
    description: 'The skill has been successfully updated.',
  })
  async updateSkill(
    @Param('skillId') skillId: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<Observable<UpdateSkillDto>> {
    return await this.skillService.updateSkill({
      skillId,
      updateSkillDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a skill
   * @route DELETE /skills/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:skillId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a skill' })
  @ApiCreatedResponse({
    description: 'The skill has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteSkill(@Param('skillId') skillId: string) {
    return await this.skillService.deleteSkill({ skillId });
  }
}
