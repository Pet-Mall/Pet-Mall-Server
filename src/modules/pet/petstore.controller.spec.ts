import { Test, TestingModule } from '@nestjs/testing';
import { PetController } from './petstore.controller';
import { PetService } from './petstore.service';

describe('PetController', () => {
  let controller: PetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetController],
      providers: [PetService],
    }).compile();

    controller = module.get<PetController>(PetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
