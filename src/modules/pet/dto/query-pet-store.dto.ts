import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsPhoneNumber } from 'class-validator';

export class QueryDto {
  @ApiProperty({ description: '当前页', example: 1 })
  readonly current: number = 1;

  @ApiProperty({ description: '页数', example: 10 })
  readonly size: number = 10;

  @ApiProperty({ description: '名称', required: false })
  readonly name: string;

  @ApiProperty({ description: '手机号', required: false })
  @IsPhoneNumber('CN', { message: 'Phone格式不正确' })
  readonly phone: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail({ message: 'Email格式不正确' })
  readonly email: string;

  @ApiProperty({ description: '状态', required: false })
  readonly status: boolean;

  @ApiProperty({ description: '审核状态', required: false })
  @IsNumber({}, { message: '必须是number类型' })
  readonly verify: number;
}
