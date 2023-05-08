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
import { Topic } from './topic.entity';

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
  @Column()
  userId: number;

  @ManyToOne(() => Topic, {
    lazy: true,
    onDelete: 'SET NULL',
  })
  topic?: Topic;

  @RelationId((note: Note) => note.topic)
  @Column()
  topicId: number;
}
