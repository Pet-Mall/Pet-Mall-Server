import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemLogDto {
  @ApiProperty({ description: '请求方式' })
  methodName: string;

  @ApiProperty({ description: 'url' })
  url: string;

  @ApiProperty({ description: '请求ip地址' })
  ip: string;

  @ApiProperty({ description: '状态码' })
  statusCode: number;

  @ApiProperty({ description: '请求参数' })
  params: string;
}
