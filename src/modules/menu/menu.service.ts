import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu as MenuSchema } from "./models/menu.model"
import { QueryMenuDto } from './dto/query-menu.dto';
@Injectable()
export class MenuService {

  constructor(@InjectModel(MenuSchema) private readonly MenuModel: ModelType<MenuSchema>) { }

  async customerPage(query: QueryMenuDto) {
    const { current, size } = query
    // 获取所有第一层父级菜单当作分页
    const dataParent: any = await this.MenuModel.find({ is_delete: false, parentId: "0" }).limit(size).skip((current - 1) * size).sort({ createdAt: -1 }) || []
    // 找到所有的子菜单
    const dataChildren: any = await this.MenuModel.find({
      is_delete: false,
      parentId: { $ne: "0" }
    }).sort({ createdAt: -1 }) || []
    // 1.先将所有子菜单转成tree菜单，然后再去对应一层父级
    const childrenTree = this.toTree(JSON.parse(JSON.stringify(dataChildren)))
    // 递归找到底下所有的菜单获取树状结构数据
    var menuTreeData: any = []
    if (dataParent.length !== 0) {
      menuTreeData = this.travel(dataParent, childrenTree)
    } else {
      menuTreeData = []
    }
    return {
      data: menuTreeData,
      current: Number(current) || 1,
      size: Number(size) || 10,
      total: await this.MenuModel.find({ is_delete: false, parentId: "0" }).count()
    }
  }
  travel(parent, children) {
    const parentData = JSON.parse(JSON.stringify(parent))
    parentData.forEach(p => {
      p.children = []
      children.forEach(c => {
        if (c.parentId == p._id) {
          p.children.push(c)
        }
      })
    })
    return parentData
  }
  toTree(data) {
    data.forEach((item) => {
      delete item.children;
    });
    var map = {};
    data.forEach((item) => {
      map[item._id] = item;
    });
    var val = [];
    data.forEach((item) => {
      var parent = map[item.parentId];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        val.push(item);
      }
    });
    return val;
  }

  create(createMenuDto: CreateMenuDto) {
    return this.MenuModel.create(createMenuDto);
  }

  async findAll() {
    const data = await this.MenuModel.find({ is_delete: false })
    return this.toTree(JSON.parse(JSON.stringify(data)));
  }

  findOne(id: string) {
    return this.MenuModel.findOne({ _id: id, is_delete: false });
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.MenuModel.updateOne({ _id: id }, { $set: updateMenuDto });
  }

  remove(id: string) {
    return this.MenuModel.updateOne({ _id: id }, { $set: { is_delete: true } });
  }
}
