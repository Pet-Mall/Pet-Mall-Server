import { ApiProperty } from '@nestjs/swagger';
export class QueryRoleDto {
  @ApiProperty({ description: "当前页", example: 1 })
  current: number = 1;

  @ApiProperty({ description: "页数", example: 10 })
  size: number = 10;

}