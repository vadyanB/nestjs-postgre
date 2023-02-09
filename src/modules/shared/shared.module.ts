import { Global, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TopicsModule } from '../topics/topics.module';
import { NoteModule } from '../note/note.module';
import { ShouldExistValidator } from './validators/should-exist-validator';

const modules = [UserModule, AuthModule, TopicsModule, NoteModule];
const providers = [ShouldExistValidator];

@Global()
@Module({
  imports: [...modules],
  providers: [...providers],
  exports: [...modules, ...providers],
})
export class SharedModule {}
