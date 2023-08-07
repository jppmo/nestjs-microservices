/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface Payload {
  sub: string;
  username: string;
  exp: number;
}

export interface VerifyTokenDto {
  token: string;
}

export interface AuthUser {
  id: number;
  token: string;
}

export interface SignInUserDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface FindUserDto {
  id: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UsersServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findUser(request: FindUserDto): Observable<User>;

  signInUser(request: SignInUserDto): Observable<AuthUser>;

  verifyToken(request: VerifyTokenDto): Observable<Payload>;
}

export interface UsersServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findUser(request: FindUserDto): Promise<User> | Observable<User> | User;

  signInUser(request: SignInUserDto): Promise<AuthUser> | Observable<AuthUser> | AuthUser;

  verifyToken(request: VerifyTokenDto): Promise<Payload> | Observable<Payload> | Payload;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findUser", "signInUser", "verifyToken"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
