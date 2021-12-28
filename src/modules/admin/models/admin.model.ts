import { ApiProperty } from '@nestjs/swagger';
import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { IsBoolean, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import { Pet } from '../../pet/models/petstore.model';
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Admin {
  @ApiProperty({ description: '账号', example: 'xxxxx@xx.com' })
  @prop()
  @IsNotEmpty({ message: '账号不能为空' })
  account: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @prop()
  @Length(6, 10000, { message: '密码长度至少大于6位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty({ description: '用户名', example: '张三' })
  @prop({ default: '' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '用户头像', example: 'http://xxx.com' })
  @prop()
  @IsNotEmpty({ message: '头像不能为空' })
  avatar: string;

  @ApiProperty({ description: '角色ID', example: '61c3e579784cc8141af1d50f' })
  @prop()
  @IsNotEmpty({ message: '角色不能为空' })
  roleId: string;

  @ApiProperty({ description: '手机号', example: '17612345678' })
  @prop()
  @IsPhoneNumber('CN', { message: '手机格式不正确' })
  phone: string;

  @ApiProperty({ description: '密码盐', example: 'oia4' })
  @prop()
  password_salt: string;

  @ApiProperty({ description: '所属店铺Id' })
  @prop({ ref: () => Pet })
  @IsNotEmpty({ message: '店铺id不能为空' })
  petsId: Ref<Pet>;

  @ApiProperty({ description: '是否删除', required: false, default: false })
  @prop({ select: false })
  @IsBoolean({ message: 'is_delete必须是布尔值' })
  is_delete?: boolean;

  @ApiProperty({ description: '启用/禁用', required: false, default: true })
  @prop()
  @IsBoolean({ message: 'status必须是布尔值' })
  status?: boolean;
}
