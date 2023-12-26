import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response-handler';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointment.dto';
import { CreateAvailableAppointmentDto } from './dto/availableAppointment.dto';
import { Appointment } from './entities/appointment.entity';
import { AvailableAppointment } from './entities/availableAppointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(AvailableAppointment)
    private availableAppointmentRepository: Repository<AvailableAppointment>,

    @InjectRepository(User)
    private userRepositoy: Repository<User>,
  ) {}
  // getAllAppointments() {
  //   return this.appointmentRepository.find();
  // }
  async deleteAvailableAppointment(id: number) {
    await this.appointmentRepository.delete(id);
    return new ResponseHandler(
      'Appointment deleted successfully',
      HttpStatus.OK,
    );
  }
  async getAllAppointments() {
    return this.appointmentRepository.find({
      relations: ['doctor', 'patient', 'availableAppointment'],
    });
  }

  getAppointmentById(id: number) {
    console.log('getAppointmentById', +id);
    return this.appointmentRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient', 'availableAppointment'],
    });
  }

  async createAppointment(dto: CreateAppointmentDto) {
    const availableappointment = await this.availableAppointmentRepository.find(
      {
        where: { id: dto.availableAppointmentId },
      },
    );

    const avap = availableappointment[0];
    if (!avap) {
      return new ResponseHandler(
        'Appointment not available',
        HttpStatus.BAD_REQUEST,
      );
    }
    const appointment = new Appointment();
    appointment.doctor = avap.doctor;
    appointment.doctorId = dto.doctorId;
    appointment.patientId = dto.patientId;
    appointment.availableAppointmentId = dto.availableAppointmentId;
    appointment.doctorId = dto.doctorId;

    console.log('createAppointment', appointment);
    // const newAppointment = this.appointmentRepository.create(appointment);
    await this.appointmentRepository.save(appointment);
    avap.is_available = false;
    await this.availableAppointmentRepository.save(avap);
    return new ResponseHandler('Appointment made successfully', HttpStatus.OK);
  }

  async updateAppointment(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    // const id = updateAppointmentDto.id;
    const update = await this.appointmentRepository.update(
      id,
      updateAppointmentDto,
    );
    if (!update) {
      throw new NotFoundException('Appointment not found');
    }
    return new ResponseHandler(
      'Appointment updated successfully',
      HttpStatus.OK,
    );
  }

  async deleteAppointment(id: number) {
    const appointment = await this.getAppointmentById(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return this.appointmentRepository.remove(appointment);
  }
  async addAvailableAppointment(dto: CreateAvailableAppointmentDto) {
    try {
      const isDoctorAvailable = await this.userRepositoy.find({
        where: { id: dto.doctorId, role: { id: 3 } },
      });
      if (!isDoctorAvailable) {
        return new ResponseHandler(
          'He is not a doctor',
          HttpStatus.BAD_REQUEST,
        );
      }
      const doctor = isDoctorAvailable[0];

      dto.availableSlots.forEach(async (slot) => {
        const appointment = new AvailableAppointment();
        appointment.doctor = doctor;
        appointment.dateTime = slot.dateTime;
        const newAvailableAppointment =
          this.availableAppointmentRepository.create(appointment);
        await this.availableAppointmentRepository.save(newAvailableAppointment);
      });
      return new ResponseHandler(
        'Appointment availablity added to ' +
          doctor.userDetails.name +
          ' successfully',
        HttpStatus.OK,
      );
    } catch (err) {
      return new ResponseHandler(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getAvailableAppointments(doctorId: number) {
    return this.availableAppointmentRepository.find({
      where: { doctor: { id: doctorId, role: { id: 3 } }, is_available: true },
    });
  }
}
