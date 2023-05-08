import { Test, TestingModule } from '@nestjs/testing';
import { PetsCategoryService } from './pets-category.service';

describe('PetsCategoryService', () => {
  let service: PetsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsCategoryService],
    }).compile();

    service = module.get<PetsCategoryService>(PetsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
