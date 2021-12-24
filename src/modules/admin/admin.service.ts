import { Admin } from 'src/modules/admin/models/admin.model';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Admin as Adminsecma } from './models/admin.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateAdminDto, LoginDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Adminsecma) private readonly AdminModel: ModelType<Adminsecma>,
  ) { }
  /**
   * 
   * @param loginDto 登录参数
   * @returns 
   */
  async login(loginDto: LoginDto) {
    const { account, password } = loginDto;
    // 先去找是否含有该用户
    const user: any = await this.AdminModel.findOne({
      $or: [{ account: account }, { username: account }],
    });
    // 对比密码
    if (user) {
      const passwordSalt: string = encryptPassword(
        password,
        user.password_salt,
      );
      if (passwordSalt === user.password) {
        return {
          data: user,
          statusCode: 200,
          message: '登录成功',
        };
      } else {
        return {
          data: {},
          statusCode: 500,
          message: '密码不正确，请重试！',
        };
      }
    } else {
      return {
        data: {},
        statusCode: 500,
        message: '该账户不存在！',
      };
    }
  }

  async create(createAdminDto: CreateAdminDto) {
    const { account, username } = createAdminDto
    // 检测该用户没删除的用户是否存在
    const adminData = this.AdminModel.find({
      $or: [
        { account },
        { username }
      ],
      $eq: [
        { is_delete: false }
      ]
    })
    console.log(adminData);
    const salt: string = makeSalt();
    const { password, ...result } = createAdminDto;
    const hashedPassword = encryptPassword(password, salt);
    const adminModel: Admin = {
      ...result,
      password: hashedPassword,
      password_salt: salt,
    };
    return await this.AdminModel.create(adminModel);
  }

  async findAll() {
    return await this.AdminModel.find({ is_delete: false }).populate('petsId');
  }

  async findOne(id: string) {
    return await this.AdminModel.findOne({ _id: id, is_delete: false });
  }
  async findByAccount(account: string) {
    return await this.AdminModel.findOne({
      $or: [{ username: account }, { account: account }],
      is_delete:false
    });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return await this.AdminModel.updateOne({ _id: id }, { $set: updateAdminDto });
  }

  async remove(id: string) {
    return await this.AdminModel.updateOne({ _id: id }, { $set: { is_delete: true } });
  }
}
