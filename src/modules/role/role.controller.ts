import { QueryRoleDto } from './dto/query-role.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiBearerAuth()
@ApiTags('用户角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @ApiOperation({ summary: "自定义分页" })
  @UseGuards(AuthGuard('jwt'))
  @Get("customer-page")
  async customerPage(@Query() query: QueryRoleDto, @Request() req) {
    return await this.roleService.customerPage(query, req.user)
  }

  @ApiOperation({ summary: "新增" })
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: "列表" })
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: "详情" })
  @UseGuards(AuthGuard('jwt'))
  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @ApiOperation({ summary: "更新" })
  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: "删除" })
  @UseGuards(AuthGuard('jwt'))
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
