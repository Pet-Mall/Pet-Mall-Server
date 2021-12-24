import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Injectable } from '@nestjs/common';
import { Admin as Adminsecma } from '../admin/models/admin.model';
import { CreatePetStoreDto } from './dto/create-pet-store.dto';
import { UpdatePetStoreDto } from './dto/update-pet-store.dto';
import { Pet as Petsecma } from './models/petstore.model';
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
    @InjectModel(Adminsecma) private readonly AdminModel: ModelType<Adminsecma>,
  ) { }

  /**
   * 
   * @param page 分页参数
   * @param petDto 查询条件
   */
  customerPage(query) {
    const { current, size } = query
    const skipCount: number = (current - 1) * size
    return this.PetModel.find().limit(size).skip(skipCount);
  }

  async create(createPetStoreDto: CreatePetStoreDto) {
    const beforePet: any = await this.PetModel.findOne({
      email: createPetStoreDto.email,
    });
    if (beforePet) {
      return false;
    } else {
      const petData: any = await this.PetModel.create(createPetStoreDto);
      // 创建管理员
      const salt: string = makeSalt();
      const passwd_salt: string = encryptPassword(createPetStoreDto.email, salt);
      const adminData: CreateAdminDto = {
        account: createPetStoreDto.email,
        password: passwd_salt,
        username: createPetStoreDto.email,
        avatar: '',
        roleId: '',
        phone: createPetStoreDto.phone,
        password_salt: salt,
        petsId: petData._id,
      };
      const userData: any = await this.AdminModel.create(adminData);
      return this.PetModel.updateOne(
        { _id: petData._id },
        { $set: { adminList: [userData._id] } },
      );
    }
  }

  async findAll() {
    return await this.PetModel.find({ isDeleted: false }).populate('adminList');
  }

  async findOne(id: string) {
    return await this.PetModel.findOne({ _id: id });
  }

  async update(id: string, updatePetStoreDto: UpdatePetStoreDto) {
    return await this.PetModel.updateOne({ _id: id }, { $set: updatePetStoreDto });
  }

  async remove(id: string) {
    return await this.PetModel.updateOne({ _id: id }, { $set: { is_delete: true } });
  }
}
