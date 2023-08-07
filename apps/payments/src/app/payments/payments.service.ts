import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentWithUser } from '../interfaces/user.interface';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>
  ) {}

  async save(payment: PaymentWithUser) {
    const newPayment = new Payment();
    newPayment.username = payment.username;
    newPayment.userId = payment.userId;
    newPayment.amount = payment.amount;

    return await this.paymentRepository.save(newPayment);
  }
  
  // async findOne(id: number): Promise<User | null> {
  //   return await this.usersRepository.findOneBy({ id });
  // }

  // async findOneByEmail(email: string): Promise<User | null> {
  //   return await this.usersRepository.findOneBy({ email });
  // }

}
