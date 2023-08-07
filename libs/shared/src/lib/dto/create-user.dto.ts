import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsAlphanumeric()
  password: string;
}