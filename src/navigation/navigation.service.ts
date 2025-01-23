import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { CreateItemNavigationDto } from './dto/create-item-navigation.dto';
import { UpdateItemNavigationDto } from './dto/update-item-navigation.dto';

@Injectable()
export class NavigationService extends BaseService<'itemNavigation'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'itemNavigation');
  }

  /**
   * INDEX
   * _
   */
  async getAllNavigations() {
    return await this.getAll({
      id: true,
      label: true,
      link: true,
      className: true,
      priority: true,
    });
  }

  async getAllNavigationsAdmin() {
    return await this.getAll({
      id: true,
      label: true,
      link: true,
      className: true,
      priority: true,
      createdAt: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all navigations
   */
  async getNavigationsPaginate({
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
            { label: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { link: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
            { className: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
        }
      : {};
    return await this.getAllPaginate(
      page,
      pageSize,
      {
        id: true,
        label: true,
        link: true,
        className: true,
        priority: true,
        createdAt: true,
      },
      searchCondition,
    );
  }

  /**
   * SHOW
   * _
   */
  async getNavigationById({ itemId }: { itemId: string }) {
    return await this.getById(itemId, {
      id: true,
      label: true,
      link: true,
      className: true,
    });
  }

  /**
   * CREATE
   * _
   */
  async createItemNavigation({
    createItemNavigationDto,
  }: {
    createItemNavigationDto: CreateItemNavigationDto;
  }) {
    return await this.create(createItemNavigationDto);
  }

  /**
   * UPDATE
   * _
   */
  async updateCategory({
    itemId,
    updateItemNavigationDto,
  }: {
    itemId: string;
    updateItemNavigationDto: UpdateItemNavigationDto;
  }) {
    return await this.update(itemId, updateItemNavigationDto);
  }

  /**
   * DELETE
   * _
   */
  async deleteCategory({ itemId }: { itemId: string }) {
    return await this.delete(itemId);
  }
}
