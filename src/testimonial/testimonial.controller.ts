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
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
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

@ApiTags('testimonials')
@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  /**
   * INDEX
   * _
   * @description index all testimonials
   * @road localhost:3000/testimonials
   * @returns http resources
   */
  @Get()
  async getTestimonials() {
    return await this.testimonialService.getTestimonials();
  }

  /**
   * INDEX
   * _
   * @description index all testimonials
   * @road localhost:3000/testimonials
   * @returns http resources
   */
  @Get('/admin')
  async getTestimonialsAdmin() {
    return await this.testimonialService.getTestimonialsAdmin();
  }

  /**
   * INDEX
   * _
   * @description index all testimonials with pagination
   * @route GET /testimonials/paginate?page={page}
   * @returns http resources
   */
  @Get('/paginate')
  async getTestimonialsPaginate(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page || '1', 10); // Défaut: page 1
    const pageSizeNumber = parseInt(pageSize || '5', 10); // Défaut: 5

    try {
      return await this.testimonialService.getTestimonialsPaginate({
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
   * @description index one testimonial (by ID)
   * @road localhost:3000/testimonials/{id}
   * @returns http resources
   */
  @Get('/:testimonialId')
  async getTestimonialByID(@Param('testimonialId') testimonialId: string) {
    return await this.testimonialService.getTestimonialByID({ testimonialId });
  }

  /**
   * POST
   * _
   * @description create a testimonial
   * @road localhost:3000/testimonials
   * @returns http response
   */
  @Post()
  @UseGuards(JwtAuthGuard)
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
  async createTestimonial(
    @Body() createTestimonialDto: CreateTestimonialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return await this.testimonialService.createTestimonial({
        createTestimonialDto: {
          ...createTestimonialDto,
          imgSrc: '/src/assets/defaultAvatar.png',
        },
      });
      //throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const imagePath = `/src/assets/${file.filename}`;

    return await this.testimonialService.createTestimonial({
      createTestimonialDto: { ...createTestimonialDto, imgSrc: imagePath },
    });
  }

  /**
   * PUT
   * _
   * @description update a testimonial
   * @road localhost:3000/testimonials/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:testimonialId')
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
  async updateTestimonial(
    @Param('testimonialId') testimonialId: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Récupérer le témoignage actuel pour obtenir l'ancienne image (si elle existe)
    const existingTestimonial =
      await this.testimonialService.getTestimonialByID({
        testimonialId,
      });

    if (file) {
      // Si un nouveau fichier est téléchargé, on crée le chemin de la nouvelle image
      const updatedImgSrc = `/src/assets/${file.filename}`;

      // Supprimer l'ancienne image si elle existe
      if (
        existingTestimonial.imgSrc &&
        existingTestimonial.imgSrc !== '/src/assets/defaultAvatar.png'
      ) {
        const oldImagePath = `.${existingTestimonial.imgSrc}`;
        try {
          // Vérifier si le fichier existe avant de tenter de le supprimer
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Supprimer l'ancienne image
          }
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      return await this.testimonialService.updateTestimonial({
        testimonialId,
        updateTestimonialDto: {
          ...updateTestimonialDto,
          imgSrc: updatedImgSrc,
        },
      });
    }

    // Mettre à jour le témoignage avec la nouvelle image (ou l'ancienne si aucun fichier n'a été téléchargé)
    return await this.testimonialService.updateTestimonial({
      testimonialId,
      updateTestimonialDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a testimonial
   * @road localhost:3000/testimonials/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:testimonialId')
  async deleteTestimonial(@Param('testimonialId') testimonialId: string) {
    return await this.testimonialService.deleteTestimonial({ testimonialId });
  }
}
