import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Topic } from '../shared/entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
  ) {}

  getTopics() {
    return this.topicsRepository.createQueryBuilder('topic').getMany();
  }

  findOne(filter: Partial<Topic>) {
    return this.topicsRepository.findOne({
      where: filter,
    });
  }
}
