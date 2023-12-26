import { BaseEntity } from 'src/entities/baseEntity.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class AvailableAppointment extends BaseEntity {
  @ManyToOne(() => User, (doctor) => doctor.availableAppointments)
  doctor: User;

  @Column({ type: 'timestamp' })
  dateTime: Date;

  @Column({ default: true })
  is_available: boolean;
  @OneToOne(
    () => Appointment,
    (appointment) => appointment.availableAppointment,
  )
  appointment: Appointment;
}
