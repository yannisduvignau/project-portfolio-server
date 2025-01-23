import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class CategoryExists implements ValidatorConstraintInterface {
  async validate(categoryId: string) {
    const category = await prisma.skillCategory.findUnique({
      where: { id: categoryId },
    });
    return !!category;
  }

  defaultMessage(args: ValidationArguments) {
    return `La catégorie avec l'ID "${args.value}" n'existe pas.`;
  }
}
