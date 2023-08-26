import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { ClientKafka } from '@nestjs/microservices';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, {
        provide: 'PAYMENT_MICROSERVICE',
        useValue: {
          emit: jest.fn(),
        }
      }],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
