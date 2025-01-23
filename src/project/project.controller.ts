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
import { ApiTags } from '@nestjs/swagger';

const uploadPath = '../front/src/assets'; // Replace '/src/assets'
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
   * @road localhost:3000/projects
   * @returns http resources
   */
  @Get()
  async getProjects() {
    return await this.projectService.getProjects();
  }

  /**
   * INDEX
   * _
   * @description index all projects
   * @road localhost:3000/projects
   * @returns http resources
   */
  @Get('/admin')
  async getProjectsAdmin() {
    return await this.projectService.getProjectsAdmin();
  }

  /**
   * INDEX
   * _
   * @description index all projects with pagination
   * @route GET /projects/paginate?page={page}
   * @returns http resources
   */
  @Get('/paginate')
  async getProjectsPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.projectService.getProjectsPaginate({
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
   * @description index one project (by ID)
   * @road localhost:3000/projects/{id}
   * @returns http resources
   */
  @Get('/:projectId')
  async getProjectByID(@Param('projectId') projectId: string) {
    return await this.projectService.getProjectById({ projectId });
  }

  /**
   * POST
   * _
   * @description create a project
   * @road localhost:3000/projects
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
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
  ) {
    if (!file) {
      return await this.projectService.createProject({
        createProjectDto: {
          ...createProjectDto,
          imgSrc: '/src/assets/placeholder.webp',
        },
      });
      //throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const imagePath = `/src/assets/${file.filename}`;

    return await this.projectService.createProject({
      createProjectDto: { ...createProjectDto, imgSrc: imagePath },
    });
  }

  /**
   * PUT
   * _
   * @description update a project
   * @road localhost:3000/projects/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:projectId')
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
  ) {
    // Récupérer le témoignage actuel pour obtenir l'ancienne image (si elle existe)
    const existingProject = await this.projectService.getProjectById({
      projectId,
    });

    if (file) {
      // Si un nouveau fichier est téléchargé, on crée le chemin de la nouvelle image
      const updatedImgSrc = `/src/assets/${file.filename}`;

      // Supprimer l'ancienne image si elle existe
      if (
        existingProject.imgSrc &&
        existingProject.imgSrc !== '/src/assets/defaultAvatar.png'
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
   * @road localhost:3000/projects/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:projectId')
  async deleteProject(@Param('projectId') projectId: string) {
    return await this.projectService.deleteProject({ projectId });
  }
}
