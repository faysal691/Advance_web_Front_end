import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointment.dto';
import { CreateAvailableAppointmentDto } from './dto/availableAppointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('get-all')
  getAllAppointments() {
    return this.appointmentService.getAllAppointments();
  }

  @Get('get-by-id')
  getAppointmentById(@Query('id') id: number) {
    return this.appointmentService.getAppointmentById(id);
  }

  @Post('make-appointment')
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Put('update')
  updateAppointment(
    @Query('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.updateAppointment(id, updateAppointmentDto);
  }

  @Delete(':id')
  deleteAppointment(@Param('id') id: number) {
    return this.appointmentService.deleteAppointment(id);
  }
  @Post('available')
  addAvailableAppointment(@Body() dto: CreateAvailableAppointmentDto) {
    return this.appointmentService.addAvailableAppointment(dto);
  }
  @Get('/available')
  getAvailableAppointments(@Query('doctorId') doctorId: number) {
    return this.appointmentService.getAvailableAppointments(doctorId);
  }
  @Delete('/delete/avalable')
  deleteAvailableAppointment(@Query('id') id: number) {
    return this.appointmentService.deleteAvailableAppointment(id);
  }
}
