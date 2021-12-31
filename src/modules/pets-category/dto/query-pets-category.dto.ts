import { ApiProperty } from '@nestjs/swagger';
export class QueryPetsCategory {
  @ApiProperty({ description: "当前页", example: 1 })
  readonly current: number = 1

  @ApiProperty({ description: "页数", example: 10 })
  readonly size: number = 10
}