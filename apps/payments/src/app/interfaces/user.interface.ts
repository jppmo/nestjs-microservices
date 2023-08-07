import { PaymentDto } from "@nestjs-microservices/shared/dto";

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface PaymentWithUser extends PaymentDto {
  userId: number;
  username: string;
}