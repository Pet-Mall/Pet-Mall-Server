import { ApiProperty } from '@nestjs/swagger';
import { prop, modelOptions } from '@typegoose/typegoose';
@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: "createdAt",
      currentTime: () => new Date().getTime()
    }
  }
})
export class Pet {
  @ApiProperty({ description: "宠物店名称", example: "宠物" })
  @prop()
  name: string;

  @ApiProperty({ description: "宠物店图片" })
  @prop()
  imgUrl: string;

  @ApiProperty({ description: "宠物店地址", example: "湖南省xx市xx县xx" })
  @prop()
  address: string;

  @ApiProperty({ description: "经度", example: 104.6 })
  @prop()
  longitude: number;

  @ApiProperty({ description: "纬度", example: 32.4 })
  @prop()
  latitude: number;

  @ApiProperty({ description: "营业时间", required: false, example: ["8:00", "22:00"] })
  @prop()
  dailyHours?: Array<String>

  @ApiProperty({ description: "联系电话", example: "17612345678" })
  @prop()
  phone: string;

  @ApiProperty({ description: "宠物店标签", required: false, example: ["便携", "服务周到"] })
  @prop()
  tags?: Array<String>;

  @ApiProperty({ description: "店详情介绍", required: false, example: "地理位置优越,服务态度好" })
  @prop()
  detail?: string;

  @ApiProperty({ description: "店长id", required: true })
  @prop()
  shopOwnerId: string;

  @ApiProperty({ description: "是否删除", required: false, default: false })
  @prop()
  is_delete?: boolean;

  @ApiProperty({ description: "审核是否通过", required: false, default: false })
  @prop()
  verify?: false
}