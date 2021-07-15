import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const PORT = process.env.PORT || 3000

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
   // whitelist: true  ignore properties not defined
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors();

  await app.listen(PORT);
}
bootstrap();
