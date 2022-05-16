import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePetsCategoryDto {
  @ApiProperty({ description: '分类名' })
  @IsNotEmpty({ message: '请输入分类名' })
  @IsString({ message: 'name类型必须为string类型' })
  name: string;

  @ApiProperty({ description: '分类名' })
  @IsNotEmpty({ message: '请输入分类名' })
  @IsString({ message: 'icon类型必须为string类型' })
  icon: string;

  @ApiProperty({ description: '店id' })
  @IsNotEmpty({ message: '请输入店id' })
  @IsString({ message: 'petsId类型必须为string类型' })
  petsId: string;

  @ApiProperty({ description: '启用状态', example: true })
  @IsNotEmpty({ message: '请选择启用状态' })
  @IsBoolean({ message: 'status类型必须为boolean类型' })
  status: boolean;

  @ApiProperty({ description: '是否删除', example: false })
  @IsNotEmpty({ message: '请选择是否删除' })
  @IsBoolean({ message: 'is_delete类型必须为boolean类型' })
  is_delete: boolean;
}
