import { Test, TestingModule } from '@nestjs/testing';
import { PetsCategoryController } from './pets-category.controller';
import { PetsCategoryService } from './pets-category.service';

describe('PetsCategoryController', () => {
  let controller: PetsCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsCategoryController],
      providers: [PetsCategoryService],
    }).compile();

    controller = module.get<PetsCategoryController>(PetsCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
