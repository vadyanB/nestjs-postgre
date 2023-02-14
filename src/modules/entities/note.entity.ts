import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Topic } from './topics.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.notes, {
    lazy: true,
  })
  user: User;

  @RelationId((note: Note) => note.user)
  userId: number;

  @ManyToOne(() => Topic, {
    lazy: true,
    onDelete: 'SET NULL',
  })
  topic?: Topic;

  @RelationId((note: Note) => note.topic)
  topicId: number;
}
