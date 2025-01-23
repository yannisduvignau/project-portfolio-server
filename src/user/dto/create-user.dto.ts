import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "L'adresse email de l'utilisateur.",
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: "L'email ne doit pas être vide." })
  @IsEmail({}, { message: 'Vous devez fournir une adresse email valide.' })
  email: string;

  @ApiProperty({
    description: "Le prénom de l'utilisateur.",
    example: 'Jean',
  })
  @IsNotEmpty({ message: 'Le prénom ne doit pas être vide.' })
  @IsString({ message: 'Le prénom doit être une chaîne de caractères.' })
  firstname: string;

  @ApiProperty({
    description: "Le mot de passe de l'utilisateur.",
    example: 'motdepasse123',
  })
  @IsNotEmpty({ message: 'Le mot de passe ne doit pas être vide.' })
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  password: string;
}
