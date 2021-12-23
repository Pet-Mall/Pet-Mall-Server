import { CreateAdminDto } from './../admin/dto/create-admin.dto';
import { Injectable } from '@nestjs/common';
import { Admin as Adminsecma } from '../admin/models/admin.model';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet as Petsecma } from './models/pet.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
@Injectable()
export class PetService {
  /**
   * 注册PetModel，通过this.PetModel访问model层
   * @param PetModel 
   */
  constructor(
    @InjectModel(Petsecma) private readonly PetModel: ModelType<Petsecma>,
    @InjectModel(Adminsecma) private readonly AdminModel: ModelType<Adminsecma>

  ) { }

  async create(createPetDto: CreatePetDto) {
    const beforePet = await this.PetModel.findOne({ email: createPetDto.email })
    if (beforePet) {
      return false;
    } else {
      const petData = await this.PetModel.create(createPetDto)
      // 创建管理员
      const salt: string = makeSalt()
      const passwd_salt: string = encryptPassword(createPetDto.email, salt)
      const adminData: CreateAdminDto = {
        account: createPetDto.email,
        password: passwd_salt,
        username: createPetDto.email,
        avatar: '',
        roleId: '',
        phone: createPetDto.phone,
        password_salt: salt,
        petDetail: petData._id
      }
      const userData = await this.AdminModel.create(adminData)
      return this.PetModel.updateOne({ _id: petData._id }, { $set: { adminList: [userData._id] } });
    }
  }

  async findAll() {
    return await this.PetModel.find({ isDeleted: false }).populate("adminList");
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
