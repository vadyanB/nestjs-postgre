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

import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNotesQueryDto } from './dto/get-notes-query.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteIdDto } from './dto/note-id.dto';

@ApiBearerAuth()
@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly postService: NoteService) {}

  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'topicId', required: false })
  @Get()
  getNotes(@Query() queryParams: GetNotesQueryDto) {
    const { userId, topicId } = queryParams;
    return this.postService.getNotesBy({ userId, topicId });
  }

  @Get(':id')
  getNote(@Param('id') id: number) {
    return this.postService.findOne({ id });
  }

  @Patch(':id')
  patchNote(
    @Param() { id }: NoteIdDto,
    @Body() body: UpdateNoteDto,
    @CurrentUser() user: User,
  ) {
    return this.postService.patchNote(id, body, user);
  }

  @Delete(':id')
  deleteNote(
    @Param() { id }: NoteIdDto,
    @Res() res: Response,
    @CurrentUser() user: User,
  ) {
    return this.postService.deleteNote(id, res, user);
  }

  @Post()
  createNote(@CurrentUser() user: User, @Body() body: CreateNoteDto) {
    return this.postService.createNote(user, body);
  }
}
