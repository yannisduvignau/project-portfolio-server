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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
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

const uploadPath = process.env.UPLOAD_PATH;
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

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
  @ApiOperation({ summary: 'Create an project' })
  @ApiCreatedResponse({
    description: 'The project has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadPath,
        filename: (_, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Observable<CreateProjectDto>> {
    if (!file) {
      return await this.projectService.createProject({
        createProjectDto: {
          ...createProjectDto,
          imgSrc: 'placeholder.webp',
        },
      });
      //throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const imagePath = `${file.filename}`;

    return await this.projectService.createProject({
      createProjectDto: { ...createProjectDto, imgSrc: imagePath },
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
  @ApiOperation({ summary: 'Update an project' })
  @ApiCreatedResponse({
    description: 'The project has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadPath,
        filename: (_, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Observable<UpdateProjectDto>> {
    // Récupérer le témoignage actuel pour obtenir l'ancienne image (si elle existe)
    const existingProject = await this.projectService.getProjectById({
      projectId,
    });

    if (file) {
      // Si un nouveau fichier est téléchargé, on crée le chemin de la nouvelle image
      const updatedImgSrc = `${file.filename}`;

      // Supprimer l'ancienne image si elle existe
      if (
        existingProject.imgSrc &&
        existingProject.imgSrc !== 'defaultAvatar.png'
      ) {
        const oldImagePath = `.${existingProject.imgSrc}`;
        try {
          // Vérifier si le fichier existe avant de tenter de le supprimer
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Supprimer l'ancienne image
          }
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      return await this.projectService.updateProject({
        projectId,
        updateProjectDto: {
          ...updateProjectDto,
          imgSrc: updatedImgSrc,
        },
      });
    }

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
  @ApiOperation({ summary: 'Delete an project' })
  @ApiCreatedResponse({
    description: 'The project has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteProject(@Param('projectId') projectId: string) {
    return await this.projectService.deleteProject({ projectId });
  }
}
