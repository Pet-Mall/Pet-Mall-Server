import { PartialType } from '@nestjs/swagger';
import { CreatePetsCategoryDto } from './create-pets-category.dto';

export class UpdatePetsCategoryDto extends PartialType(CreatePetsCategoryDto) {}
