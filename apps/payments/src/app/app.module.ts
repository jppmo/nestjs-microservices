import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payments/entities/payment.entity';

@Module({
  imports: [
    PaymentsModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      database: process.env.MONGODB_DBNAME,
      entities: [
        Payment,
      ],
      authSource: "admin",
      directConnection: true,
      synchronize: false
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: process.env.MONGODB_HOST,
    //   port: parseInt(process.env.MONGODB_PORT),
    //   username: process.env.MONGODB_USER,
    //   password: process.env.MONGODB_PASSWORD,
    //   database: process.env.MONGODB_DATABASE,
    //   authSource: "admin",
    //   entities: [Payment],
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
