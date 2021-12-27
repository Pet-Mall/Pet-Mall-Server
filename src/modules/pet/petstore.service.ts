import { QueryDto } from './dto/query-pet-store.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Injectable } from '@nestjs/common';
import { Admin as AdminSchema } from '../admin/models/admin.model';
import { Menu as MenuSchema } from '../menu/models/menu.model';
import { CreatePetStoreDto } from './dto/create-pet-store.dto';
import { UpdatePetStoreDto } from './dto/update-pet-store.dto';
import { Pet as PetSchema } from './models/petstore.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { Role as RoleSchema } from '../role/models/role.model';
import { CreateRoleDto } from '../role/dto/create-role.dto';
@Injectable()
export class PetService {
  /**
   * 注册PetModel，通过this.PetModel访问model层
   * @param PetModel
   */
  constructor(
    @InjectModel(PetSchema) private readonly PetModel: ModelType<PetSchema>,
    @InjectModel(MenuSchema) private readonly MenuModel: ModelType<MenuSchema>,
    @InjectModel(RoleSchema) private readonly RoleModel: ModelType<RoleSchema>,
    @InjectModel(AdminSchema)
    private readonly AdminModel: ModelType<AdminSchema>,
  ) {}

  /**
   *
   * @param page 分页参数
   * @param petDto 查询条件
   */
  async customerPage(query: QueryDto, user) {
    const { current, size } = query;
    const skipCount: number = (current - 1) * size;
    return {
      data: await this.PetModel.find({
        petsId: user.petsId || null,
        is_delete: false,
      })
        .limit(size)
        .skip(skipCount)
        .sort({ createdAt: -1 }),
      current: Number(current) || 1,
      size: Number(size) || 10,
      total: await this.PetModel.find({
        petsId: user.petsId || null,
        is_delete: false,
      }).count(),
    };
  }

  async create(createPetStoreDto: CreatePetStoreDto) {
    const beforePet: any = await this.PetModel.findOne({
      email: createPetStoreDto.email,
      is_delete: false,
    });
    if (beforePet) {
      return false;
    } else {
      const petData: any = await this.PetModel.create(createPetStoreDto);

      /**
       * 1.拉取所有菜单
       * 2.创建角色并且把菜单赋值给角色
       * 3.创建用户并且把角色赋值给用户
       */
      // 1.
      const menuListId: string[] = [];
      const menuList = await this.MenuModel.find({ is_delete: false });
      menuList.forEach((item) => menuListId.push(item._id));
      // 2.
      const roleModel: CreateRoleDto = {
        name: 'superAdmin',
        code: '1001',
        remark: '超级管理员',
        menuList: menuListId,
        petsId: petData._id,
        is_delete: false,
      };
      const roleData = await this.RoleModel.create(roleModel);
      // 创建管理员
      const salt: string = makeSalt();
      const passwd_salt: string = encryptPassword(
        createPetStoreDto.email,
        salt,
      );
      const adminData: CreateAdminDto = {
        account: createPetStoreDto.email,
        password: passwd_salt,
        username: createPetStoreDto.email,
        avatar: '',
        roleId: roleData._id,
        phone: createPetStoreDto.phone,
        password_salt: salt,
        petsId: petData._id,
        is_delete: false,
        status: true,
      };
      const userData: any = await this.AdminModel.create(adminData);
      return this.PetModel.updateOne(
        { _id: petData._id },
        { $set: { adminId: userData._id } },
      );
    }
  }

  async findAll() {
    return await this.PetModel.find({ isDeleted: false }).populate('adminId');
  }

  async findOne(id: string) {
    return await this.PetModel.findOne({ _id: id, is_delete: false });
  }

  async update(id: string, updatePetStoreDto: UpdatePetStoreDto) {
    return await this.PetModel.updateOne(
      { _id: id },
      { $set: updatePetStoreDto },
    );
  }

  async remove(id: string) {
    return await this.PetModel.updateOne(
      { _id: id },
      { $set: { is_delete: true } },
    );
  }
}
