import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePetDto {

  @ApiProperty({ description: "宠物店名称" })
  @IsNotEmpty({message:"名称不能为空"})
  name: string;

  @ApiProperty({ description: "宠物店图片" })
  imgUrl: string;

  @ApiProperty({ description: "宠物店地址" })
  address: string;

  @ApiProperty({ description: "经度" })
  longitude: number;

  @ApiProperty({ description: "纬度" })
  latitude: number;

  @ApiProperty({ description: "营业时间", required: false })
  dailyHours?: Array<String>

  @ApiProperty({ description: "联系电话" })
  phone: string;

  @ApiProperty({ description: "宠物店标签", required: false })
  tags?: Array<String>;

  @ApiProperty({ description: "店详情介绍", required: false })
  detail?: string;

}
