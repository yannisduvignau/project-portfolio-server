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
import { SkillService } from './skill.service';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
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

const uploadPath = process.env.UPLOAD_PATH;
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

@ApiTags('skills')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  /**
   * INDEX
   * _
   * @description index all skills
   * @route GET /skills
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ status: 200, description: 'Get all skills successfully' })
  @ApiNotFoundResponse({ description: 'No skills found' })
  async getSkills() {
    return await this.skillService.getSkills();
  }

  /**
   * INDEX
   * _
   * @description index all skills with pagination and optional search
   * @route GET /skills/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ status: 200, description: 'Get all skills successfully' })
  @ApiNotFoundResponse({ description: 'No skills found' })
  async getSkillsPaginate(
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
      return await this.skillService.getSkillsPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
        filters: filters || {},
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
   * POST
   * _
   * @description create a skill
   * @route POST /skills
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a skill' })
  @ApiCreatedResponse({
    description: 'The skill has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
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
  async createSkill(
    @Body() createSkillDto: CreateSkillDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Observable<CreateSkillDto>> {
    if (!file) {
      return this.skillService.createSkill({
        createSkillDto: {
          ...createSkillDto,
          iconSrc: 'defaultIcon.png',
        },
      });
      //throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const imagePath = `${file.filename}`;

    return this.skillService.createSkill({
      createSkillDto: { ...createSkillDto, iconSrc: imagePath },
    });
  }

  /**
   * PUT
   * _
   * @description update a skill
   * @route PUT /skills/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:skillId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a skill' })
  @ApiCreatedResponse({
    description: 'The skill has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
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
  async updateSkill(
    @Param('skillId') skillId: string,
    @Body() updateSkillDto: UpdateSkillDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Observable<UpdateSkillDto>> {
    // Récupérer le témoignage actuel pour obtenir l'ancienne image (si elle existe)
    const existingReview = await this.skillService.getSkillById({
      skillId,
    });

    if (file) {
      // Si un nouveau fichier est téléchargé, on crée le chemin de la nouvelle image
      const updatedImgSrc = `${file.filename}`;

      // Supprimer l'ancienne image si elle existe
      if (
        existingReview.iconSrc &&
        existingReview.iconSrc !== 'defaultAvatar.png'
      ) {
        const oldImagePath = `.${existingReview.iconSrc}`;
        try {
          // Vérifier si le fichier existe avant de tenter de le supprimer
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Supprimer l'ancienne image
          }
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      return await this.skillService.updateSkill({
        skillId,
        updateSkillDto: { ...updateSkillDto, iconSrc: updatedImgSrc },
      });
    }
    return await this.skillService.updateSkill({
      skillId,
      updateSkillDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a skill
   * @route DELETE /skills/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:skillId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a skill' })
  @ApiCreatedResponse({
    description: 'The skill has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteSkill(@Param('skillId') skillId: string) {
    return await this.skillService.deleteSkill({ skillId });
  }
}
