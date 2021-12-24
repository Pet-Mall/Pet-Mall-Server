import { AuthGuard } from '@nestjs/passport';
import { QuerySystemLogDto } from './dto/query-system-log.dto';
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SystemLogsService } from './system-logs.service';
import { CreateSystemLogDto } from './dto/create-system-log.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("系统日志")
@Controller('system-logs')
export class SystemLogsController {
  constructor(private readonly systemLogsService: SystemLogsService) { }

  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "自定义分页" })
  @Get("customer-page")
  async customerPage(@Param() query: QuerySystemLogDto) {
    return await this.systemLogsService.customerPage(query);
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "创建日志" })
  @Post("create")
  async create(@Body() createSystemLogDto: CreateSystemLogDto) {
    return await this.systemLogsService.create(createSystemLogDto);
  }

}
