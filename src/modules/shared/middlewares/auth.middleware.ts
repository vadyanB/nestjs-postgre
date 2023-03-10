import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
import { NextFunction } from 'express';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
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
    const user = await this.usersService.getUserBy({ token });
    if (!user) {
      return next();
    }

    req.user = user;
    next();
  }
}
