import { Global, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TopicsModule } from '../topics/topics.module';

const modules = [UserModule, AuthModule, TopicsModule];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
