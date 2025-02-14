import {
  IsArray,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  IsInt,
  IsBoolean,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUniqueSlug } from '../validators/is-unique-slug.validator';

export class CreateProjectDto {
  // -------------------------------------------------------------------
  // Title
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le titre du projet.',
    example: 'Application de gestion de tâches',
  })
  @IsNotEmpty({ message: 'Le titre ne doit pas être vide.' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  title: string;

  // -------------------------------------------------------------------
  // Title (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le titre (EN) du projet.',
    example: 'Application de gestion de tâches',
  })
  @IsNotEmpty({ message: 'Le titre (EN) ne doit pas être vide.' })
  @IsString({ message: 'Le titre (EN) doit être une chaîne de caractères.' })
  title_en: string;

  // -------------------------------------------------------------------
  // ImgSrc
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Le chemin de l'image du projet.",
    example: 'https://storage-bucket/projet.png',
  })
  @IsNotEmpty({ message: "Le chemin de l'image ne doit pas être vide." })
  @IsString({
    message: "Le chemin de l'image doit être une chaîne de caractères.",
  })
  imgSrc: string;

  // -------------------------------------------------------------------
  // ProjectLink
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le lien vers le projet.',
    example: 'https://github.com/utilisateur/projet',
  })
  @IsNotEmpty({ message: 'Le lien vers le projet ne doit pas être vide.' })
  @IsString({
    message: 'Le lien vers le projet doit être une chaîne de caractères.',
  })
  projectLink: string;

  // -------------------------------------------------------------------
  // Tags
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Les tags associés au projet.',
    example: ['JavaScript', 'TypeScript', 'NestJS'],
  })
  @IsNotEmpty({ message: 'Les tags ne doivent pas être vides.' })
  @IsArray({ message: 'Les tags doivent être un tableau.' })
  @ArrayNotEmpty({ message: 'Le tableau des tags ne doit pas être vide.' })
  @IsString({
    each: true,
    message: 'Chaque tag doit être une chaîne de caractères.',
  })
  tags: Array<string>;

  // -------------------------------------------------------------------
  // Tags (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Les tags associés au projet.',
    example: ['JavaScript', 'TypeScript', 'NestJS'],
  })
  @IsNotEmpty({ message: 'Les tags ne doivent pas être vides.' })
  @IsArray({ message: 'Les tags doivent être un tableau.' })
  @ArrayNotEmpty({ message: 'Le tableau des tags ne doit pas être vide.' })
  @IsString({
    each: true,
    message: 'Chaque tag doit être une chaîne de caractères.',
  })
  tags_en: Array<string>;

  // -------------------------------------------------------------------
  // Priority
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'La priorité du projet.',
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
