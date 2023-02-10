import { MigrationInterface, QueryRunner } from 'typeorm';
import { TopicType } from '../src/modules/shared/enum/topic-type.enum';
import { Topic } from '../src/modules/entities/topics.entity';

export class addNoteTypes1676041825317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      Topic,
      queryRunner.manager.create(Topic, [
        { type: TopicType.ToDOList },
        { type: TopicType.Reminds },
        { type: TopicType.WishList },
        { type: TopicType.Thoughts },
        { type: TopicType.Work },
      ]),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "topic"`);
  }
}
