import { Menu } from '../../menu/models/menu.model';
import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, Prop, Ref } from '@typegoose/typegoose';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Pet } from '../../pet/models/petstore.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Role {
  @ApiProperty({ description: '角色名', example: 'superAdmin', required: true })
  @IsNotEmpty({ message: '角色名不能为空' })
  @Prop()
  name: string;

  @ApiProperty({ description: 'code码', example: '1001', required: true })
  @IsNotEmpty({ message: 'code码不能为空' })
  @Prop()
  code: string;

  @ApiProperty({ description: '备注', example: '超级管理员', required: false })
  @Prop()
  remark: string;

  @ApiProperty({
    description: '宠物店ID',
    example: '61c6b0d4199975b4f9c8e0be',
    required: true,
  })
  @IsNotEmpty({ message: '宠物店ID不能为空' })
  @Prop({ ref: () => Pet })
  petsId: Ref<Pet>;

  @ApiProperty({ description: '菜单列表', example: ['1', '2', '3'] })
  @Prop({ ref: () => Menu })
  menuList: Ref<Menu>[];

  @ApiProperty({ description: '是否删除', required: false, example: false })
  @IsBoolean({ message: 'is_delete必须是boolean值' })
  @Prop({ default: false })
  is_delete: boolean;
}
