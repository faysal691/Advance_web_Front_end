import { BaseEntity } from 'src/entities/baseEntity.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class Department extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Service, (service) => service.departments, { eager: true })
  @JoinTable()
  services: Service[];

  @OneToMany(() => User, (doctor) => doctor.department)
  doctors: User[];
}
