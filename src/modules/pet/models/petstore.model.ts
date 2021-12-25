import { Admin } from '../../admin/models/admin.model';
import { ApiProperty } from '@nestjs/swagger';
import { prop, modelOptions, Ref } from '@typegoose/typegoose';
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Pet {
  @ApiProperty({ description: '宠物店名称', example: '宠物' })
  @prop()
  name: string;

  @ApiProperty({ description: '宠物店图片' })
  @prop()
  imgUrl: string;

  @ApiProperty({ description: '宠物店地址', example: '湖南省xx市xx县xx' })
  @prop()
  address: string;

  @ApiProperty({ description: '经度', example: 104.6 })
  @prop()
  longitude: number;

  @ApiProperty({ description: '纬度', example: 32.4 })
  @prop()
  latitude: number;

  @ApiProperty({ description: '联系电话', example: '17612345678' })
  @prop()
  phone: string;

  @ApiProperty({
    description: '店详情介绍',
    required: false,
    example: '地理位置优越,服务态度好',
  })
  @prop()
  detail?: string;

  @ApiProperty({ description: '店铺管理员id', required: true })
  @prop({ ref: () => Admin })
  adminId: Ref<Admin>;

  @ApiProperty({ description: '邮箱地址', required: true })
  @prop()
  email: string;

  @ApiProperty({ description: '是否删除', required: false, default: false })
  @prop({ default: false })
  is_delete?: boolean;

  @ApiProperty({ description: '启用/禁用', required: false, default: true })
  @prop({ default: true })
  status?: boolean;

  @ApiProperty({ description: '审核是否通过', required: false, default: false })
  @prop({ default: false })
  verify?: false;

  @ApiProperty({
    description: '宠物店标签',
    required: false,
    example: ['便携', '服务周到'],
  })
  @prop({ type: () => [String] })
  tags?: string[];

  @ApiProperty({
    description: '营业时间',
    required: false,
    example: ['8:00', '22:00'],
  })
  @prop({ type: () => [String] })
  dailyHours?: string[];
}
