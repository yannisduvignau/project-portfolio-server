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
import { PassionService } from './passion.service';
import { UpdatePassionDto } from './dto/update-passion.dto';
import { CreatePassionDto } from './dto/create-passion.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('passions')
@Controller('passions')
export class PassionController {
  constructor(private readonly passionService: PassionService) {}

  /**
   * INDEX
   * _
   * @description index all passions
   * @road localhost:3000/passions
   * @returns http resources
   */
  @Get()
  async getPassions() {
    return await this.passionService.getPassions();
  }

  /**
   * INDEX
   * _
   * @description index all passions
   * @road localhost:3000/passions
   * @returns http resources
   */
  @Get('/admin')
  async getPassionsAdmin() {
    return await this.passionService.getPassionsAdmin();
  }

  /**
   * INDEX
   * _
   * @description index all passions with pagination
   * @route GET /passions/paginate?page={page}
   * @returns http resources
   */
  @Get('/paginate')
  async getPassionsPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.passionService.getPassionsPaginate({
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
   * @description index one passion (by ID)
   * @road localhost:3000/passions/{id}
   * @returns http resources
   */
  @Get('/:passionId')
  async getPassionByID(@Param('passionId') passionId: string) {
    return await this.passionService.getPassionByID({ passionId });
  }

  /**
   * POST
   * _
   * @description create a passion
   * @road localhost:3000/passions
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPassion(@Body() createPassionDto: CreatePassionDto) {
    return await this.passionService.createPassion({
      createPassionDto,
    });
  }

  /**
   * PUT
   * _
   * @description update a passion
   * @road localhost:3000/passions/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:passionId')
  async updatePassion(
    @Param('passionId') passionId: string,
    @Body() updatePassionDto: UpdatePassionDto,
  ) {
    return await this.passionService.updatePassion({
      passionId,
      updatePassionDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a passion
   * @road localhost:3000/passions/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:passionId')
  async deletePassion(@Param('passionId') passionId: string) {
    return await this.passionService.deletePassion({ passionId });
  }
}
