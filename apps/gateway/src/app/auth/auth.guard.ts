import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponse, VerifyTokenDto } from "@nestjs-microservices/shared/types";



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request) || this.extractTokenFromCookie(request);

    
    if (!token) {
      throw new UnauthorizedException();
    }
    try {

      const tokenDto: VerifyTokenDto = {
        token
      };

      const payload = await this.authService.verifyToken(tokenDto);
      
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(request): string | undefined {
    const [name, token] = request.headers.cookie?.split('=') ?? [];
    return name === 'token' ? token : undefined;
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  
}