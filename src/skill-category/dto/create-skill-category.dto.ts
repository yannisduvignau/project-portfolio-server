import { IsString, IsNotEmpty, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillCategoryDto {
  @ApiProperty({
    description: 'Le titre de la catégorie de compétence.',
    example: 'Développement Web',
  })
  @IsNotEmpty({ message: "L'intitulé est obligatoire." })
  @IsString({ message: "L'intitulé doit être une chaîne de caractères." })
  intitule: string;

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
