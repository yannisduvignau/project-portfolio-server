import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUniqueSlug } from '../validators/is-unique-slug.validator';

export class CreateExperienceDto {
  // -------------------------------------------------------------------
  // Date
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "La date de l'expérience.",
    example: 'Janvier 2021 - Décembre 2021',
  })
  @IsNotEmpty({ message: 'La date est obligatoire.' })
  @IsString({ message: 'La date doit être une chaîne de caractères.' })
  date: string;

  // -------------------------------------------------------------------
  // Date (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "La date de l'expérience.",
    example: 'Janvier 2021 - Décembre 2021',
  })
  @IsNotEmpty({ message: 'La date est obligatoire.' })
  @IsString({ message: 'La date doit être une chaîne de caractères.' })
  date_en: string;

  // -------------------------------------------------------------------
  // Title
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Le titre de l'expérience.",
    example: 'Développeur Full Stack',
  })
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  title: string;

  // -------------------------------------------------------------------
  // Title (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Le titre de l'expérience.",
    example: 'Développeur Full Stack',
  })
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  title_en: string;

  // -------------------------------------------------------------------
  // Location
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "La localisation de l'expérience.",
    example: 'Paris, France',
  })
  @IsNotEmpty({ message: 'La localisation est obligatoire.' })
  @IsString({ message: 'La localisation doit être une chaîne de caractères.' })
  location: string;

  // -------------------------------------------------------------------
  // Description
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Une description de l'expérience.",
    example:
      'Participation à la conception et au développement de solutions web.',
  })
  @IsNotEmpty({ message: 'La description est obligatoire.' })
  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  description: string;

  // -------------------------------------------------------------------
  // Description (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Une description de l'expérience.",
    example:
      'Participation à la conception et au développement de solutions web.',
  })
  @IsNotEmpty({ message: 'La description est obligatoire.' })
  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  description_en: string;

  // -------------------------------------------------------------------
  // Priorité
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
    example: 'high_school_formation',
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
