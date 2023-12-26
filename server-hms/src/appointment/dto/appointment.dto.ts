import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsNumber()
  @IsNotEmpty()
  availableAppointmentId: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;
}

export class UpdateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsNumber()
  availableAppointmentId?: number;
}
