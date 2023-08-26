import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { AuthService } from '../auth/auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [AuthService, PaymentService, {
        provide: 'auth',
        useValue: ClientsModule
      },
      {
        provide: 'PAYMENT_MICROSERVICE',
        useValue: ClientsModule
      }]
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
