import { Global, Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TopicsModule } from '../topics/topics.module';
import { NotesModule } from '../notes/notes.module';
import { ShouldExistValidator } from './validators/should-exist-validator';
import { IsAuthorizedGuard } from './guards/is-authorized.guard';

const modules = [UsersModule, AuthModule, TopicsModule, NotesModule];
const providers = [ShouldExistValidator];
const guards = [IsAuthorizedGuard];

@Global()
@Module({
  imports: [...modules],
  providers: [...guards, ...providers],
  exports: [...modules, ...providers],
})
export class SharedModule {}
