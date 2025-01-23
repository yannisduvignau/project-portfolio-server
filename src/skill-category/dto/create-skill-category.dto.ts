import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillCategoryDto {
  @ApiProperty({
    description: 'Le titre de la catégorie de compétence.',
    example: 'Développement Web',
  })
  @IsNotEmpty({ message: "L'intitulé est obligatoire." })
  @IsString({ message: "L'intitulé doit être une chaîne de caractères." })
  intitule: string;
}
