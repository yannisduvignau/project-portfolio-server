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
import { ApiTags } from '@nestjs/swagger';

const uploadPath = '../front/src/assets'; // Replace '/src/assets'
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
   * @road localhost:3000/skills
   * @returns http resources
   */
  @Get()
  async getSkills() {
    return await this.skillService.getSkills();
  }

  /**
   * INDEX
   * _
   * @description index all skills
   * @road localhost:3000/skills
   * @returns http resources
   */
  @Get('/admin')
  async getSkillsAdmin() {
    return await this.skillService.getSkillsAdmin();
  }

  /**
   * INDEX
   * _
   * @description index all skills with pagination and optional search
   * @route GET /skills/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @Get('/paginate')
  async getSkillsPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.skillService.getSkillsPaginate({
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
   * @description index one skill (by ID)
   * @road localhost:3000/skills/{id}
   * @returns http resources
   */
  @Get('/:skillId')
  async getSkillByID(@Param('skillId') skillId: string) {
    return await this.skillService.getSkillById({ skillId });
  }

  /**
   * POST
   * _
   * @description create a skill
   * @road localhost:3000/skills
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
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
  ) {
    if (!file) {
      return this.skillService.createSkill({
        createSkillDto: {
          ...createSkillDto,
          iconSrc: '/src/assets/defaultIcon.png',
        },
      });
      //throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const imagePath = `/src/assets/${file.filename}`;

    return this.skillService.createSkill({
      createSkillDto: { ...createSkillDto, iconSrc: imagePath },
    });
  }

  /**
   * PUT
   * _
   * @description update a skill
   * @road localhost:3000/skills/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:skillId')
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
  ) {
    // Récupérer le témoignage actuel pour obtenir l'ancienne image (si elle existe)
    const existingTestimonial = await this.skillService.getSkillById({
      skillId,
    });

    if (file) {
      // Si un nouveau fichier est téléchargé, on crée le chemin de la nouvelle image
      const updatedImgSrc = `/src/assets/${file.filename}`;

      // Supprimer l'ancienne image si elle existe
      if (
        existingTestimonial.iconSrc &&
        existingTestimonial.iconSrc !== '/src/assets/defaultAvatar.png'
      ) {
        const oldImagePath = `.${existingTestimonial.iconSrc}`;
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
   * @road localhost:3000/skills/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:skillId')
  async deleteSkill(@Param('skillId') skillId: string) {
    return await this.skillService.deleteSkill({ skillId });
  }
}
