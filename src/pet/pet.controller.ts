import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("宠物店")
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) { }
  @Post("create")
  create(@Body(new ValidationPipe()) createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  @Get("list")
  findAll() {
    return this.petService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.petService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }
}
