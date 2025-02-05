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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // API

  /**
   * INDEX
   * _
   * @description index all users
   * @route localhost:3000/users
   * @returns http resources
   */
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  // ADMIN

  /**
   * INDEX
   * _
   * @description index all users
   * @route localhost:3000/users
   * @returns http resources
   */
  @Get('/admin')
  async getUsersAdmin() {
    return await this.userService.getUsersAdmin();
  }

  /**
   * INDEX
   * _
   * @description index all users with pagination
   * @route GET /users/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @Get('/paginate')
  async getUsersPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.userService.getUsersPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
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
   * @description index one user (by ID)
   * @route localhost:3000/users/{id}
   * @returns http resources
   */
  @Get('/:userId')
  async getUserByID(@Param('userId') userId: string) {
    return await this.userService.getUserById({ userId });
  }

  /**
   * POST
   * _
   * @description create a user
   * @route localhost:3000/users
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser({
      createUserDto,
    });
  }

  /**
   * PUT
   * _
   * @description update a user
   * @route localhost:3000/users/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser({
      userId,
      updateUserDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a user
   * @route localhost:3000/users/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser({ userId });
  }
}
