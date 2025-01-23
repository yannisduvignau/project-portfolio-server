import { PartialType } from '@nestjs/swagger';
import { CreateItemNavigationDto } from './create-item-navigation.dto';

export class UpdateItemNavigationDto extends PartialType(
  CreateItemNavigationDto,
) {}
