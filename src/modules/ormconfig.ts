import { DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

export const dataSourceOptions: DataSourceOptions = {
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  name: 'default',
  type: 'postgres',
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations_typeorm',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['migrations/*{.ts,.js}'],
};
export const dbConnectionSource = new DataSource(dataSourceOptions);
