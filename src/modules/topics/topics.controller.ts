import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { IsAuthorized } from '../shared/decorators/is-authorized.decorator';
import { TopicsService } from './topics.service';

@ApiBearerAuth()
@ApiTags('topics')
@Controller('topics')
@IsAuthorized()
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  getUsers() {
    return this.topicsService.getTopics();
  }
}
