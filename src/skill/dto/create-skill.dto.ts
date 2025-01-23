import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  IsNotEmpty,
  Validate,
} from 'class-validator';
import { CategoryExists } from '../validators/category-exists.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({
    description: 'Le label de la compétence.',
    example: 'Développement Backend',
  })
  @IsNotEmpty({ message: 'Le label est obligatoire.' })
  @IsString({ message: 'Le label doit être une chaîne de caractères.' })
  label: string;

  @ApiProperty({
    description: 'La description de la compétence.',
    example: 'Compétence en développement Backend avec Node.js et Express.',
  })
  @IsNotEmpty({ message: 'La description est obligatoire.' })
  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  description: string;

  @ApiProperty({
    description: "Le nombre d'étoiles attribuées à la compétence.",
    example: 4,
  })
  @IsNotEmpty({ message: "Le nombre d'étoiles est obligatoire." })
  @IsInt({ message: "Le nombre d'étoiles doit être un nombre entier." })
  @Min(1, { message: "Le nombre d'étoiles doit être compris entre 1 et 5." })
  @Max(5, { message: "Le nombre d'étoiles doit être compris entre 1 et 5." })
  stars: number;

  @ApiProperty({
    description: "L'icône associée à la compétence.",
    example: 'https://example.com/icon.png',
    required: false,
  })
  @IsOptional()
  @IsString({ message: "L'icône doit être une chaîne de caractères." })
  iconSrc?: string;

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
}
