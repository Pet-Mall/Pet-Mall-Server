import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, Prop } from '@typegoose/typegoose';
import { IsNotEmpty, IsString } from 'class-validator';
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class PetsCategory {
  @ApiProperty({ description: '分类名' })
  @IsNotEmpty({ message: '请输入分类名' })
  @IsString({ message: 'name类型必须为string类型' })
  @Prop()
  name: string;

  @ApiProperty({ description: '分类名' })
  @IsNotEmpty({ message: '请输入分类名' })
  @IsString({ message: 'icon类型必须为string类型' })
  @Prop()
  icon: string;

  @ApiProperty({ description: '店id' })
  @IsNotEmpty({ message: '请输入店id' })
  @IsString({ message: 'petsId类型必须为string类型' })
  @Prop()
  petsId: string;

  @ApiProperty({ description: '启用状态' })
  @IsNotEmpty({ message: '请选择启用状态' })
  @IsString({ message: 'status类型必须为string类型' })
  @Prop({ default: true })
  status: boolean;

  @ApiProperty({ description: '是否删除', example: false })
  @IsNotEmpty({ message: '请选择是否删除' })
  @IsString({ message: 'is_delete类型必须为boolean类型' })
  @Prop({ default: false })
  is_delete: boolean;
}
