import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtContstants } from './constants';
import { Request } from 'express';
import { log } from 'console';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jswService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    log(request);
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      log('error');
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jswService.verifyAsync(token);
      log(payload);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    log('token', token);
    return type === 'Bearer' ? token : undefined;
  }
}
