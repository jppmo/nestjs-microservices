/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface GetAllPostsDto {
  noArguments: number;
}

export interface PostsAll {
  posts: Post[];
}

export interface PostsUser {
  posts: Post[];
}

export interface UpdatePostDto {
  post: Post | undefined;
}

export interface DeletePostDto {
  postId: number;
}

export interface GetUserPostsDto {
  userId: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  user: User | undefined;
}

export interface GetPostDto {
  postId: number;
}

export interface CreatePostDto {
  title: string;
  content: string;
  userId: number;
}

export interface AuthResponse {
  error?: ErrorResponse | undefined;
  authUser?: AuthUser | undefined;
}

export interface ErrorResponse {
  code: number;
  message: string;
}

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

  signInUser(request: SignInUserDto): Observable<AuthResponse>;

  verifyToken(request: VerifyTokenDto): Observable<Payload>;

  createPost(request: CreatePostDto): Observable<Post>;

  getPost(request: GetPostDto): Observable<Post>;

  getUserPosts(request: GetUserPostsDto): Observable<PostsUser>;

  deletePost(request: DeletePostDto): Observable<Post>;

  updatePost(request: UpdatePostDto): Observable<Post>;

  getAllPosts(request: GetAllPostsDto): Observable<PostsAll>;
}

export interface UsersServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findUser(request: FindUserDto): Promise<User> | Observable<User> | User;

  signInUser(request: SignInUserDto): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  verifyToken(request: VerifyTokenDto): Promise<Payload> | Observable<Payload> | Payload;

  createPost(request: CreatePostDto): Promise<Post> | Observable<Post> | Post;

  getPost(request: GetPostDto): Promise<Post> | Observable<Post> | Post;

  getUserPosts(request: GetUserPostsDto): Promise<PostsUser> | Observable<PostsUser> | PostsUser;

  deletePost(request: DeletePostDto): Promise<Post> | Observable<Post> | Post;

  updatePost(request: UpdatePostDto): Promise<Post> | Observable<Post> | Post;

  getAllPosts(request: GetAllPostsDto): Promise<PostsAll> | Observable<PostsAll> | PostsAll;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "findUser",
      "signInUser",
      "verifyToken",
      "createPost",
      "getPost",
      "getUserPosts",
      "deletePost",
      "updatePost",
      "getAllPosts",
    ];
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
