import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../../../proto/auth.proto'),
        package: 'auth',
      }
    }
    // {
    //   transport: Transport.KAFKA,
    //   options: {
    //     client: {
    //       brokers: ['localhost:29092'],
    //     },
    //     consumer: {
    //       groupId: 'auth-consumer',
    //     },
    //   },
    // }
  );

  // const app2 = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         brokers: ['localhost:29092'],
  //       },
  //       consumer: {
  //         groupId: 'auth-consumer',
  //       },
  //     },
  //   }
  // );

  // await app2.listen();
  await app.listen();

  Logger.log(
    `👮 Auth service is running!`
  );
}

bootstrap();
