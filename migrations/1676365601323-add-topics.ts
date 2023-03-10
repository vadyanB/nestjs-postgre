import { MigrationInterface, QueryRunner } from 'typeorm';
import { Topic } from '../src/modules/shared/entities/topic.entity';
import { TopicType } from '../src/modules/shared/enum/topic-type.enum';

export class addTopics1676365601323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const topics = await queryRunner.manager.save(
      Topic,
      queryRunner.manager.create(Topic, [
        { type: TopicType.Work },
        { type: TopicType.Thoughts },
        { type: TopicType.Reminds },
        { type: TopicType.ToDOList },
        { type: TopicType.WishList },
      ]),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "note" DROP CONSTRAINT "FK_8ac2f2014e176d962765c0028db"
        `);
    await queryRunner.query(`TRUNCATE TABLE "topic";`);
  }
}
