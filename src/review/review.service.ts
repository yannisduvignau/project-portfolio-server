import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService extends BaseService<'review'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'review');
  }

  /**
   * INDEX
   * _
   * @description Get all reviews
   */
  async getReviews() {
    try {
      return await this.getAll({
        content: true,
        content_en: true,
        imgSrc: true,
        name: true,
        company: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching reviews',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * SHOW
   * _
   * @description Get one review by ID
   */
  async getReviewById({ reviewId }: { reviewId: string }) {
    try {
      const review = await this.getById(reviewId, {
        id: true,
        content: true,
        imgSrc: true,
        name: true,
        company: true,
      });

      if (!review) {
        throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
      }

      return review;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching review',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * INDEX
   * _
   * @description Get paginated reviews with search and filters
   */
  async getReviewsPaginate({
    page,
    pageSize,
    search,
    filters,
  }: {
    page: number;
    pageSize: number;
    search?: string;
    filters?: {
      createdAt?: [Date, Date];
      numberMin?: number;
      numberMax?: number;
    };
  }) {
    try {
      // Search condition
      const searchCondition = search
        ? {
            OR: [
              { content: { contains: search, mode: 'insensitive' } },
              { name: { contains: search, mode: 'insensitive' } },
              { company: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {};

      // Parse filters if needed
      const filtersObject =
        typeof filters === 'string' ? JSON.parse(filters) : filters;

      // Build filters condition
      const filtersCondition: any = {};
      if (filtersObject?.createdAt) {
        filtersCondition.createdAt = {
          gte: filtersObject.createdAt[0],
          lte: filtersObject.createdAt[1],
        };
      }
      if (filtersObject?.numberMin || filtersObject?.numberMax) {
        filtersCondition.number = {
          ...(filtersObject.numberMin && { gte: filtersObject.numberMin }),
          ...(filtersObject.numberMax && { lte: filtersObject.numberMax }),
        };
      }

      return await this.getAllPaginate(
        page,
        pageSize,
        {
          id: true,
          content: true,
          content_en: true,
          imgSrc: true,
          name: true,
          company: true,
          stars: true,
          slug: true,
          masqued: true,
          createdAt: true,
        },
        {
          AND: [searchCondition, filtersCondition].filter(
            (condition) => Object.keys(condition).length > 0,
          ),
        },
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching paginated reviews',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST
   * _
   * @description Create a review
   */
  async createReview({
    createReviewDto,
  }: {
    createReviewDto: CreateReviewDto;
  }) {
    try {
      const sanitizedData = {
        ...createReviewDto,
        stars: Number(createReviewDto.stars),
      };

      return await this.create(sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creating review', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * PUT
   * @description Update a review
   */
  async updateReview({
    reviewId,
    updateReviewDto,
  }: {
    reviewId: string;
    updateReviewDto: UpdateReviewDto;
  }) {
    try {
      const sanitizedData: any = { ...updateReviewDto };

      if (updateReviewDto.stars !== undefined) {
        sanitizedData.stars = Number(updateReviewDto.stars);
      }

      return await this.update(reviewId, sanitizedData);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error updating review', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * DELETE
   * _
   * @description Delete a review
   */
  async deleteReview({ reviewId }: { reviewId: string }) {
    try {
      return await this.delete(reviewId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error deleting review',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET
   * _
   * @description Find a review by slug
   */
  async findBySlug(slug: string) {
    try {
      const review = await this.findOne({ where: { slug } });

      if (!review) {
        throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
      }

      return review;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error fetching review',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
