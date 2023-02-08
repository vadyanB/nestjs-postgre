import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetNotesQueryDto {
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsInt()
  @Type(() => Number)
  topicId: number;
}
