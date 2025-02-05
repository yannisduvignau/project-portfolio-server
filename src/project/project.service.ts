import { Injectable } from '@nestjs/common';
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
   * @description get all projects
   */
  async getProjects() {
    return await this.getAll({
      id: true,
      title: true,
      imgSrc: true,
      projectLink: true,
      tags: true,
      priority: true,
      masqued: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all projects
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
    const searchCondition = search
      ? {
          OR: [
            { titre: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            // { tags: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
        }
      : {};

    const filtersObject =
      typeof filters === 'string' ? JSON.parse(filters) : filters;

    // Build filters condition
    const filtersCondition = filtersObject
      ? {
          AND: [
            filtersObject.createdAt
              ? {
                  createdAt: {
                    gte: filtersObject.createdAt[0], // Greater than or equal to start date
                    lte: filtersObject.createdAt[1], // Less than or equal to end date
                  },
                }
              : null,
            filtersObject.numberMin || filtersObject.numberMax
              ? {
                  number: {
                    ...(filtersObject.numberMin && {
                      gte: filtersObject.numberMin,
                    }),
                    ...(filtersObject.numberMax && {
                      lte: filtersObject.numberMax,
                    }),
                  },
                }
              : null,
          ].filter(Boolean),
          //.filter((condition) => Object.keys(condition).length > 0), // Remove empty conditions
        }
      : {};

    return await this.getAllPaginate(
      page,
      pageSize,
      {
        id: true,
        title: true,
        imgSrc: true,
        projectLink: true,
        tags: true,
        priority: true,
        masqued: true,
        createdAt: true,
      },
      {
        AND: [searchCondition, filtersCondition].filter(
          (condition) => Object.keys(condition).length > 0,
        ),
      },
    );
  }

  /**
   * SHOW
   * _
   * @description get one project
   */
  async getProjectById({ projectId }: { projectId: string }) {
    return await this.getById(projectId, {
      id: true,
      title: true,
      imgSrc: true,
      projectLink: true,
      tags: true,
    });
  }

  /**
   * POST
   * _
   * @description create a project
   */
  async createProject({
    createProjectDto,
  }: {
    createProjectDto: CreateProjectDto;
  }) {
    const sanitizedData = {
      ...createProjectDto,
      priority: Number(createProjectDto.priority),
    };
    return await this.create(sanitizedData);
  }

  /**
   * PUT
   * _
   * @description update a project
   */
  async updateProject({
    projectId,
    updateProjectDto,
  }: {
    projectId: string;
    updateProjectDto: UpdateProjectDto;
  }) {
    let sanitizedData = updateProjectDto;
    if (updateProjectDto.priority) {
      sanitizedData = {
        ...updateProjectDto,
        priority: Number(updateProjectDto.priority),
      };
    }
    return await this.update(projectId, sanitizedData);
  }

  /**
   * DELETE
   * _
   * @description delete a project
   */
  async deleteProject({ projectId }: { projectId: string }) {
    return await this.delete(projectId);
  }
}
