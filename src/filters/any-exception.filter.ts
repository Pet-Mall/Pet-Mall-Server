import { CreateSystemLogDto } from './../modules/system-logs/dto/create-system-log.dto';
import { SystemLogsService } from './../modules/system-logs/system-logs.service';
// src/filter/any-exception.filter.ts
/**
 * 捕获所有异常
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../utils/log4js';
import { isArray } from 'class-validator';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  constructor(private readonly systemLogsService: SystemLogsService) { }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
     Request original url: ${request.originalUrl}
     Method: ${request.method}
     IP: ${request.ip}
     Status code: ${status}
     Response: ${exception} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
     `;

    const model: CreateSystemLogDto = {
      methodName: request.method,
      url: request.originalUrl,
      ip: request.ip,
      statusCode: status,
      params: JSON.stringify(exception),
    };
    this.systemLogsService.create(model);
    Logger.error(logFormat);

    //  获取类验证器的错误参数
    const exceptionResponse: any = exception.getResponse();
    let validatorMessage: any = exceptionResponse;
    // 如果返回的是类验证器的错误参数是array类型的
    if (isArray(validatorMessage.message)) {
      validatorMessage = exceptionResponse.message[0];
    }
    // 本地策略jwt验证返回的错误信息为object类型
    if (typeof validatorMessage === 'object') {
      validatorMessage = exceptionResponse.message;
    }
    
    const resModel: any = {
      statusCode: status,
      message: validatorMessage || exception.message,
    };
    response.status(status).json(resModel);
  }
}
