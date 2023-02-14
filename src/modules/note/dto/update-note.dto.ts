import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';

import { ShouldExistValidator } from '../../shared/validators/should-exist-validator';
import { TopicsService } from '../../topics/topics.service';

export class UpdateNoteDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  text: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Validate(ShouldExistValidator, [
    {
      service: TopicsService,
    },
  ])
  topicId: number;
}
