import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('about')
export class CreateAboutDto {
  @ApiProperty({
    description: 'Le label décrivant cet élément.',
    example: 'Projets réalisés',
  })
  @IsNotEmpty({ message: 'Le label est obligatoire.' })
  @IsString({ message: 'Le label doit être une chaîne de caractères.' })
  label: string;

  @ApiProperty({
    description: 'Le nombre associé au label.',
    example: 25,
  })
  @IsNotEmpty({ message: 'Le nombre est obligatoire.' })
  @IsInt({ message: 'Le nombre doit être un nombre entier.' })
  number: number;

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
