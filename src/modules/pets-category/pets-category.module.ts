import { Module } from '@nestjs/common';
import { PetsCategoryService } from './pets-category.service';
import { PetsCategoryController } from './pets-category.controller';

@Module({
  controllers: [PetsCategoryController],
  providers: [PetsCategoryService]
})
export class PetsCategoryModule {}
