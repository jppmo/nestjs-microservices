import { PaymentDto } from "../dto";

export interface PaymentWithUser extends PaymentDto {
  userId: number;
  username: string;
}

export interface PaymentResponse {
  username: string;
  amount: number;
}