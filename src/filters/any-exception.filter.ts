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

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  constructor(private readonly systemLogsService: SystemLogsService) {}
  catch(exception: unknown, host: ArgumentsHost) {
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
    response.status(status).json({
      statusCode: status,
      msg: `Service Error: ${exception}`,
    });
  }
}
