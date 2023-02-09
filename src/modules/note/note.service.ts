import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Note } from '../entities/note.entity';
import { User } from '../entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteIdDto } from './dto/note-id.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findOne(filter: { [key: string]: string | number | NoteIdDto }) {
    return this.noteRepository.findOne({
      where: filter,
    });
  }

  getNotesBy(filter: { [key: string]: string | number }) {
    return this.noteRepository.find({
      where: filter,
    });
  }

  createNote(user: User, body: CreateNoteDto) {
    const createdPost = this.noteRepository.create({
      ...body,
      userId: user.id,
    });

    return this.noteRepository.save(createdPost);
  }

  async patchNote(id, note) {
    await this.noteRepository.update(id, note);
    return this.findOne(id);
  }

  async deleteNote(id, res) {
    await this.noteRepository.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send({ status: 'success' });
  }
}
