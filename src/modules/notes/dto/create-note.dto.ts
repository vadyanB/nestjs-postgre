import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

import { ShouldExistValidator } from '../../shared/validators/should-exist-validator';
import { TopicsService } from '../../topics/topics.service';

export class CreateNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Validate(ShouldExistValidator, [
    {
      service: TopicsService,
    },
  ])
  topicId: number;
}
