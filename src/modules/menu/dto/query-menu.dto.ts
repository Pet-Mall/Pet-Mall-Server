import { ApiProperty } from '@nestjs/swagger';
export class QueryMenuDto {
  @ApiProperty({ description: '当前页', example: 1, required: true })
  current = 1;

  @ApiProperty({ description: '页数', example: 10, required: true })
  size = 10;
}