import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class SystemLog {
  @ApiProperty({ description: '请求方式' })
  @prop()
  methodName: string;

  @ApiProperty({ description: 'url' })
  @prop()
  url: string;

  @ApiProperty({ description: '请求ip地址' })
  @prop()
  ip: string;

  @ApiProperty({ description: '状态码' })
  @prop()
  statusCode: number;

  @ApiProperty({ description: '请求参数' })
  @prop()
  params: string;
}
