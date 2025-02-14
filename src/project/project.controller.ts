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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
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

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   * INDEX
   * _
   * @description index all projects
   * @route GET /projects
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Get all projects successfully' })
  @ApiNotFoundResponse({ description: 'No projects found' })
  async getProjects() {
    return await this.projectService.getProjects();
  }

  /**
   * SHOW
   * _
   * @description index a project
   * @route GET /projects/{id}
   * @returns http resources
   */
  @Get('/show/:projectId')
  @ApiOperation({ summary: 'Get a project' })
  @ApiResponse({ status: 200, description: 'Get all projects successfully' })
  @ApiNotFoundResponse({ description: 'No projects found' })
  async getProjectById(@Param('projectId') projectId: string) {
    return await this.projectService.getProjectById({ projectId });
  }

  /**
   * INDEX
   * _
   * @description index all projects with pagination
   * @route GET /projects/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Get all projects successfully' })
  @ApiNotFoundResponse({ description: 'No projects found' })
  async getProjectsPaginate(
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
      return await this.projectService.getProjectsPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
        filters: filters || {},
      });
    } catch (error) {
      console.error('Error fetching paginated projects:', error.message);
      throw new HttpException(
        'Erreur lors de la récupération des projets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description create a project
   * @route POST /projects
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a project' })
  @ApiCreatedResponse({
    description: 'The project has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Observable<CreateProjectDto>> {
    return await this.projectService.createProject({
      createProjectDto,
    });
  }

  /**
   * PUT
   * _
   * @description update a project
   * @route PUT /projects/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:projectId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a project' })
  @ApiCreatedResponse({
    description: 'The project has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Observable<UpdateProjectDto>> {
    return await this.projectService.updateProject({
      projectId,
      updateProjectDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a project
   * @route DELETE /projects/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:projectId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a project' })
  @ApiCreatedResponse({
    description: 'The project has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteProject(@Param('projectId') projectId: string) {
    return await this.projectService.deleteProject({ projectId });
  }
}
