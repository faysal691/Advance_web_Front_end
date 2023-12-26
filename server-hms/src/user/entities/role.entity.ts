import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Roles extends BaseEntity {
  @Column()
  name: string;
  @Column({ default: true })
  is_active: boolean;
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
