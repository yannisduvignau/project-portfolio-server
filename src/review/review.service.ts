import { Injectable } from '@nestjs/common';
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
   * @description get all reviews
   */
  async getReviews() {
    return await this.getAll({
      content: true,
      content_en: true,
      imgSrc: true,
      name: true,
      company: true,
    });
  }

  /**
   * SHOW
   * _
   * @description get one review
   */
  async getReviewByID({ reviewId }: { reviewId: string }) {
    return await this.getById(reviewId, {
      id: true,
      content: true,
      imgSrc: true,
      name: true,
      compagny: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all reviews
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
    const searchCondition = search
      ? {
          OR: [
            { content: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { name: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
            { company: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
        }
      : {};

    const filtersObject =
      typeof filters === 'string' ? JSON.parse(filters) : filters;

    // Build filters condition
    const filtersCondition = filtersObject
      ? {
          AND: [
            filtersObject.createdAt
              ? {
                  createdAt: {
                    gte: filtersObject.createdAt[0], // Greater than or equal to start date
                    lte: filtersObject.createdAt[1], // Less than or equal to end date
                  },
                }
              : null,
            filtersObject.numberMin || filtersObject.numberMax
              ? {
                  number: {
                    ...(filtersObject.numberMin && {
                      gte: filtersObject.numberMin,
                    }),
                    ...(filtersObject.numberMax && {
                      lte: filtersObject.numberMax,
                    }),
                  },
                }
              : null,
          ].filter(Boolean),
          //.filter((condition) => Object.keys(condition).length > 0), // Remove empty conditions
        }
      : {};

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
  }

  /**
   * POST
   * _
   * @description create a review
   */
  async createReview({
    createReviewDto,
  }: {
    createReviewDto: CreateReviewDto;
  }) {
    const sanitizedData = {
      ...createReviewDto,
      stars: Number(createReviewDto.stars),
      priority: Number(createReviewDto.priority),
    };

    return await this.create(sanitizedData);
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
    const sanitizedData = { ...updateReviewDto };

    if (updateReviewDto.stars !== undefined) {
      sanitizedData.stars = Number(updateReviewDto.stars);
    }
    if (updateReviewDto.priority !== undefined) {
      sanitizedData.priority = Number(updateReviewDto.priority);
    }

    return await this.update(reviewId, sanitizedData);
  }

  /**
   * DELETE
   * _
   * @description delete a review
   */
  async deleteReview({ reviewId }: { reviewId: string }) {
    return await this.delete(reviewId);
  }
}
