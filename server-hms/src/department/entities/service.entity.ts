import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Department } from './department.entity';

@Entity()
export class Service extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Department, (department) => department.services)
  departments: Department[];
}
