import { PartialType } from '@nestjs/swagger';
import { CreatePassionDto } from './create-passion.dto';

export class UpdatePassionDto extends PartialType(CreatePassionDto) {}
