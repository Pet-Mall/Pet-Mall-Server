import { CommonService } from './common.service';
import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/FileUploadDto';
import { join } from 'path';
import { createWriteStream } from 'fs';

// @ApiBearerAuth()
@ApiTags('公共模块')
@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService
  ) { }

  // @UseGuards(AuthGuard("jwt"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '文件上传',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: "文件上传" })
  @Post("upload")
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log("🚀 ~ file: common.controller.ts ~ line 28 ~ CommonController ~ uploadFile ~ req", req);
    if (body.name) {
      const writeImage = createWriteStream(join(__dirname, '..', 'static', `${file.originalname}`))
      writeImage.write(file.buffer)
      return `${req.headers.origin}/${file.originalname}`
    }
  }
}