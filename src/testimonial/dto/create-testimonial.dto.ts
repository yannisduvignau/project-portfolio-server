import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({
    description: 'Le contenu du témoignage.',
    example: 'Ce produit a changé ma vie!',
  })
  @IsNotEmpty({ message: 'Le contenu est obligatoire.' })
  @IsString({ message: 'Le contenu doit être une chaîne de caractères.' })
  content: string;

  @ApiProperty({
    description: "Le chemin de l'image du témoignage.",
    example: '/images/testimonial.jpg',
  })
  @IsNotEmpty({ message: "Le chemin de l'image est obligatoire." })
  @IsString({
    message: "Le chemin de l'image doit être une chaîne de caractères.",
  })
  imgSrc: string;

  @ApiProperty({
    description: 'Le nom de la personne qui laisse le témoignage.',
    example: 'Jean Dupont',
  })
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  name: string;

  @ApiProperty({
    description: "Le nom de l'entreprise de la personne.",
    example: 'Tech Corp',
  })
  @IsNotEmpty({ message: "Le nom de l'entreprise est obligatoire." })
  @IsString({
    message: "Le nom de l'entreprise doit être une chaîne de caractères.",
  })
  compagny: string;

  @ApiProperty({
    description: "Le nombre d'étoiles attribuées au produit ou service.",
    example: 5,
  })
  @IsNotEmpty({ message: "Le nombre d'étoiles est obligatoire." })
  @IsInt({ message: 'Les étoiles doivent être un nombre entier.' })
  @Min(1, { message: 'Les étoiles doivent être comprises entre 1 et 5.' })
  @Max(5, { message: 'Les étoiles doivent être comprises entre 1 et 5.' })
  stars: number;
}
