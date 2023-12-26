import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response-handler';
import { User } from 'src/user/entities/user.entity';
import { UserUpdateMapper } from 'src/user/mapper/userUpdate.mapper';
import { DoctorService } from 'src/user/services/doctor.service';
import { NurseService } from 'src/user/services/nurse.service';
import { PatientService } from 'src/user/services/patient.service';
import { UserService } from 'src/user/user.service';
import { Not, Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { CreateManagerDto } from './dto/create-manager.dto';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Manager } from './entities/manager.entity';
import { Department } from 'src/department/entities/department.entity';

@Injectable()
export class ManagerService {
  constructor(
    private readonly userService: UserService,
    private readonly doctorService: DoctorService,
    private readonly userUpdateMapper: UserUpdateMapper,
    private readonly patientService: PatientService,
    private readonly nurseService: NurseService,

    private readonly responseHandler: ResponseHandler,

    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}
  async findAllDepartment() {
    const departments = await this.departmentRepository.find({
      select: ['id', 'name'],
    });

    return departments;
  }
  create(createManagerDto: CreateManagerDto) {
    return 'This action adds a new manager';
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managerqq`;
  }

  remove(id: number) {
    return `This action removes a #${id} managerrr`;
  }
  async findProfile() {
    if (this.userService.getCurrentUserRole() != 2) {
      return 'You are not a manager';
    }
    return await this.userService.getManagerProfile();
  }
  async update(dto: UpdateManagerDto) {
    try {
      const id = this.userService.getCurrentUserId();
      const emailCheck = await this.userRepository.findOne({
        where: {
          role: { id: 4 },
          is_active: true,
          email: dto.email,
          id: Not(id),
        },
      });
      console.log('emailCheck', emailCheck);
      if (emailCheck) {
        return new ResponseHandler(
          'Manager with the same email already exist',
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['userDetails'],
      });
      const entity = this.userUpdateMapper.dtoToEntity(dto, user);
      return new ResponseHandler(
        await this.userRepository.save(entity),
        HttpStatus.OK,
      );
    } catch (e) {
      console.log(e);
      return new ResponseHandler(e, HttpStatus.BAD_REQUEST);
    }
  }
  async createDoctor(dto: CreateDoctorDto) {
    try {
      return this.doctorService.create(dto);
    } catch (e) {
      console.log(e);
    }
  }
  findAllDoctor() {
    return this.doctorService.findAll();
  }
  findOneDoctor(id: number) {
    return this.doctorService.findOne(id);
  }
  updateDoctor(updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(updateDoctorDto);
  }
  // nurse
  async createNurse(dto: CreateNurseDto) {
    try {
      return this.nurseService.create(dto);
    } catch (e) {
      console.log(e);
    }
  }
  findAllNurse() {
    return this.nurseService.findAll();
  }
  findOneNurse(id: number) {
    return this.nurseService.findOne(id);
  }
  updateNurse(updateDoctorDto: UpdateNurseDto) {
    return this.nurseService.update(updateDoctorDto);
  }

  // patient
  async createPatient(dto: CreatePatientDto) {
    try {
      return this.patientService.create(dto);
    } catch (e) {
      console.log(e);
    }
  }
  async findAllPatient() {
    try {
      return await this.patientService.findAll();
    } catch (e) {
      console.log(e);
    }
  }
  async findOnePatient(id: number) {
    try {
      return await this.patientService.findOne(id);
    } catch (e) {
      console.log(e);
    }
  }
  async updatePatient(updateDoctorDto: UpdatePatientDto) {
    try {
      return await this.patientService.update(updateDoctorDto);
    } catch (e) {
      console.log(e);
    }
  }
}
