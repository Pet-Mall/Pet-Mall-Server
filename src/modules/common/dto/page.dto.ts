import { ApiProperty } from '@nestjs/swagger';
export class PageDto {
  @ApiProperty({ description: '当前页', example: 1 })
  current: number;

  @ApiProperty({ description: '数量', example: 10 })
  size: number;
}
