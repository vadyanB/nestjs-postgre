import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiQuery } from '@nestjs/swagger/dist/decorators/api-query.decorator';
import { Response } from 'express';

import { NoteService } from './note.service';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesQueryDto } from './dto/get-notes-query.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly postService: NoteService) {}

  @Get(':id')
  getNote(@Param('id') id: number) {
    return this.postService.getNoteBy({ id });
  }

  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'topicId', required: false })
  @Get()
  getNotes(@Query() queryParams: GetNotesQueryDto) {
    const { userId, topicId } = queryParams;
    return this.postService.getNotesBy({ userId, topicId });
  }

  @Patch(':id')
  patchNote(
    @CurrentUser()
    @Param('id')
    id: number,
    @Body() body: UpdateNoteDto,
  ) {
    return this.postService.patchNote(id, body);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: number, @Res() res: Response) {
    return this.postService.deleteNote(id, res);
  }

  @ApiBearerAuth()
  @Post()
  createNote(@CurrentUser() user: User, @Body() body: CreateNoteDto) {
    return this.postService.createNote(user, body);
  }
}
