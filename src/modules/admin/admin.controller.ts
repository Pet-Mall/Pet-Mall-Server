import { QueryAdminDto } from './dto/query-admin.dto';
import { AuthService } from './../../logical/auth/auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, ValidationPipe } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { CreateAdminDto, LoginDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
@ApiBearerAuth()
@ApiTags('后台用户')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '自定义分页' })
  @Get('customer-page')
  async customerPage(@Request() req, @Query(new ValidationPipe()) query: QueryAdminDto) {
    return await this.adminService.customerPage(query, req.user);
  }

  // JWT验证 - Step 1: 用户请求登录
  @ApiOperation({ summary: '后台登录' })
  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    // 校验用户是否存在
    const authResult = await this.authService.validateUser(
      loginDto.account,
      loginDto.password,
    );
    switch (authResult.statusCode) {
      case 200:
        // 如果存在该用户进行签证
        const tokenData = await this.authService.certificate(authResult.data);
        const { _doc } = authResult.data;
        return {
          ..._doc,
          token: tokenData.data,
        };
      default:
        throw new HttpException(authResult.message, authResult.statusCode);
    }
  }

  @ApiOperation({ summary: '新增' })
  @Post('create')
  async create(@Body(new ValidationPipe()) createAdminDto: CreateAdminDto, @Request() req) {
    console.log('CreateAdminDto: ', CreateAdminDto);
    const data = await this.adminService.create(createAdminDto, req.user);
    if (Object.keys(data).length == 0) {
      throw new HttpException(
        '该账户已注册,请重新填写',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      return data;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '列表' })
  @Get('list')
  async findAll(@Request() req) {
    return this.adminService.findAll(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('detail/:id')
  @ApiOperation({ summary: '详情' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  @ApiOperation({ summary: '更新' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove/:id')
  @ApiOperation({ summary: '删除' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('menu-tree')
  @ApiOperation({ summary: '用户角色菜单' })
  async roleMenu() {
    return this.adminService.roleMenu();
  }
}
