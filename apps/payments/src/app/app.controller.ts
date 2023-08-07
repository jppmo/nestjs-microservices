import { Controller, Get, ValidationPipe } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PaymentWithUser } from '@nestjs-microservices/shared/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('process-payment')
  async handleProcessPayment(@Payload(ValidationPipe) data: PaymentWithUser) {
    await this.appService.processPayment(data);
  }
}
