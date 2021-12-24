import { PartialType } from '@nestjs/swagger';
import { CreatePetStoreDto } from './create-pet-store.dto';

export class UpdatePetStoreDto extends PartialType(CreatePetStoreDto) {}
