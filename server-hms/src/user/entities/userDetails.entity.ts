import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserDetails extends BaseEntity {
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column({ nullable: true })
  avatar: string;
  @OneToOne(() => User, (user) => user.userDetails)
  user: User;
}
