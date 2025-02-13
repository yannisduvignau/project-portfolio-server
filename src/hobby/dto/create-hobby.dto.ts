import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUniqueSlug } from '../validators/is-unique-slug.validator';

export class CreateHobbyDto {
  // -------------------------------------------------------------------
  // Title
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le titre du loisir.',
    example: 'Programmation',
  })
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  title: string;

  // -------------------------------------------------------------------
  // Title (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le titre (EN) du loisir.',
    example: 'Programmation',
  })
  @IsNotEmpty({ message: 'Le titre (EN) est obligatoire.' })
  @IsString({ message: 'Le titre (EN) doit être une chaîne de caractères.' })
  title_en: string;

  // -------------------------------------------------------------------
  // Emoji
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Un emoji représentant le loisir.',
    example: '💻',
  })
  @IsNotEmpty({ message: "L'emoji est obligatoire." })
  @IsString({ message: "L'emoji doit être une chaîne de caractères." })
  emoji: string;

  // -------------------------------------------------------------------
  // Top
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Positionnement relatif sur l'axe vertical.",
    example: 50,
  })
  @IsNotEmpty({ message: 'Le positionnement relatif haut est obligatoire.' })
  @IsNumber(
    {},
    { message: 'Le positionnement relatif haut doit être un nombre.' },
  )
  top: number;

  // -------------------------------------------------------------------
  // Left
  // -------------------------------------------------------------------
  @ApiProperty({
    description: "Positionnement relatif sur l'axe horizontal.",
    example: 100,
  })
  @IsNotEmpty({ message: 'Le positionnement relatif gauche est obligatoire.' })
  @IsNumber(
    {},
    { message: 'Le positionnement relatif gauche doit être un nombre.' },
  )
  left: number;

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
