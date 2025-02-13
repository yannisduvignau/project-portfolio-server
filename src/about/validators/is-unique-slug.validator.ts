import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { AboutService } from '../about.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueSlug implements ValidatorConstraintInterface {
  constructor(private readonly service: AboutService) {}

  async validate(slug: string) {
    const existingSlug = await this.service.findBySlug(slug);
    return !existingSlug;
  }

  defaultMessage(args: ValidationArguments) {
    return `Le slug "${args.value}" est déjà utilisé.`;
  }
}
