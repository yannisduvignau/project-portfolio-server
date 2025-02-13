import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { IsUniqueSlug } from '../validators/is-unique-slug.validator';
@ApiTags('about')
export class CreateAboutDto {
  // -------------------------------------------------------------------
  // Label
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le label décrivant cet élément.',
    example: 'Projets réalisés',
  })
  @IsNotEmpty({ message: 'Le label est obligatoire.' })
  @IsString({ message: 'Le label doit être une chaîne de caractères.' })
  label: string;

  // -------------------------------------------------------------------
  // Label (EN)
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le label anglais décrivant cet élément.',
    example: 'Projets réalisés',
  })
  @IsNotEmpty({ message: 'Le label anglais est obligatoire.' })
  @IsString({ message: 'Le label anglais doit être une chaîne de caractères.' })
  label_en: string;

  // -------------------------------------------------------------------
  // Number
  // -------------------------------------------------------------------
  @ApiProperty({
    description: 'Le nombre associé au label.',
    example: 25,
  })
  @IsNotEmpty({ message: 'Le nombre est obligatoire.' })
  @IsInt({ message: 'Le nombre doit être un nombre entier.' })
  number: number;

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
    example: true,
  })
  @IsNotEmpty({ message: 'La visibilité est obligatoire.' })
  @IsBoolean({ message: 'La visibilité doit être un booléen.' })
  masqued: boolean;
}
