import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/common/email.service';
import { ResponseHandler } from 'src/common/response-handler';
import { CreateDoctorDto } from 'src/manager/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/manager/dto/update-doctor.dto';
import { Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { DoctorMapper } from '../mapper/doctor.mapper';
import { Roles } from '../entities/role.entity';

@Injectable()
export class DoctorService {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly doctorMapper: DoctorMapper,
  ) {}
  async create(dto: CreateDoctorDto) {
    try {
      const exits = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (exits) {
        return new ResponseHandler(
          'Email Already Exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const doctor = this.doctorMapper.dtoToEntity(dto);
      const entity = this.userRepository.create(doctor);
      await this.userRepository.save(entity);
      await this.emailService.sendMail(dto.email, 'HMS', 'Welcome as a doctor');
      return new ResponseHandler(
        'Doctor Created Successfully',
        HttpStatus.CREATED,
      );
    } catch (err) {
      console.log(err);
      return new ResponseHandler(
        'Error Creating Doctor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const allDoctor = await this.userRepository.find({
        where: { deleted_at: null, role: { id: 3 } },
        relations: {
          department: true,
          userDetails: true,
          role: true,
        },
      });
      return new ResponseHandler(allDoctor, HttpStatus.OK);
    } catch (err) {
      console.log(err);
      return new ResponseHandler(
        'Error Fetching Doctors',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    const doctor = await this.userRepository.findOne({
      where: { id: id, deleted_at: null, role: { id: 3 }, is_active: true },
      relations: {
        department: true,
        userDetails: true,
        role: true,
      },
    });
    if (doctor) {
      return new ResponseHandler(doctor, HttpStatus.OK);
    }
    return new ResponseHandler(
      'Doctor Not Found',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async update(dto: UpdateDoctorDto) {
    try {
      const id = dto.id;
      console.log('dto', dto);
      const emailCheck = await this.userRepository.findOne({
        where: {
          role: { id: 3 },
          is_active: true,
          email: dto.email,
          id: Not(dto.id),
        },
      });
      console.log('emailCheck', emailCheck);
      if (emailCheck) {
        return new ResponseHandler(
          'Doctor with the same email already exist',
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userRepository.findOne({
        where: { id: id, deleted_at: null, role: { id: 3 }, is_active: true },
      });
      if (!user) {
        return new ResponseHandler(
          'Doctor Not Found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const doctor = this.doctorMapper.dtoToEntityForUpdate(dto, user);
      console.log(doctor);
      const entity = this.userRepository.create(doctor);
      await this.userRepository.save(entity);
      return new ResponseHandler('Doctor Updated Successfully', HttpStatus.OK);
    } catch (err) {
      return new ResponseHandler(
        'Doctor Not Updated -> ' + err,
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
