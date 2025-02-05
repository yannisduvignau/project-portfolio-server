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
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
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

const uploadPath = '../front/src/assets'; // Replace '/src/assets'
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /**
   * INDEX
   * _
   * @description index all reviews
   * @route GET /reviews
   * @returns http resources
   */
  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Get all reviews successfully' })
  @ApiNotFoundResponse({ description: 'No reviews found' })
  async getReviews() {
    return await this.reviewService.getReviews();
  }

  /**
   * INDEX
   * _
   * @description index all reviews with pagination
   * @route GET /reviews/paginate?page={page}&pageSize={pageSize}&search={search}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Get('/paginate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Get all reviews successfully' })
  @ApiNotFoundResponse({ description: 'No reviews found' })
  async getReviewsPaginate(
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
      return await this.reviewService.getReviewsPaginate({
        page: pageNumber,
        pageSize: pageSizeNumber,
        search: search || '',
        filters: filters || {},
      });
    } catch (error) {
      console.error('Error fetching paginated reviews:', error.message);
      throw new HttpException(
        'Erreur lors de la récupération des testimoniaux',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description create a review
   * @route POST /reviews
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a review' })
  @ApiCreatedResponse({
    description: 'The review has been successfully created.',
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
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Observable<CreateReviewDto>> {
    if (!file) {
      return await this.reviewService.createReview({
        createReviewDto: {
          ...createReviewDto,
          imgSrc: '/src/assets/defaultAvatar.png',
        },
      });
      //throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const imagePath = `/src/assets/${file.filename}`;

    return await this.reviewService.createReview({
      createReviewDto: { ...createReviewDto, imgSrc: imagePath },
    });
  }

  /**
   * PUT
   * _
   * @description update a review
   * @route PUT /reviews/{id}
   * @returns http resources
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:reviewId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a review' })
  @ApiCreatedResponse({
    description: 'The review has been successfully updated.',
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
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Observable<UpdateReviewDto>> {
    // Récupérer le témoignage actuel pour obtenir l'ancienne image (si elle existe)
    const existingReview = await this.reviewService.getReviewByID({
      reviewId,
    });

    if (file) {
      // Si un nouveau fichier est téléchargé, on crée le chemin de la nouvelle image
      const updatedImgSrc = `/src/assets/${file.filename}`;

      // Supprimer l'ancienne image si elle existe
      if (
        existingReview.imgSrc &&
        existingReview.imgSrc !== '/src/assets/defaultAvatar.png'
      ) {
        const oldImagePath = `.${existingReview.imgSrc}`;
        try {
          // Vérifier si le fichier existe avant de tenter de le supprimer
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Supprimer l'ancienne image
          }
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      return await this.reviewService.updateReview({
        reviewId,
        updateReviewDto: {
          ...updateReviewDto,
          imgSrc: updatedImgSrc,
        },
      });
    }

    // Mettre à jour le témoignage avec la nouvelle image (ou l'ancienne si aucun fichier n'a été téléchargé)
    return await this.reviewService.updateReview({
      reviewId,
      updateReviewDto,
    });
  }

  /**
   * DELETE
   * _
   * @description delete a review
   * @route DELETE /reviews/{id}
   * @returns http response
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:reviewId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a review' })
  @ApiCreatedResponse({
    description: 'The review has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async deleteReview(@Param('reviewId') reviewId: string) {
    return await this.reviewService.deleteReview({ reviewId });
  }
}
