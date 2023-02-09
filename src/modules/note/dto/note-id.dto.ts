import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';

import { ShouldExistValidator } from '../../shared/validators/should-exist-validator';
import { NoteService } from '../note.service';

export class NoteIdDto {
  @ApiProperty()
  @Validate(ShouldExistValidator, [
    {
      service: NoteService,
    },
  ])
  id: number;
}
