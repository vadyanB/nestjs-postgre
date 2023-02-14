import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const skipGlobalGuard = this.reflector.get(
      'skipGlobalGuard',
      context.getHandler(),
    );
    const user = request.user;

    if (skipGlobalGuard) {
      return true;
    } else if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
