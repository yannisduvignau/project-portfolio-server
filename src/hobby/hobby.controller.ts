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
import { HobbyService } from './hobby.service';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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

@ApiTags('hobbies')
@Controller('hobbies')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  /**
   * INDEX
   * _
   * @description index all hobbies
   * @route GET /hobbies
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all hobbies' })
  @ApiResponse({ status: 200, description: 'Get all hobbies successfully' })
  @ApiNotFoundResponse({ description: 'No hobbies found' })
  async getHobbies() {
    return await this.hobbyService.getHobbies();
  }

  /**
   * INDEX
   * _
   * @description index all hobbies with pagination
   * @route GET /hobbies/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all hobbies' })
  @ApiResponse({ status: 200, description: 'Get all hobbies successfully' })
  @ApiNotFoundResponse({ description: 'No hobbies found' })
  async getHobbiesPaginate(
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
      return await this.hobbyService.getHobbiesPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
        filters: filters || {},
      });
    } catch (error) {
      console.error('Error fetching paginated hobbies:', error.message);
      throw new HttpException(
        'Erreur lors de la récupération des loisirs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description create a hobby
   * @route POST /hobbies
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a hobby' })
  @ApiCreatedResponse({
    description: 'The hobby has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createHobby(
    @Body() createHobbyDto: CreateHobbyDto,
  ): Promise<Observable<CreateHobbyDto>> {
    return await this.hobbyService.createHobby({
      createHobbyDto,
    });
  }

  /**
   * PUT
   * _
   * @description update a hobby
   * @route PUT /hobbies/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:hobbyId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a hobby' })
  @ApiCreatedResponse({
    description: 'The hobby has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateHobby(
    @Param('hobbyId') hobbyId: string,
    @Body() updateHobbyDto: UpdateHobbyDto,
  ): Promise<Observable<UpdateHobbyDto>> {
    return await this.hobbyService.updateHobby({
      hobbyId,
      updateHobbyDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a hobby
   * @route DELETE /hobbies/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:hobbyId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a hobby' })
  @ApiCreatedResponse({
    description: 'The hobby has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteHobby(@Param('hobbyId') hobbyId: string) {
    return await this.hobbyService.deleteHobby({ hobbyId });
  }
}
