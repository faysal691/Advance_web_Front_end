import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/auth/auth.guards';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { RoleGuard } from './manager.guard';
import { ManagerService } from './manager.service';

@Controller('manager')
@UseGuards(SessionGuard)
@UseGuards(RoleGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('profile')
  findProfile() {
    console.log('findProfile');
    return this.managerService.findProfile();
  }
  @Put()
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(updateManagerDto);
  }
  @Post('doctor')
  createDoctor(@Body() dto: CreateDoctorDto) {
    return this.managerService.createDoctor(dto);
  }
  @Get('doctor/list')
  findAllDoctor() {
    return this.managerService.findAllDoctor();
  }
  @Get('/doctor')
  findOneDoctor(@Query('id') id) {
    return this.managerService.findOneDoctor(+id);
  }
  @Put('doctor/profile')
  updateDoctorProfile(@Body() dto: UpdateDoctorDto) {
    return this.managerService.updateDoctor(dto);
  }
  // nurse
  @Post('nurse')
  createNurse(@Body() dto: CreateNurseDto) {
    return this.managerService.createNurse(dto);
  }
  @Get('nurse/list')
  findAllNurse() {
    return this.managerService.findAllNurse();
  }
  @Get('/nurse')
  findOneNurse(@Query('id') id) {
    return this.managerService.findOneNurse(+id);
  }
  @Put('nurse/profile')
  updateNurseProfile(@Body() dto: UpdateNurseDto) {
    return this.managerService.updateNurse(dto);
  }

  // patient
  @Post('patient')
  createPatient(@Body() dto: CreatePatientDto) {
    return this.managerService.createPatient(dto);
  }
  @Get('patient/list')
  findAllPatient() {
    return this.managerService.findAllPatient();
  }
  @Get('/patient')
  findOnePatient(@Query('id') id) {
    return this.managerService.findOnePatient(+id);
  }
  @Put('patient/profile')
  updatePatientProfile(@Body() dto: UpdatePatientDto) {
    return this.managerService.updatePatient(dto);
  }
  @Get('department')
  findAllDepartment() {
    return this.managerService.findAllDepartment();
  }
}
