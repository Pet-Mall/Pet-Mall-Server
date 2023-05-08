import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { QueryMenuDto } from './dto/query-menu.dto';

@ApiBearerAuth()
@ApiTags('菜单')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '自定义分页' })
  @Get('customer-page')
  customerPage(@Query() query: QueryMenuDto) {
    return this.menuService.customerPage(query);
  }

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '新增' })
  @Post('create')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '列表' })
  @Get('list')
  findAll() {
    return this.menuService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '详情' })
  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '更新' })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '删除' })
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
