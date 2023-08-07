import { PaymentDto } from '@nestjs-microservices/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaymentResponse, PaymentWithUser } from '@nestjs-microservices/shared/types';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_MICROSERVICE') private readonly paymentClient: ClientKafka
  ) {}

  makePayment(payment: PaymentWithUser): PaymentResponse {
    const response: PaymentResponse = {
      username: payment.username,
      amount: payment.amount
    }
    this.paymentClient.emit('process-payment', JSON.stringify(payment));
    return response;
  }
}
