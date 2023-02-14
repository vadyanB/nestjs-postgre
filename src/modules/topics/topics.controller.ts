import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TopicsService } from './topics.service';

@ApiBearerAuth()
@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  getTopics() {
    return this.topicsService.getTopics();
  }
}
