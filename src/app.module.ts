import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from './modules/shared/shared.module';
import { AuthMiddleware } from './modules/shared/middlewares/auth.middleware';
import { dataSourceOptions } from './ormconfig';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      migrations: [],
      migrationsRun: false,
      synchronize: false,
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
