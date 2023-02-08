import { Global, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TopicsModule } from '../topics/topics.module';
import { NoteModule } from '../note/note.module';

const modules = [UserModule, AuthModule, TopicsModule, NoteModule];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
