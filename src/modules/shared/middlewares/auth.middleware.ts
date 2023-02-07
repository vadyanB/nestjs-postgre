import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
import { NextFunction } from 'express';

import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async use(
    req: Request & { headers: { authorization: string }; user: any },
    res: Response,
    next: NextFunction,
  ) {
    const token = this.authService.getToken(req.headers.authorization);
    if (!token) {
      return next();
    }
    const user = await this.userService.getUserBy({ token });
    if (!user) {
      return next();
    }

    req.user = user;
    next();
  }
}
