import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  IsNotEmpty,
  Validate,
  IsBoolean,
} from 'class-validator';
import { CategoryExists } from '../validators/category-exists.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUniqueSlug } from '../validators/is-unique-slug.validator';

export class CreateSkillDto {
  // -------------------------------------------------------------------
  // Title
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le titre de la compétence.',
    example: 'Développement Backend',
  })
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  title: string;

  // -------------------------------------------------------------------
  // Title (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le titre (EN) de la compétence.',
    example: 'Développement Backend',
  })
  @IsNotEmpty({ message: 'Le titre (EN) est obligatoire.' })
  @IsString({ message: 'Le titre (EN) doit être une chaîne de caractères.' })
  title_en: string;

  // -------------------------------------------------------------------
  // Description
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'La description de la compétence.',
    example: 'Compétence en développement Backend avec Node.js et Express.',
  })
  @IsNotEmpty({ message: 'La description est obligatoire.' })
  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  description: string;

  // -------------------------------------------------------------------
  // Description (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'La description (EN) de la compétence.',
    example: 'Compétence en développement Backend avec Node.js et Express.',
  })
  @IsNotEmpty({ message: 'La description (EN) est obligatoire.' })
  @IsString({
    message: 'La description (EN) doit être une chaîne de caractères.',
  })
  description_en: string;

  // -------------------------------------------------------------------
  // Stars
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Le nombre d'étoiles attribuées à la compétence.",
    example: 4,
  })
  @IsNotEmpty({ message: "Le nombre d'étoiles est obligatoire." })
  @IsInt({ message: "Le nombre d'étoiles doit être un nombre entier." })
  @Min(1, { message: "Le nombre d'étoiles doit être compris entre 1 et 5." })
  @Max(5, { message: "Le nombre d'étoiles doit être compris entre 1 et 5." })
  stars: number;

  // -------------------------------------------------------------------
  // IconSrc
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "L'icône associée à la compétence.",
    example: 'https://example.com/icon.png',
    required: false,
  })
  @IsOptional()
  @IsString({ message: "L'icône doit être une chaîne de caractères." })
  iconSrc?: string;

  // -------------------------------------------------------------------
  // CategoryId
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "L'identifiant de la catégorie associée à la compétence.",
    example: '123456',
  })
  @IsNotEmpty({ message: "L'identifiant de la catégorie est obligatoire." })
  @IsString({
    message:
      "L'identifiant de la catégorie doit être une chaîne de caractères.",
  })
  @Validate(CategoryExists, {
    message: "La catégorie spécifiée n'existe pas.",
  })
  categoryId: string;

  // -------------------------------------------------------------------
  // Priority
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'La priorité pour l’affichage.',
    example: 1,
  })
  @IsNotEmpty({ message: 'La priorité est obligatoire.' })
  @IsInt({ message: 'La priorité doit être un nombre entier.' })
  priority: number;

  // -------------------------------------------------------------------
  // Slug
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Le slug pour identifier narrativement l'enregistrement.",
    example: 'customers',
  })
  @IsNotEmpty({ message: 'Le slug est obligatoire.' })
  @IsString({ message: 'Le slug doit être une chaîne de caractères.' })
  @Validate(IsUniqueSlug, { message: 'Ce slug est déjà utilisé.' })
  slug: string;

  // -------------------------------------------------------------------
  // Masqued
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'La visibilité pour l’affichage.',
    example: 1,
  })
  @IsNotEmpty({ message: 'La visibilité est obligatoire.' })
  @IsBoolean({ message: 'La visibilité doit être un booléen.' })
  masqued: boolean;
}
