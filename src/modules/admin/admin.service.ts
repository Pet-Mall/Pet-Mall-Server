import { QueryAdminDto } from './dto/query-admin.dto';
import { Admin } from '../admin/models/admin.model';
import { encryptPassword, makeSalt } from '../../utils/cryptogram';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Admin as AdminSchema } from './models/admin.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateAdminDto, LoginDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Role as RoleSchema } from '../role/models/role.model';
import { Menu as MenuSchema } from '../menu/models/menu.model';
import { toTree } from '../../utils';
import { CreateMenuDto } from '../menu/dto/create-menu.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminSchema)
    private readonly AdminModel: ModelType<AdminSchema>,
    @InjectModel(RoleSchema) private readonly RoleModel: ModelType<RoleSchema>,
    @InjectModel(MenuSchema) private readonly MenuModel: ModelType<MenuSchema>,
  ) {}
  /**
   *
   * @param query 分页搜索请求参数
   * @param user token中的用户信息
   * @returns
   */
  async customerPage(query: QueryAdminDto, user) {
    const { current, size, ...result } = query;
    const skipCount: number = (current - 1) * size;
    return {
      data: await this.AdminModel.find({
        petsId: user.petsId || null,
        is_delete: false,
        ...result,
      })
        .limit(Number(size))
        .skip(Number(skipCount))
        .populate('roleId petsId', 'name remark name')
        .sort({ createdAt: -1 }),
      current: Number(current) || 1,
      size: Number(size) || 10,
      total: await this.AdminModel.find({
        petsId: user.petsId || null,
        is_delete: false,
        ...result,
      }).count(),
    };
  }

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
      is_delete: false,
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

  async create(createAdminDto: CreateAdminDto, user: any) {
    const { account } = createAdminDto;
    // 检测该用户没删除的用户是否存在
    const adminData: any = await this.AdminModel.find({
      $or: [{ account }],
      $eq: [{ is_delete: false }],
    });
    if (adminData.length !== 0) {
      return {};
    } else {
      const salt: string = makeSalt();
      const { password, petsId, ...result } = createAdminDto;
      const hashedPassword: string = encryptPassword(password, salt);
      const adminModel: Admin = {
        ...result,
        password: hashedPassword,
        password_salt: salt,
        is_delete: false,
        petsId: petsId ? petsId : user.petsId,
      };
      return await this.AdminModel.create(adminModel);
    }
  }

  async findAll(user) {
    return await this.AdminModel.find({
      is_delete: false,
      petsId: user.petsId || null,
    })
      .populate('petsId')
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return await this.AdminModel.findOne({ _id: id, is_delete: false });
  }
  async findByAccount(account: string) {
    return await this.AdminModel.findOne({
      $or: [{ username: account }, { account: account }],
      is_delete: false,
    }).populate('roleId');
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    return await this.AdminModel.updateOne(
      { _id: id },
      { $set: updateAdminDto },
    );
  }

  async remove(id: string) {
    return await this.AdminModel.updateOne(
      { _id: id },
      { $set: { is_delete: true } },
    );
  }
  async roleMenu() {
    const menuData: CreateMenuDto = await this.MenuModel.find({
      is_delete: false,
      status: true,
    }).populate('rolesIdList');
    const tree: any = toTree(JSON.parse(JSON.stringify(menuData)));
    return tree;
  }
}
