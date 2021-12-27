import { Module } from '@nestjs/common';
import { PetService } from './petstore.service';
import { PetController } from './petstore.controller';

@Module({
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
