import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  readonly file: any;

  @ApiProperty({ description: '文件名', example: 'name' })
  readonly name: string;
}
