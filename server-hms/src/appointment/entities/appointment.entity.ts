import { BaseEntity } from 'src/entities/baseEntity.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AvailableAppointment } from './availableAppointment.entity';

@Entity()
export class Appointment extends BaseEntity {
  @ManyToOne(() => User, (doctor) => doctor.appointments)
  doctor: User;
  @Column()
  doctorId: number;
  @Column()
  patientId: number;

  @Column()
  availableAppointmentId: number;

  @OneToOne(
    () => AvailableAppointment,
    (availableAppointment) => availableAppointment.appointment,
  )
  @JoinColumn()
  availableAppointment: AvailableAppointment;
  @ManyToOne(() => User, (patient) => patient.appointments)
  patient: User;
}
