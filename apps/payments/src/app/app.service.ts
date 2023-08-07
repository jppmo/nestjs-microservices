import { Injectable } from '@nestjs/common';
import { PaymentsService } from './payments/payments.service';
import { PaymentWithUser } from '@nestjs-microservices/shared/types';


@Injectable()
export class AppService {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  async processPayment(payment: PaymentWithUser) {
    const savePayment = await this.paymentsService.save(payment);
    console.log("PAYMENT PROCESSING");
  }

}
