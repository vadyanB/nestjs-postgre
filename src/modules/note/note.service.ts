import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Optional } from '../../types/types';
import { Note } from '../entities/note.entity';
import { User } from '../entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findOne(filter: Optional<Note>) {
    return this.noteRepository.findOne({
      where: filter,
    });
  }

  getNotesBy(filter: Optional<Note>) {
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

  async patchNote(id, note, user) {
    await this.checkIsUserOwner(id, user.id);
    await this.noteRepository.update(id, note);
    return this.findOne({ id });
  }

  async deleteNote(id, res, user) {
    await this.checkIsUserOwner(id, user.id);
    await this.noteRepository.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send({ status: 'success' });
  }

  async checkIsUserOwner(id, userId) {
    const note = await this.findOne({ id });
    if (note.user !== userId) {
      throw new ForbiddenException('you are not owner');
    }
  }
}
