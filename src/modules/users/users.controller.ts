import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUserShrinkBy(id);
  }

  @Get()
  getUsers() {
    return this.userService.getUsersShrink();
  }
}
