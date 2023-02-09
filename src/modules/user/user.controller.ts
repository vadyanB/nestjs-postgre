import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { IsAuthorized } from '../shared/decorators/is-authorized.decorator';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@IsAuthorized()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUserShrinkBy(id);
  }

  @Get()
  getUsers() {
    return this.userService.getUsersShrink();
  }
}
