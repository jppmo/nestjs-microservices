import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from '@nestjs-microservices/shared/dto';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentWithUser } from '@nestjs-microservices/shared/types'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post('pay')
  makePayment(@Body(ValidationPipe) payment: PaymentDto, @Req() request) {
    console.log("POST - makePayment");
    const paymentWithUser: PaymentWithUser = {
      ...payment,
      userId: request.user.sub,
      username: request.user.username
    };

    console.log(request.user);
    
    return this.paymentService.makePayment(paymentWithUser);
  }

}
