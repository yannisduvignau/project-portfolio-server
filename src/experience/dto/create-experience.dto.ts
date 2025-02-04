import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty({
    description: "La date de l'expérience.",
    example: 'Janvier 2021 - Décembre 2021',
  })
  @IsNotEmpty({ message: 'La date est obligatoire.' })
  @IsString({ message: 'La date doit être une chaîne de caractères.' })
  date: string;

  @ApiProperty({
    description: "Le titre de l'expérience.",
    example: 'Développeur Full Stack',
  })
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  titre: string;

  @ApiProperty({
    description: "La localisation de l'expérience.",
    example: 'Paris, France',
  })
  @IsNotEmpty({ message: 'La localisation est obligatoire.' })
  @IsString({ message: 'La localisation doit être une chaîne de caractères.' })
  localisation: string;

  @ApiProperty({
    description: "Une description de l'expérience.",
    example:
      'Participation à la conception et au développement de solutions web.',
  })
  @IsNotEmpty({ message: 'La description est obligatoire.' })
  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  description: string;

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
