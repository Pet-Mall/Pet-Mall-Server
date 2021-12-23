import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启全局数据验证管道
  app.useGlobalPipes(new ValidationPipe())
  // swagger
  const options = new DocumentBuilder()
    .setTitle('Pet-Mall')
    .setDescription('Pet-Mall Server API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // 注册错误请求过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册请求结果拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);

}
bootstrap();
