import { ApiProperty } from '@nestjs/swagger';
import { Ref } from '@typegoose/typegoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/modules/role/models/role.model';

export class CreateMenuDto {
  @ApiProperty({ description: '菜单名', example: '系统设置', required: true })
  @IsNotEmpty({ message: 'name不能为空' })
  @IsString({ message: 'name必须是string类型' })
  name: string;

  @ApiProperty({ description: '父级菜单id', example: '0', required: true })
  @IsNotEmpty({ message: 'parentId不能为空' })
  @IsString({ message: 'parentId必须是string类型' })
  parentId: string;

  @ApiProperty({ description: 'icon', example: 'file-text', required: false })
  icon: string;

  @ApiProperty({ description: '路由链接', example: 'setting', required: true })
  path: string;

  @ApiProperty({
    description: '跳转页面link',
    example: 'http://www.baidu.com',
    required: false,
  })
  url: string;

  @ApiProperty({ description: '是否删除', example: false, required: false })
  is_delete: boolean;

  @ApiProperty({ description: '状态', example: true, required: false })
  status: boolean;

  @ApiProperty({ description: '是否需要鉴权', example: true, required: false })
  requiresAuth: boolean;

  @ApiProperty({
    description: '国际化菜单名',
    example: 'menu.dashboard',
    required: true,
  })
  locale: boolean;

  @ApiProperty({
    description: '是否隐藏菜单项目',
    example: false,
    required: false,
  })
  hideInMenu: boolean;

  @ApiProperty({ description: '权限角色', example: ['admin'], required: false })
  rolesIdList: Ref<Role>[];
}
