import { IsNumberString, IsOptional } from 'class-validator';

export class GetNotesQueryDto {
  @IsOptional()
  @IsNumberString()
  userId: number;

  @IsOptional()
  @IsNumberString()
  topicId: number;
}
