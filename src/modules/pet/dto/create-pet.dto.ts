import { Admin } from '../../admin/models/admin.model';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Ref } from '@typegoose/typegoose';

export class CreatePetDto {

  @ApiProperty({ description: "宠物店名称", example: "宠物" })
  @IsNotEmpty({ message: "名称不能为空" })
  name: string;

  @ApiProperty({ description: "宠物店图片" })
  @IsNotEmpty({ message: "封面不能为空" })
  imgUrl: string;

  @ApiProperty({ description: "宠物店地址", example: "湖南省xx市xx县xx" })
  @IsNotEmpty({ message: "地址不能为空" })
  address: string;

  @ApiProperty({ description: "经度", example: 104.6 })
  @IsNotEmpty({ message: "经度不能为空" })
  longitude: number;

  @ApiProperty({ description: "纬度", example: 32.4 })
  @IsNotEmpty({ message: "纬度不能为空" })
  latitude: number;

  @ApiProperty({ description: "联系电话", example: "17612345678" })
  @IsPhoneNumber("CN", { message: "手机格式不正确" })
  phone: string;

  @ApiProperty({ description: "店铺管理员id", required: true })
  adminList?: Ref<Admin>[]

  @ApiProperty({ description: "邮箱地址", required: true })
  @IsEmail({}, { message: "邮箱格式不正确" })
  email: string;

  @ApiProperty({ description: "营业时间", required: false, example: ["8:00", "22:00"] })
  dailyHours?: string[]

  @ApiProperty({ description: "是否删除", required: false, default: false })
  is_delete?: boolean

  @ApiProperty({ description: "启用/禁用", required: false, default: true })
  status?: boolean;

  @ApiProperty({ description: "审核是否通过", required: false, default: false })
  verify?: false

  @ApiProperty({ description: "宠物店标签", required: false, example: ["便携", "服务周到"] })
  tags?: string[];

  @ApiProperty({ description: "店详情介绍", required: false, example: "地理位置优越,服务态度好" })
  detail?: string;
}
