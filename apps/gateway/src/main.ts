/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import cookieParser from 'cookie-parser'
import { RenderService } from 'nest-next';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  
  app.use(cookieParser());

  const service = app.get(RenderService);

  service.setErrorHandler(async (err, req, res) => {

    res.send(err.response);
    
  });

  await app.startAllMicroservices();
  
  await app.listen(port);
  Logger.log(
    `🚪 Gateway is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
