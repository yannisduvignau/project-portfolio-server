import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class TestimonialService extends BaseService<'testimonial'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'testimonial');
  }

  /**
   * INDEX
   * _
   * @description get all testimonials
   */
  async getTestimonials() {
    return await this.getAll({
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
   * @description get all testimonials
   */
  async getTestimonialsAdmin() {
    return await this.getAll({
      id: true,
      content: true,
      imgSrc: true,
      name: true,
      compagny: true,
      createdAt: true,
    });
  }

  /**
   * INDEX
   * _
   * @description get all testimonials
   */
  async getTestimonialsPaginate({
    page,
    pageSize,
    search,
  }: {
    page: number;
    pageSize: number;
    search: string;
  }) {
    const searchCondition = search
      ? {
          OR: [
            { content: { contains: search, mode: 'insensitive' } }, // Recherche par label (insensible à la casse)
            { name: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
            { compagny: { contains: search, mode: 'insensitive' } }, // Recherche par description (si nécessaire)
          ],
        }
      : {};

    return await this.getAllPaginate(
      page,
      pageSize,
      {
        id: true,
        content: true,
        imgSrc: true,
        name: true,
        compagny: true,
        stars: true,
        createdAt: true,
      },
      searchCondition,
    );
  }

  /**
   * SHOW
   * _
   * @description get one testimonial
   */
  async getTestimonialByID({ testimonialId }: { testimonialId: string }) {
    return await this.getById(testimonialId, {
      id: true,
      content: true,
      imgSrc: true,
      name: true,
      compagny: true,
    });
  }

  /**
   * POST
   * _
   * @description create a testimonial
   */
  async createTestimonial({
    createTestimonialDto,
  }: {
    createTestimonialDto: CreateTestimonialDto;
  }) {
    // Convertir explicitement la notation en un entier
    const sanitizedData = {
      ...createTestimonialDto,
      stars: Number(createTestimonialDto.stars), // Conversion forcée en entier
    };

    return await this.create(sanitizedData);
  }

  /**
   * PUT
   * _
   * @description update a testimonial
   */
  async updateTestimonial({
    testimonialId,
    updateTestimonialDto,
  }: {
    testimonialId: string;
    updateTestimonialDto: UpdateTestimonialDto;
  }) {
    let sanitizedData = updateTestimonialDto;
    if (updateTestimonialDto.stars) {
      sanitizedData = {
        ...updateTestimonialDto,
        stars: Number(updateTestimonialDto.stars), // Conversion forcée en entier
      };
    }
    return await this.update(testimonialId, sanitizedData);
  }

  /**
   * DELETE
   * _
   * @description delete a testimonial ref
   */
  async deleteTestimonial({ testimonialId }: { testimonialId: string }) {
    return await this.delete(testimonialId);
  }
}
