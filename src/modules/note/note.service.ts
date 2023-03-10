import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Note } from '../entities/note.entity';
import { User } from '../entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findOne(filter: Partial<Note>) {
    return this.noteRepository.findOne({
      where: filter,
    });
  }

  getNotesBy(filter: Partial<Note>) {
    return this.noteRepository.find({
      where: filter,
    });
  }

  async createNote(user: User, body: CreateNoteDto) {
    const createdPost = this.noteRepository.create({
      ...body,
      user: { id: user.id },
      topic: { id: body.topicId },
    });

    await this.noteRepository.save(createdPost);
    return this.findOne({ id: createdPost.id });
  }

  async patchNote(id, note, user) {
    const { text, title, topicId } = note;
    await this.checkIsUserOwner(id, user.id);
    await this.noteRepository.update(id, {
      text,
      title,
      topic: { id: topicId },
    });
    return this.findOne({ id });
  }

  async deleteNote(id, res, user) {
    await this.checkIsUserOwner(id, user.id);
    await this.noteRepository.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send({ status: 'success' });
  }

  async checkIsUserOwner(id, userId) {
    const note = await this.findOne({ id });
    if (note.userId !== userId) {
      throw new ForbiddenException('you are not owner');
    }
  }
}
