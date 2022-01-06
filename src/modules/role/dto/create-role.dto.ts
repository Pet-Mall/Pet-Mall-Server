import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Ref } from '@typegoose/typegoose';
import { Pet } from '../../pet/models/petstore.model';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名', example: 'superAdmin', required: true })
  @IsNotEmpty({ message: '角色名不能为空' })
  @IsString({ message: 'name必须是string类型' })
  name: string;

  @ApiProperty({ description: 'code码', example: '1001', required: true })
  @IsNotEmpty({ message: 'code码不能为空' })
  @IsString({ message: 'code必须是string类型' })
  code: string;

  @ApiProperty({ description: '备注', example: '超级管理员', required: false })
  remark: string;

  @ApiProperty({
    description: '菜单列表',
    example: ['1', '2', '3'],
    required: false,
  })
  menuList: string[];

  @ApiProperty({
    description: '宠物店ID',
    required: true,
  })
  @IsNotEmpty({ message: '宠物店ID不能为空' })
  petsId: Ref<Pet>;

  @ApiProperty({ description: '是否删除', required: false, example: false })
  @IsBoolean({ message: 'is_delete必须是boolean值' })
  is_delete: boolean;
}
