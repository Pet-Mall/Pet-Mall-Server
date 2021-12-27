import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role as RoleSchema } from './models/role.model';
@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleSchema) private readonly RoleModel: ModelType<RoleSchema>,
  ) {}

  async customerPage(query: QueryRoleDto, user) {
    const { current, size } = query;
    return {
      data: await this.RoleModel.find({
        petsId: user.petsId || null,
        is_delete: false,
      })
        .limit(size)
        .skip((current - 1) * size)
        .sort({ createdAt: -1 }),
      current: Number(current) || 1,
      size: Number(size) || 10,
      total: await this.RoleModel.find({
        petsId: user.petsId || null,
        is_delete: false,
      }).count(),
    };
  }

  create(createRoleDto: CreateRoleDto) {
    return this.RoleModel.create(createRoleDto);
  }

  findAll() {
    return this.RoleModel.find({ is_delete: false });
  }

  findOne(id: string) {
    return this.RoleModel.findOne({ _id: id, is_delete: false });
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.RoleModel.updateOne({ _id: id }, { $set: updateRoleDto });
  }

  remove(id: string) {
    return this.RoleModel.updateOne({ _id: id }, { $set: { is_delete: true } });
  }
}
