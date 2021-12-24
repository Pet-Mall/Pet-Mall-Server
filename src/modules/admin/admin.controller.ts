import { AuthService } from './../../logical/auth/auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  ) {}

  // JWT验证 - Step 1: 用户请求登录
  @ApiOperation({ summary: '后台登录' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
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
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '列表' })
  @Get('list')
  findAll() {
    return this.adminService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
