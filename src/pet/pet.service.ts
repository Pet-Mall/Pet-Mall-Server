import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet as Petsecma } from './models/pet.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
@Injectable()
export class PetService {
  /**
   * 注册PetModel，通过this.PetModel访问model层
   * @param PetModel 
   */
  constructor(
    @InjectModel(Petsecma) private readonly PetModel: ModelType<Petsecma>
  ) { }

  async create(createPetDto: CreatePetDto) {
    return await this.PetModel.create(createPetDto);
  }

  async findAll() {
    return await this.PetModel.find({ isDeleted: false });
  }

  async findOne(id: string) {
    return await this.PetModel.findOne({ _id: id });
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    return await this.PetModel.updateOne({ _id: id }, { $set: updatePetDto });
  }

  async remove(id: string) {
    return await this.PetModel.updateOne({ _id: id });
  }
}
