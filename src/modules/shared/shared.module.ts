import { Global, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

const modules = [UserModule, AuthModule];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
