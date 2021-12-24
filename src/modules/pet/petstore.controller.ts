import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PetService } from './petstore.service';
import { CreatePetStoreDto } from './dto/create-pet-store.dto';
import { UpdatePetStoreDto } from './dto/update-pet-store.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QueryDto } from './dto/query-pet-store.dto';

@ApiBearerAuth()
@ApiTags('宠物店')
@Controller('pets-store')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '自定义分页' })
  @Get('customer-page')
  async customerPage(@Query() query: QueryDto) {
    return this.petService.customerPage(query);
  }

  @ApiOperation({ summary: '新增' })
  @Post('create')
  async create(
    @Body(new ValidationPipe()) createPetStoreDto: CreatePetStoreDto,
  ) {
    const data = await this.petService.create(createPetStoreDto);
    if (!data) {
      throw new HttpException(
        '该邮箱已被注册,请重新填写!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return data;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '列表' })
  @Get('list')
  findAll() {
    return this.petService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '详情' })
  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.petService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '更新' })
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePetStoreDto: UpdatePetStoreDto,
  ) {
    return this.petService.update(id, updatePetStoreDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '删除' })
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }
}
