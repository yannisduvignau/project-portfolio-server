import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({
    description: "Le label de l'élément de section.",
    example: 'Accueil',
  })
  @IsNotEmpty({ message: 'Le label est obligatoire.' })
  @IsString({ message: 'Le label doit être une chaîne de caractères.' })
  label: string;

  @ApiProperty({
    description: "Le lien vers lequel l'élément de section pointe.",
    example: '/accueil',
  })
  @IsNotEmpty({ message: 'Le lien est obligatoire.' })
  @IsString({ message: 'Le lien doit être une chaîne de caractères.' })
  link: string;

  @ApiProperty({
    description: "Le nom de la classe CSS pour styliser l'élément.",
    example: 'nav-item',
  })
  @IsNotEmpty({ message: 'Le nom de la classe est obligatoire.' })
  @IsString({
    message: 'Le nom de la classe doit être une chaîne de caractères.',
  })
  className: string;

  @ApiProperty({
    description: 'La priorité pour l’affichage.',
    example: 1,
  })
  @IsNotEmpty({ message: 'La priorité est obligatoire.' })
  @IsInt({ message: 'La priorité doit être un nombre entier.' })
  priority: number;

  @ApiProperty({
    description: 'La visibilité pour l’affichage.',
    example: 1,
  })
  @IsNotEmpty({ message: 'La visibilité est obligatoire.' })
  @IsBoolean({ message: 'La visibilité doit être un booléen.' })
  masqued: boolean;
}
