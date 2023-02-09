import { Global, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TopicsModule } from '../topics/topics.module';
import { NoteModule } from '../note/note.module';
import { ShouldExistValidator } from './validators/should-exist-validator';
import { IsAuthorizedGuard } from './guards/is-authorized.guard';

const modules = [UserModule, AuthModule, TopicsModule, NoteModule];
const providers = [ShouldExistValidator];
const guards = [IsAuthorizedGuard];

@Global()
@Module({
  imports: [...modules],
  providers: [...guards, ...providers],
  exports: [...modules, ...providers],
})
export class SharedModule {}
