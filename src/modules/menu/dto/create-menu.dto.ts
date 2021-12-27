import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsNotEmpty({ message: 'router不能为空' })
  @IsString({ message: 'router必须是string类型' })
  router: string;

  @ApiProperty({
    description: '跳转页面link',
    example: 'http://www.baidu.com',
    required: false,
  })
  url: string;

  @ApiProperty({ description: '是否删除', example: false, required: false })
  is_delete: boolean;
}
