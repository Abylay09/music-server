import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });
  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: '*',
  //   credentials: true,
  // });
  // app.enableCors();
  // app.use(function (request: Request, response: Response, next: NextFunction) {
  //   response.setHeader('Access-Control-Allow-Origin', '*');
  //   next();
  // });
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true, // Включить передачу учетных данных (если необходимо)
  // });
  await app.listen(3001);
}
bootstrap();
