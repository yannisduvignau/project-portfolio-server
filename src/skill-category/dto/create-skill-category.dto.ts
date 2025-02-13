import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUniqueSlug } from '../validators/is-unique-slug.validator';

export class CreateSkillCategoryDto {
  // -------------------------------------------------------------------
  // Title
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le titre de la catégorie de compétence.',
    example: 'Développement Web',
  })
  @IsNotEmpty({ message: "L'intitulé est obligatoire." })
  @IsString({ message: "L'intitulé doit être une chaîne de caractères." })
  title: string;

  // -------------------------------------------------------------------
  // Title (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le titre (EN) de la catégorie de compétence.',
    example: 'Développement Web',
  })
  @IsNotEmpty({ message: 'Le titre (EN) est obligatoire.' })
  @IsString({ message: 'Le titre (EN) doit être une chaîne de caractères.' })
  title_en: string;

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
