import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreatePetsCategoryDto } from './dto/create-pets-category.dto';
import { UpdatePetsCategoryDto } from './dto/update-pets-category.dto';
import { PetsCategory as PetsCategorySchema } from "./models/pets-category.model"
import { QueryPetsCategory } from './dto/query-pets-category.dto';
@Injectable()
export class PetsCategoryService {
  constructor(
    @InjectModel(PetsCategorySchema) private PetsCategoryModel: ModelType<PetsCategorySchema>
  ) { }

  /**
   * 自定义分页
   * @param query 搜索参数
   * @param user 用户店铺id
   * @returns 
   */
  async customerPage(query: QueryPetsCategory, user: any) {
    const { current, size, ...result } = query
    return {
      data: await this.PetsCategoryModel.find({
        is_delete: false,
        petsId: user.petsId || null,
        ...result
      })
        .limit(Number(size))
        .skip(Number((current - 1) * size))
        .sort({ createdAt: -1 }),
      current: Number(current) || 1,
      size: Number(size) || 10,
      total: await this.PetsCategoryModel.find({
        is_delete: false,
        petsId: user.petsId || null,
        ...result
      })
        .count()
    }
  }

  create(createPetsCategoryDto: CreatePetsCategoryDto, user: any) {
    const { petsId, ...result } = createPetsCategoryDto
    const model: any = {
      ...result,
      petsId: petsId ? petsId : user.petsId
    }
    return this.PetsCategoryModel.create(model)
  }

  findAll(user) {
    console.log(user);
    return this.PetsCategoryModel.find({
      petsId: user.petsId || null,
      is_delete: false
    });
  }

  findOne(id: string) {
    return this.PetsCategoryModel.findOne({ _id: id, is_delete: false });
  }

  update(id: string, updatePetsCategoryDto: UpdatePetsCategoryDto) {
    return this.PetsCategoryModel.updateOne({ _id: id }, { $set: updatePetsCategoryDto });
  }

  remove(id: string) {
    return this.PetsCategoryModel.updateOne({ _id: id }, { $set: { is_delete: true } });
  }
}
