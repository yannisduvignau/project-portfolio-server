import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePassionDto {
  @ApiProperty({
    description: 'Le titre de la passion.',
    example: 'Programmation',
  })
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères.' })
  titre: string;

  @ApiProperty({
    description: 'Un emoji représentant la passion.',
    example: '💻',
  })
  @IsNotEmpty({ message: "L'emoji est obligatoire." })
  @IsString({ message: "L'emoji doit être une chaîne de caractères." })
  emoji: string;

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
}
