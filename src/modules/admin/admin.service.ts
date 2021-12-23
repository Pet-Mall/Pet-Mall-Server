import { encryptPassword } from 'src/utils/cryptogram';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Admin as Adminsecma } from './models/admin.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateAdminDto, LoginDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  async login(loginDto: LoginDto) {
    const { account, password } = loginDto
    // 先去找是否含有该用户
    const user = await this.AdminModel.findOne({
      $or: [
        { account: account }, { username: account }
      ]
    })
    // 对比密码
    if (user) {
      const passwordSalt = encryptPassword(password, user.password_salt)
      if (passwordSalt === user.password) {
        console.log('密码一致');
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  constructor(
    @InjectModel(Adminsecma) private readonly AdminModel: ModelType<Adminsecma>
  ) { }
  create(createAdminDto: CreateAdminDto) {
    return this.AdminModel.create(createAdminDto);
  }

  findAll() {
    return this.AdminModel.find({}).populate("petDetail");
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
