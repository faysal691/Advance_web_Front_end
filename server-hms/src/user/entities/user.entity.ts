import * as bcrypt from 'bcrypt';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { AvailableAppointment } from 'src/appointment/entities/availableAppointment.entity';
import { Department } from 'src/department/entities/department.entity';
import { BaseEntity } from 'src/entities/baseEntity.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Roles } from './role.entity';
import { UserDetails } from './userDetails.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Roles, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @OneToOne(() => UserDetails, (details) => details.user, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userDetails: UserDetails;

  @ManyToOne(() => Department, (department) => department.doctors, {
    eager: true,
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor, {
    eager: true,
  })
  appointments: Appointment[];

  @OneToMany(
    () => AvailableAppointment,
    (availableAppointment) => availableAppointment.doctor,
    {
      eager: true,
    },
  )
  availableAppointments: AvailableAppointment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
