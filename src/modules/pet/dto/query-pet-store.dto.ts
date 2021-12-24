import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  @ApiProperty({ description: '当前页', example: 1 })
  readonly current: number;

  @ApiProperty({ description: '页数', example: 10 })
  readonly size: number;
}
