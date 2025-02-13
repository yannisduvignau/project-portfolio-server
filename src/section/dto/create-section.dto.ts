import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUniqueSlug } from '../validators/is-unique-slug.validator';

export class CreateSectionDto {
  // -------------------------------------------------------------------
  // Label
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Le label de l'élément de section.",
    example: 'Accueil',
  })
  @IsNotEmpty({ message: 'Le label est obligatoire.' })
  @IsString({ message: 'Le label doit être une chaîne de caractères.' })
  label: string;

  // -------------------------------------------------------------------
  // Label (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Le label (EN) de l'élément de section.",
    example: 'Accueil',
  })
  @IsNotEmpty({ message: 'Le label (EN) est obligatoire.' })
  @IsString({ message: 'Le label (EN) doit être une chaîne de caractères.' })
  label_en: string;

  // -------------------------------------------------------------------
  // Link
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Le lien vers lequel l'élément de section pointe.",
    example: '/accueil',
  })
  @IsNotEmpty({ message: 'Le lien est obligatoire.' })
  @IsString({ message: 'Le lien doit être une chaîne de caractères.' })
  link: string;

  // -------------------------------------------------------------------
  // Classname
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Le nom de la classe CSS pour styliser l'élément.",
    example: 'nav-item',
  })
  @IsNotEmpty({ message: 'Le nom de la classe est obligatoire.' })
  @IsString({
    message: 'Le nom de la classe doit être une chaîne de caractères.',
  })
  className: string;

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
