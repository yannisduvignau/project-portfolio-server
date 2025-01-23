import {
  IsArray,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Le titre du projet.',
    example: 'Application de gestion de tâches',
  })
  @IsNotEmpty({ message: 'Le titre ne doit pas être vide.' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  titre: string;

  @ApiProperty({
    description: "Le chemin de l'image du projet.",
    example: '/images/projet.png',
  })
  @IsNotEmpty({ message: "Le chemin de l'image ne doit pas être vide." })
  @IsString({
    message: "Le chemin de l'image doit être une chaîne de caractères.",
  })
  imgSrc: string;

  @ApiProperty({
    description: 'Le lien vers le projet.',
    example: 'https://github.com/utilisateur/projet',
  })
  @IsNotEmpty({ message: 'Le lien vers le projet ne doit pas être vide.' })
  @IsString({
    message: 'Le lien vers le projet doit être une chaîne de caractères.',
  })
  projectLink: string;

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

  @ApiProperty({
    description: 'La priorité du projet.',
    example: 1,
  })
  @IsNotEmpty({ message: 'La priorité est obligatoire.' })
  @IsInt({ message: 'La priorité doit être un nombre entier.' })
  priority: number;
}
