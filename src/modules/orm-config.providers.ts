import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { join } from 'path';

@Injectable()
export class OrmConfigProviders implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const POSTGRES_HOST = this.configService.get('POSTGRES_HOST');
    const POSTGRES_DB = this.configService.get('POSTGRES_DB');
    const POSTGRES_USER = this.configService.get('POSTGRES_USER');
    const POSTGRES_PASSWORD = this.configService.get('POSTGRES_PASSWORD');
    const POSTGRES_TYPE = this.configService.get('POSTGRES_TYPE');
    const POSTGRES_NAME = this.configService.get('POSTGRES_NAME');

    return {
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      type: POSTGRES_TYPE,
      name: POSTGRES_NAME,
      synchronize: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    };
  }
}
