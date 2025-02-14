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
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
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
   * SHOW
   * _
   * @description index a review
   * @route GET /reviews/{id}
   * @returns http resources
   */
  @Get('/show/:reviewId')
  @ApiOperation({ summary: 'Get a review' })
  @ApiResponse({ status: 200, description: 'Get all reviews successfully' })
  @ApiNotFoundResponse({ description: 'No reviews found' })
  async getReviewById(@Param('reviewId') reviewId: string) {
    return await this.reviewService.getReviewById({ reviewId });
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
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Observable<CreateReviewDto>> {
    return await this.reviewService.createReview({
      createReviewDto,
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
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Observable<UpdateReviewDto>> {
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
