import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
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
