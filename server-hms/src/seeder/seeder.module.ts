import { Module, forwardRef } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Service } from 'src/department/entities/service.entity';
import { Roles } from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { RolesSeeder } from 'src/user/seeder/roles.seeder';
import { DepartmentModule } from '../department/department.module';
import { SeederManager } from './seeder-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => DepartmentModule),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Department, Service, User, Roles]),
  ],
  providers: [SeederManager, RolesSeeder],
})
export class SeederModule {}
