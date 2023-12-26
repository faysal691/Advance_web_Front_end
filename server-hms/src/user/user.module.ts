import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/common/email.service';
import { ResponseHandler } from 'src/common/response-handler';
import { Roles } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UserDetails } from './entities/userDetails.entity';
import { DoctorMapper } from './mapper/doctor.mapper';
import { NurseMapper } from './mapper/nurser.mapper';
import { PatientMapper } from './mapper/patient.mapper';
import { UserUpdateMapper } from './mapper/userUpdate.mapper';
import { RolesSeeder } from './seeder/roles.seeder';
import { DoctorService } from './services/doctor.service';
import { NurseService } from './services/nurse.service';
import { PatientService } from './services/patient.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDetails, Roles])],
  controllers: [UserController],
  providers: [
    UserService,
    DoctorService,
    UserUpdateMapper,
    RolesSeeder,
    DoctorMapper,
    ResponseHandler,
    NurseMapper,
    NurseService,
    PatientMapper,
    PatientService,
    EmailService,
  ],
  exports: [
    UserService,
    UserUpdateMapper,
    RolesSeeder,
    DoctorService,
    DoctorMapper,
    NurseMapper,
    NurseService,
    PatientMapper,
    PatientService,
  ],
})
export class UserModule {}
