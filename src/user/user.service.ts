import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends BaseService<'user'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'user');
  }

  /**
   * INDEX
   * _
   * @description get all users
   */
  async getUsers() {
    return await this.getAll({
      id: true,
      email: true,
      firstname: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all users
   */
  async getUsersAdmin() {
    return await this.getAll({
      id: true,
      email: true,
      firstname: true,
      createdAt: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all users
   */
  async getUsersPaginate({
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
            { email: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { firstname: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
        }
      : {};

    return await this.getAllPaginate(
      page,
      pageSize,
      {
        id: true,
        email: true,
        firstname: true,
        createdAt: true,
      },
      searchCondition,
    );
  }

  /**
   * SHOW
   * _
   * @description get one user
   */
  async getUserById({ userId }: { userId: string }) {
    return await this.getById(userId, {
      id: true,
      email: true,
      firstname: true,
    });
  }

  /**
   * POST
   * _
   * @description create a user
   */
  async createUser({ createUserDto }: { createUserDto: CreateUserDto }) {
    return await this.create(createUserDto);
  }

  /**
   * PUT
   * _
   * @description update a user
   */
  async updateUser({
    userId,
    updateUserDto,
  }: {
    userId: string;
    updateUserDto: UpdateUserDto;
  }) {
    return await this.update(userId, updateUserDto);
  }

  /**
   * DELETE
   * _
   * @description delete a user ref
   */
  async deleteUser({ userId }: { userId: string }) {
    return await this.delete(userId);
  }
}
