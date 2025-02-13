import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService extends BaseService<'project'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'project');
  }

  /**
   * INDEX
   * _
   * @description Get all projects ordered by priority
   */
  async getProjects() {
    try {
      return await this.getAllOrderByPriority({
        title: true,
        title_en: true,
        imgSrc: true,
        projectLink: true,
        tags: true,
        tags_en: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching projects',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * INDEX
   * _
   * @description Get paginated projects with search and filters
   */
  async getProjectsPaginate({
    page,
    pageSize,
    search,
    filters,
  }: {
    page: number;
    pageSize: number;
    search?: string;
    filters?: {
      createdAt?: [Date, Date];
      numberMin?: number;
      numberMax?: number;
    };
  }) {
    try {
      // Search condition
      const searchCondition = search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              // { tags: { contains: search, mode: 'insensitive' } }, // Uncomment if needed
            ],
          }
        : {};

      // Parse filters if needed
      const filtersObject =
        typeof filters === 'string' ? JSON.parse(filters) : filters;

      // Build filters condition
      const filtersCondition: any = {};
      if (filtersObject?.createdAt) {
        filtersCondition.createdAt = {
          gte: filtersObject.createdAt[0],
          lte: filtersObject.createdAt[1],
        };
      }
      if (filtersObject?.numberMin || filtersObject?.numberMax) {
        filtersCondition.number = {
          ...(filtersObject.numberMin && { gte: filtersObject.numberMin }),
          ...(filtersObject.numberMax && { lte: filtersObject.numberMax }),
        };
      }

      return await this.getAllPaginate(
        page,
        pageSize,
        {
          id: true,
          title: true,
          title_en: true,
          imgSrc: true,
          projectLink: true,
          tags: true,
          tags_en: true,
          priority: true,
          slug: true,
          masqued: true,
          createdAt: true,
        },
        {
          AND: [searchCondition, filtersCondition].filter(
            (condition) => Object.keys(condition).length > 0,
          ),
        },
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching paginated projects',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * SHOW
   * _
   * @description Get one project by ID
   */
  async getProjectById({ projectId }: { projectId: string }) {
    try {
      const project = await this.getById(projectId, {
        id: true,
        title: true,
        imgSrc: true,
        projectLink: true,
        tags: true,
      });

      if (!project) {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }

      return project;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching project',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description Create a new project
   */
  async createProject({
    createProjectDto,
  }: {
    createProjectDto: CreateProjectDto;
  }) {
    try {
      const sanitizedData = {
        ...createProjectDto,
        priority: Number(createProjectDto.priority),
        masqued: Boolean(createProjectDto.masqued),
      };

      return await this.create(sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creating project', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * PUT
   * _
   * @description Update an existing project
   */
  async updateProject({
    projectId,
    updateProjectDto,
  }: {
    projectId: string;
    updateProjectDto: UpdateProjectDto;
  }) {
    try {
      const sanitizedData: any = { ...updateProjectDto };

      if (updateProjectDto.priority !== undefined) {
        sanitizedData.priority = Number(updateProjectDto.priority);
      }
      if (updateProjectDto.masqued !== undefined) {
        sanitizedData.masqued = Boolean(updateProjectDto.masqued);
      }

      return await this.update(projectId, sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating project', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * DELETE
   * _
   * @description Delete a project
   */
  async deleteProject({ projectId }: { projectId: string }) {
    try {
      return await this.delete(projectId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error deleting project',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET
   * _
   * @description Find a project by slug
   */
  async findBySlug(slug: string) {
    try {
      const project = await this.findOne({ where: { slug } });

      if (!project) {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }

      return project;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching project',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
