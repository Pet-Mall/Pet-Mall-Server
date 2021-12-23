import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, LoginDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';



@ApiTags("后台用户")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @ApiOperation({ summary: "后台登录" })
  @Post("login")

  login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @ApiOperation({ summary: "新增" })
  @Post("create")
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get("list")
  findAll() {
    return this.adminService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
