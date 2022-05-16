import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, Prop, Ref } from '@typegoose/typegoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/modules/role/models/role.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Menu {
  @ApiProperty({
    description: '路由名称',
    example: 'dashboard',
    required: true,
  })
  @IsNotEmpty({ message: 'name不能为空' })
  @IsString({ message: 'name必须是string类型' })
  @Prop()
  name: string;

  @ApiProperty({ description: '父级菜单id', example: '0', required: true })
  @IsNotEmpty({ message: 'parentId不能为空' })
  @IsString({ message: 'parentId必须是string类型' })
  @Prop({ default: '0' })
  parentId: string;

  @ApiProperty({ description: 'icon', example: 'file-text', required: false })
  @Prop({ required: false })
  icon: string;

  @ApiProperty({
    description: '路由链接',
    example: 'dashboard',
    required: true,
  })
  @Prop()
  path: string;

  @ApiProperty({
    description: '跳转页面link',
    example: 'http://www.baidu.com',
    required: false,
  })
  @Prop({ required: false, default: null })
  url: string;

  @ApiProperty({ description: '是否删除', example: false, required: false })
  @Prop({ default: false })
  is_delete: boolean;

  @ApiProperty({ description: '状态', example: true, required: false })
  @Prop({ default: true })
  status: boolean;

  @ApiProperty({ description: '是否需要鉴权', example: true, required: false })
  @Prop({ default: false })
  requiresAuth: boolean;

  @ApiProperty({
    description: '国际化菜单名',
    example: 'menu.dashboard',
    required: true,
  })
  @Prop()
  locale: string;

  @ApiProperty({
    description: '是否隐藏菜单项目',
    example: false,
    required: false,
  })
  @Prop()
  hideInMenu: boolean;

  @ApiProperty({ description: '权限角色', example: ['admin'], required: false })
  @Prop({ ref: () => Role })
  rolesIdList: Ref<Role>[];
}
