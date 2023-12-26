import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response-handler';
import { CreatePatientDto } from 'src/manager/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/manager/dto/update-patient.dto';
import { Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PatientMapper } from '../mapper/patient.mapper';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly patientMapper: PatientMapper,
  ) {}
  async create(dto: CreatePatientDto) {
    try {
      const exits = await this.userRepository.findOne({
        where: { email: dto.email, role: { id: 5 } },
      });
      console.log('patient-> ' + exits);
      if (exits) {
        return new ResponseHandler(
          'Patient with the same email Already Exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const patient = this.patientMapper.dtoToEntity(dto);
      const entity = this.userRepository.create(patient);
      await this.userRepository.save(entity);
      return new ResponseHandler(
        'Patient Created Successfully',
        HttpStatus.CREATED,
      );
    } catch (err) {
      console.log(err);
      return new ResponseHandler(
        'Error Creating Patient',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const allPatient = await this.userRepository.find({
        where: { deleted_at: null, role: { id: 5 } },
        relations: {
          department: true,
          userDetails: true,
          role: true,
        },
      });
      return new ResponseHandler(allPatient, HttpStatus.OK);
    } catch (err) {
      console.log(err);
      return new ResponseHandler(
        'Error Fetching Patient List',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    const patient = await this.userRepository.findOne({
      where: { id: id, deleted_at: null, role: { id: 5 }, is_active: true },
      relations: {
        department: true,
        userDetails: true,
        role: true,
      },
    });
    if (patient) {
      return new ResponseHandler(patient, HttpStatus.OK);
    }
    return new ResponseHandler(
      'Patient Not Found',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async update(dto: UpdatePatientDto) {
    try {
      const id = dto.id;
      const emailCheck = await this.userRepository.findOne({
        where: {
          role: { id: 5 },
          is_active: true,
          email: dto.email,
          id: Not(dto.id),
        },
      });
      console.log(emailCheck);
      if (emailCheck) {
        return new ResponseHandler(
          'Patient with the same email already exist',
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userRepository.findOne({
        where: { id: id, deleted_at: null, role: { id: 5 }, is_active: true },
      });
      if (!user) {
        return new ResponseHandler(
          'Patient Not Found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const patient = this.patientMapper.dtoToEntityForUpdate(dto, user);
      console.log(patient);
      const entity = this.userRepository.create(patient);
      await this.userRepository.save(entity);
      return new ResponseHandler('Patient Updated Successfully', HttpStatus.OK);
    } catch (err) {
      return new ResponseHandler(
        'Patient Not Updated -> ' + err,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  private currentUserId: number;
  private currentUserRole: number;

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
}
