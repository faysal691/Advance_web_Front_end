import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { Service } from './entities/service.entity';
import { DepartmentSeeder } from './seeder/department.seeder';
import { ServiceSeeder } from './seeder/service.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Service])],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentSeeder, ServiceSeeder],
  exports: [DepartmentService, DepartmentSeeder, ServiceSeeder],
})
export class DepartmentModule {}
