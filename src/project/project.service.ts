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
      titre: true,
      imgSrc: true,
      projectLink: true,
      tags: true,
      priority: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all projects
   */
  async getProjectsAdmin() {
    return await this.getAll({
      id: true,
      titre: true,
      imgSrc: true,
      projectLink: true,
      tags: true,
      priority: true,
      createdAt: true,
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
  }: {
    page: number;
    pageSize: number;
    search: string;
  }) {
    const searchCondition = search
      ? {
          OR: [
            { titre: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            // { tags: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
        }
      : {};
    return await this.getAllPaginate(
      page,
      pageSize,
      {
        id: true,
        titre: true,
        imgSrc: true,
        projectLink: true,
        tags: true,
        priority: true,
        createdAt: true,
      },
      searchCondition,
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
      titre: true,
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
      priority: Number(createProjectDto.priority), // Conversion forcée en entier
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
        priority: Number(updateProjectDto.priority), // Conversion forcée en entier
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
