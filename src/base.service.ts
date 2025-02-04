import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

/**
 * Utility type to map model keys to their respective Prisma delegate types.
 */
type PrismaModelDelegate<T extends keyof PrismaService> =
  PrismaService[T] extends { findMany: any } ? PrismaService[T] : never;

export class BaseService<T extends keyof PrismaService> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly modelKey: T,
  ) {}

  private get model(): PrismaModelDelegate<T> {
    return this.prismaService[
      this.modelKey
    ] as unknown as PrismaModelDelegate<T>;
  }

  /**
   * INDEX
   * _
   * @description index all items
   */
  async getAll(select?: any, order: 'asc' | 'desc' = 'asc') {
    return await (this.model as any).findMany({
      select,
      orderBy: { priority: order }, // Utilisation du paramètre d'ordre
    });
  }

  /**
   * INDEX
   * _
   * @description index all items ordered by priority
   */
  async getAllOrderByPriority(select?: any) {
    return await (this.model as any).findMany({
      select,
      orderBy: {
        priority: 'asc', // Tri par ordre croissant, utilisez 'desc' pour décroissant
      },
    });
  }

  /**
   * INDEX
   * _
   * @description index all items with pagination
   */
  async getAllPaginate(
    page: number = 1,
    itemsPerPage: number = 10,
    select?: any,
    where?: any,
  ) {
    const skip = (page - 1) * itemsPerPage;

    const [items, totalCount] = await Promise.all([
      (this.model as any).findMany({
        skip,
        take: itemsPerPage,
        select,
        where,
      }),
      (this.model as any).count({ where }),
    ]);

    return {
      data: items,
      meta: {
        totalItems: totalCount,
        itemsPerPage,
        currentPage: page,
        totalPages: Math.ceil(totalCount / itemsPerPage),
      },
    };
  }

  /**
   * SHOW
   * _
   * @description index an item (by ID)
   */
  async getById(id: string, select?: any) {
    const item = await (this.model as any).findUnique({
      where: { id },
      select,
    });
    if (!item) throw new NotFoundException(`Item not found`);
    return item;
  }

  /**
   * POST
   * _
   * @description create an item
   */
  async create(data: any) {
    return await (this.model as any).create({ data });
  }

  /**
   * PUT
   * _
   * @description update an item
   */
  async update(id: string, data: any) {
    const item = await (this.model as any).findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Item not found`);
    return await (this.model as any).update({
      where: { id },
      data,
    });
  }

  /**
   * DELETE
   * _
   * @description delete an item
   */
  async delete(id: string) {
    const item = await (this.model as any).findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Item not found`);
    return await (this.model as any).delete({ where: { id } });
  }
}
