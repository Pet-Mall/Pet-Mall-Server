import { ApiProperty } from '@nestjs/swagger';
import { Ref } from '@typegoose/typegoose';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';
import { Role } from '../../role/models/role.model';
import { Pet } from '../../pet/models/petstore.model';
export class CreateAdminDto {
  @ApiProperty({ description: '账号', })
  @IsNotEmpty({ message: '账号不能为空' })
  account: string;

  @ApiProperty({ description: '密码', })
  @Length(6, 10000, { message: '密码长度至少大于6位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '用户名', })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '用户头像', })
  @IsNotEmpty({ message: '头像不能为空' })
  avatar: string;

  @ApiProperty({ description: '角色ID', example: "" })
  @IsNotEmpty({ message: '角色不能为空' })
  roleId: Ref<Role>;

  @ApiProperty({ description: '手机号', })
  @IsPhoneNumber('CN', { message: '手机格式不正确' })
  phone: string;

  @ApiProperty({
    description: '所属店铺Id',
    example: ""
  })
  @IsNotEmpty({ message: '店铺id不能为空' })
  petsId: Ref<Pet>;

  @ApiProperty({ description: '是否删除', required: false, default: false })
  is_delete?: boolean;

  @ApiProperty({ description: '启用/禁用', required: false, default: true })
  status?: boolean;

  @ApiProperty({ description: '密码盐', })
  password_salt?: string;
}

export class LoginDto {
  @ApiProperty({ description: '账号', })
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须为string类型' })
  readonly account: string;

  @ApiProperty({ description: '密码', })
  @Length(6, 10000, { message: '密码长度至少大于6位' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须为string类型' })
  readonly password: string;
}
