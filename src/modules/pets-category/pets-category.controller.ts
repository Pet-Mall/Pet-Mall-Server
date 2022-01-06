import { QueryPetsCategory } from './dto/query-pets-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { PetsCategoryService } from './pets-category.service';
import { CreatePetsCategoryDto } from './dto/create-pets-category.dto';
import { UpdatePetsCategoryDto } from './dto/update-pets-category.dto';

@ApiTags("分类")
@ApiBearerAuth()
@Controller('pets-category')
export class PetsCategoryController {
  constructor(private readonly petsCategoryService: PetsCategoryService) { }

  @ApiOperation({ summary: "自定义分页" })
  @UseGuards(AuthGuard("jwt"))
  @Get("customer-page")
  customerPage(@Query() query: QueryPetsCategory, @Request() req) {
    return this.petsCategoryService.customerPage(query, req.user)
  }

  @ApiOperation({ summary: "新建" })
  @UseGuards(AuthGuard("jwt"))
  @Post("create")
  create(@Body(new ValidationPipe()) createPetsCategoryDto: CreatePetsCategoryDto, @Request() req) {
    return this.petsCategoryService.create(createPetsCategoryDto, req.user);
  }

  @ApiOperation({ summary: "列表" })
  @UseGuards(AuthGuard("jwt"))
  @Get("list")
  findAll(@Request() req) {
    return this.petsCategoryService.findAll(req.user);
  }

  @ApiOperation({ summary: "详情" })
  @UseGuards(AuthGuard("jwt"))
  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.petsCategoryService.findOne(id);
  }

  @ApiOperation({ summary: "更新" })
  @UseGuards(AuthGuard("jwt"))
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePetsCategoryDto: UpdatePetsCategoryDto) {
    return this.petsCategoryService.update(id, updatePetsCategoryDto);
  }

  @ApiOperation({ summary: "删除" })
  @UseGuards(AuthGuard("jwt"))
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.petsCategoryService.remove(id);
  }
}
