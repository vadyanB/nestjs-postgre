import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../shared/entities/user.entity';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/get-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(
    @Param() {id}: GetUserDto,
    @CurrentUser() user: User,
    ) {
    return id ? this.usersService.getUserShrinkBy(id) : user;
  }

  @Get()
  getUsers() {
    return this.usersService.getUsersShrink();
  }
}
