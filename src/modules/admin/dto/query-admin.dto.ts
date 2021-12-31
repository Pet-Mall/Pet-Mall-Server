/**
 * 搜索dto参数
 */
import { ApiProperty } from '@nestjs/swagger';

export class QueryAdminDto {
  @ApiProperty({ description: '当前页', example: 1 })
  readonly current: number = 1;

  @ApiProperty({ description: '页数', example: 10 })
  readonly size: number = 10;

  @ApiProperty({ description: '账号', required: false })
  readonly account: string;

  @ApiProperty({ description: '用户名', required: false })
  readonly username: string;

  @ApiProperty({ description: '手机号', required: false })
  readonly phone: string;

  @ApiProperty({ description: '状态', required: false })
  readonly status: boolean;

  @ApiProperty({ description: '角色名', required: false })
  readonly roleId: string;
}
