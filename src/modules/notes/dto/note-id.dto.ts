import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';

import { ShouldExistValidator } from '../../shared/validators/should-exist-validator';
import { NotesService } from '../notes.service';

export class NoteIdDto {
  @ApiProperty()
  @Validate(ShouldExistValidator, [
    {
      service: NotesService,
    },
  ])
  id: number;
}
