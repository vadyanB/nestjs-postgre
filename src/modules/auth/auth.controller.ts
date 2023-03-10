import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { User } from '../shared/entities/user.entity';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { IsAuthorized } from '../shared/decorators/is-authorized.decorator';
import { AuthService } from './auth.service';
import { UserSignUpInput } from './dto/user-sign-up.input';
import { UserLoginInput } from './dto/user-login.input';

@ApiTags('')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @IsAuthorized(true)
  async signup(@Body() body: UserSignUpInput) {
    return this.authService.userSignUp(body);
  }

  @Post('login')
  @IsAuthorized(true)
  async login(@Body() body: UserLoginInput) {
    return this.authService.userLogin(body);
  }

  @ApiBearerAuth()
  @Post('logout')
  async logout(@CurrentUser() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }
}
